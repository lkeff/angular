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
const diagnostics_1 = require("../../src/ngtsc/diagnostics");
const testing_1 = require("../../src/ngtsc/file_system/testing");
const testing_2 = require("../../src/ngtsc/testing");
const env_1 = require("./env");
const testFiles = (0, testing_2.loadStandardTestFiles)({ fakeCommon: true });
(0, testing_1.runInEachFileSystem)(() => {
    describe('ngtsc extended template checks', () => {
        let env;
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup(testFiles);
            env.tsconfig({ strictTemplates: true });
        });
        it('should produce invalid banana in box warning', () => {
            env.write('test.ts', `
              import {Component} from '@angular/core';
              @Component({
                selector: 'test',
                template: '<div ([notARealThing])="bar"></div>',
              })
              class TestCmp {
                bar: string = "text";
              }
            `);
            const diags = env.driveDiagnostics();
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe('([notARealThing])="bar"');
        });
        it('should produce invalid banana in box warning with external html file', () => {
            env.write('test.ts', `
              import {Component} from '@angular/core';
              @Component({
                selector: 'test',
                templateUrl: './test.html',
              })
              class TestCmp {
                bar: string = "text";
              }
            `);
            env.write('test.html', `
              <div ([notARealThing])="bar"></div>
            `);
            const diags = env.driveDiagnostics();
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe('([notARealThing])="bar"');
        });
        it(`should produce nullish coalescing not nullable warning`, () => {
            env.write('test.ts', `
              import {Component} from '@angular/core';
              @Component({
                selector: 'test',
                template: '{{ bar ?? "foo" }}',
              })
              export class TestCmp {
                bar: string = "text";
              }
            `);
            const diags = env.driveDiagnostics();
            expect(diags.length).toBe(1);
            expect(diags[0].category).toBe(typescript_1.default.DiagnosticCategory.Warning);
            expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.NULLISH_COALESCING_NOT_NULLABLE));
            expect((0, testing_2.getSourceCodeForDiagnostic)(diags[0])).toBe('bar ?? "foo"');
        });
        describe('handles diagnostic configuration', () => {
            // Component definition which emits one warning.
            const warningComponent = `
        import {Component} from '@angular/core';

        @Component({
          selector: 'test-component',
          // Invalid banana in box (should be \`[(foo)]="bar"\`).
          template: '<div ([foo])="bar"></div>',
        })
        class TestComponent {
          bar = 'test';
        }
      `;
            it('by enabling extended template diagnostics when `strictTemplates` is enabled', () => {
                env.tsconfig({ strictTemplates: true });
                env.write('test.ts', warningComponent);
                const diagnostics = env.driveDiagnostics(0 /* expectedExitCode */);
                expect(diagnostics.length).toBe(1);
                expect(diagnostics[0]).toEqual(jasmine.objectContaining({
                    code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX),
                    category: typescript_1.default.DiagnosticCategory.Warning,
                }));
            });
            it('by disabling extended template diagnostics when `strictTemplates` is disabled', () => {
                env.tsconfig({ strictTemplates: false });
                env.write('test.ts', warningComponent);
                const diagnostics = env.driveDiagnostics(0 /* expectedExitCode */);
                expect(diagnostics).toEqual([]);
            });
            it('by emitting unconfigured diagnostics as is', () => {
                env.tsconfig({
                    strictTemplates: true,
                    extendedDiagnostics: {}, // No configured diagnostics.
                });
                env.write('test.ts', warningComponent);
                const diagnostics = env.driveDiagnostics(0 /* expectedExitCode */);
                expect(diagnostics.length).toBe(1);
                expect(diagnostics[0]).toEqual(jasmine.objectContaining({
                    code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX),
                    category: typescript_1.default.DiagnosticCategory.Warning,
                }));
            });
            it('by emitting diagnostics with the default category', () => {
                env.tsconfig({
                    strictTemplates: true,
                    extendedDiagnostics: {
                        defaultCategory: 'error',
                    },
                });
                env.write('test.ts', warningComponent);
                const diagnostics = env.driveDiagnostics(1 /* expectedExitCode */);
                expect(diagnostics.length).toBe(1);
                expect(diagnostics[0]).toEqual(jasmine.objectContaining({
                    code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX),
                    category: typescript_1.default.DiagnosticCategory.Error,
                }));
            });
            it('by emitting diagnostics configured as `warning`', () => {
                env.tsconfig({
                    strictTemplates: true,
                    extendedDiagnostics: {
                        checks: {
                            invalidBananaInBox: 'warning',
                        },
                    },
                });
                env.write('test.ts', warningComponent);
                const diagnostics = env.driveDiagnostics(0 /* expectedExitCode */);
                expect(diagnostics.length).toBe(1);
                expect(diagnostics[0]).toEqual(jasmine.objectContaining({
                    code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX),
                    category: typescript_1.default.DiagnosticCategory.Warning,
                }));
            });
            it('by promoting diagnostics configured as `error`', () => {
                env.tsconfig({
                    strictTemplates: true,
                    extendedDiagnostics: {
                        checks: {
                            invalidBananaInBox: 'error',
                        },
                    },
                });
                env.write('test.ts', warningComponent);
                const diagnostics = env.driveDiagnostics(1 /* expectedExitCode */);
                expect(diagnostics.length).toBe(1);
                expect(diagnostics[0]).toEqual(jasmine.objectContaining({
                    code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INVALID_BANANA_IN_BOX),
                    category: typescript_1.default.DiagnosticCategory.Error,
                }));
            });
            it('by suppressing diagnostics configured as `suppress`', () => {
                env.tsconfig({
                    strictTemplates: true,
                    extendedDiagnostics: {
                        checks: {
                            invalidBananaInBox: 'suppress',
                        },
                    },
                });
                env.write('test.ts', warningComponent);
                const diagnostics = env.driveDiagnostics(0 /* expectedExitCode */);
                expect(diagnostics).toEqual([]);
            });
            it('by throwing an error when given a bad category', () => {
                env.tsconfig({
                    strictTemplates: true,
                    extendedDiagnostics: {
                        defaultCategory: 'not-a-category',
                    },
                });
                env.write('test.ts', warningComponent);
                const diagnostics = env.driveDiagnostics(1 /* expectedExitCode */);
                expect(diagnostics.length).toBe(1);
                expect(diagnostics[0]).toEqual(jasmine.objectContaining({
                    code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.CONFIG_EXTENDED_DIAGNOSTICS_UNKNOWN_CATEGORY_LABEL),
                    category: typescript_1.default.DiagnosticCategory.Error,
                }));
            });
        });
    });
});
