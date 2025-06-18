"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const testing_2 = require("../testing");
describe('Signal input refactoring action', () => {
    let env;
    beforeEach(() => {
        (0, testing_1.initMockFileSystem)('Native');
        env = testing_2.LanguageServiceTestEnv.setup();
    });
    describe('individual fields', () => {
        it('should support refactoring an `@Input` property', () => {
            const files = {
                'app.ts': `
        import {Directive, Input} from '@angular/core';

        @Directive({})
        export class AppComponent {
          @Input() bla = true;
        }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('bl¦a');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(4);
            expect(refactorings[0].name).toBe('convert-field-to-signal-input-safe-mode');
            expect(refactorings[1].name).toBe('convert-field-to-signal-input-best-effort-mode');
            expect(refactorings[2].name).toBe('convert-full-class-to-signal-inputs-safe-mode');
            expect(refactorings[3].name).toBe('convert-full-class-to-signal-inputs-best-effort-mode');
        });
        it('should not support refactoring a non-Angular property', () => {
            const files = {
                'app.ts': `
        import {Directive, Input} from '@angular/core';

        @Directive({})
        export class AppComponent {
          bla = true;
        }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('bl¦a');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(0);
        });
        it('should not support refactoring a signal input property', () => {
            const files = {
                'app.ts': `
        import {Directive, input} from '@angular/core';

        @Directive({})
        export class AppComponent {
          bla = input(true);
        }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('bl¦a');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(0);
        });
        it('should compute edits for migration', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
        import {Directive, Input} from '@angular/core';

        @Directive({})
        export class AppComponent {
          @Input() bla = true;
        }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('bl¦a');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(4);
            expect(refactorings[0].name).toBe('convert-field-to-signal-input-safe-mode');
            expect(refactorings[1].name).toBe('convert-field-to-signal-input-best-effort-mode');
            expect(refactorings[2].name).toBe('convert-full-class-to-signal-inputs-safe-mode');
            expect(refactorings[3].name).toBe('convert-full-class-to-signal-inputs-best-effort-mode');
            const edits = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toBeUndefined();
            expect(edits === null || edits === void 0 ? void 0 : edits.edits).toEqual([
                {
                    fileName: '/test/app.ts',
                    textChanges: [
                        // Input declaration.
                        {
                            newText: 'readonly bla = input(true);',
                            span: { start: 127, length: '@Input() bla = true;'.length },
                        },
                        // Import (since there is just a single input).
                        { newText: '{Directive, input}', span: { start: 16, length: 18 } },
                    ],
                },
            ]);
        }));
        it('should show an error if the input is incompatible', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, Input} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @Input() bla = true;

            click() {
              this.bla = false;
            }
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('bl¦a = true');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(4);
            expect(refactorings[0].name).toBe('convert-field-to-signal-input-safe-mode');
            expect(refactorings[1].name).toBe('convert-field-to-signal-input-best-effort-mode');
            expect(refactorings[2].name).toBe('convert-full-class-to-signal-inputs-safe-mode');
            expect(refactorings[3].name).toBe('convert-full-class-to-signal-inputs-best-effort-mode');
            const edits = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toContain(`Input field "bla" could not be migrated`);
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toContain(`to forcibly convert.`);
            expect(edits === null || edits === void 0 ? void 0 : edits.edits).toEqual([]);
        }));
        it('should show an error if the input is incompatible, but cannot be ignored', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, Input} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @Input()
            get bla(): string {
              return '';
            };
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('get bl¦a()');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(4);
            expect(refactorings[0].name).toBe('convert-field-to-signal-input-safe-mode');
            expect(refactorings[1].name).toBe('convert-field-to-signal-input-best-effort-mode');
            expect(refactorings[2].name).toBe('convert-full-class-to-signal-inputs-safe-mode');
            expect(refactorings[3].name).toBe('convert-full-class-to-signal-inputs-best-effort-mode');
            const edits = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toContain(`Input field "bla" could not be migrated`);
            // This is not forcibly ignorable, so the error should not suggest this option.
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).not.toContain(`to forcibly convert.`);
            expect(edits === null || edits === void 0 ? void 0 : edits.edits).toEqual([]);
        }));
        it('should not suggest options when inside an accessor input body', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, Input} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @Input()
            get bla(): string {
              return 'hello';
            };
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('hell¦o');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(0);
        }));
    });
    describe('full class', () => {
        it('should support refactoring multiple `@Input` properties', () => {
            const files = {
                'app.ts': `
          import {Directive, Input} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @Input() bla = true;
            @Input() bla2 = true;
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('App¦Component');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(2);
            expect(refactorings[0].name).toBe('convert-full-class-to-signal-inputs-safe-mode');
            expect(refactorings[1].name).toBe('convert-full-class-to-signal-inputs-best-effort-mode');
        });
        it('should not suggest options when inside an accessor input body', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, Input} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @Input()
            get bla(): string {
              return 'hello';
            };
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('hell¦o');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(0);
        }));
        it('should generate edits for migrating multiple `@Input` properties', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, Input} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @Input() bla = true;
            @Input() bla2 = true;
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('App¦Component');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(2);
            expect(refactorings[0].name).toBe('convert-full-class-to-signal-inputs-safe-mode');
            expect(refactorings[1].name).toBe('convert-full-class-to-signal-inputs-best-effort-mode');
            const result = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toBe(undefined);
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toBe(undefined);
            expect(result === null || result === void 0 ? void 0 : result.edits).toEqual([
                {
                    fileName: '/test/app.ts',
                    textChanges: [
                        // Input declarations.
                        {
                            newText: 'readonly bla = input(true);',
                            span: { start: 135, length: '@Input() bla = true;'.length },
                        },
                        {
                            newText: 'readonly bla2 = input(true);',
                            span: { start: 168, length: '@Input() bla2 = true;'.length },
                        },
                        // Import (since there is just a single input).
                        { newText: '{Directive, input}', span: { start: 18, length: 18 } },
                    ],
                },
            ]);
        }));
        it('should generate edits for partially migrating multiple `@Input` properties', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, Input} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @Input() bla = true;
            @Input() bla2 = true;

            click() {
              this.bla2 = false;
            }
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('App¦Component');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(2);
            expect(refactorings[0].name).toBe('convert-full-class-to-signal-inputs-safe-mode');
            expect(refactorings[1].name).toBe('convert-full-class-to-signal-inputs-best-effort-mode');
            const result = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toContain('1 input could not be migrated.');
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toContain('click on the skipped inputs and try to migrate individually.');
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toContain('action to forcibly convert.');
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toBe(undefined);
            expect(result === null || result === void 0 ? void 0 : result.edits).toEqual([
                {
                    fileName: '/test/app.ts',
                    textChanges: [
                        // Input declarations.
                        {
                            newText: 'readonly bla = input(true);',
                            span: { start: 135, length: '@Input() bla = true;'.length },
                        },
                        // Import (since there is just a single input).
                        { newText: '{Directive, Input, input}', span: { start: 18, length: 18 } },
                    ],
                },
            ]);
        }));
        it('should error when no inputs could be migrated', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, Input} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @Input() bla = true;
            @Input() bla2 = true;

            click() {
              this.bla = false;
              this.bla2 = false;
            }
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('App¦Component');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(2);
            expect(refactorings[0].name).toBe('convert-full-class-to-signal-inputs-safe-mode');
            expect(refactorings[1].name).toBe('convert-full-class-to-signal-inputs-best-effort-mode');
            const result = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toContain('2 inputs could not be migrated.');
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toContain('click on the skipped inputs and try to migrate individually.');
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toContain('action to forcibly convert.');
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toBe(undefined);
            expect(result === null || result === void 0 ? void 0 : result.edits).toEqual([]);
        }));
        it('should not suggest force mode when all inputs are incompatible and non-ignorable', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, Input} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @Input() set bla(v: string) {};
            @Input() set bla2(v: string) {};
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('App¦Component');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(2);
            expect(refactorings[0].name).toBe('convert-full-class-to-signal-inputs-safe-mode');
            expect(refactorings[1].name).toBe('convert-full-class-to-signal-inputs-best-effort-mode');
            const result = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toContain('2 inputs could not be migrated.');
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toContain('click on the skipped inputs and try to migrate individually.');
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).not.toContain('action to forcibly convert.');
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toBe(undefined);
            expect(result === null || result === void 0 ? void 0 : result.edits).toEqual([]);
        }));
    });
});
