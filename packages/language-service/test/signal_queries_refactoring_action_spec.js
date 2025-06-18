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
describe('Signal queries refactoring action', () => {
    let env;
    beforeEach(() => {
        (0, testing_1.initMockFileSystem)('Native');
        env = testing_2.LanguageServiceTestEnv.setup();
    });
    describe('individual fields', () => {
        it('should support refactoring an `@ViewChild` property', () => {
            const files = {
                'app.ts': `
        import {ViewChild, Component} from '@angular/core';

        @Component({template: ''})
        export class AppComponent {
          @ViewChild('ref') ref!: ElementRef;
        }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('re¦f!: ElementRef');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(4);
            expect(refactorings[0].name).toBe('convert-field-to-signal-query-safe-mode');
            expect(refactorings[1].name).toBe('convert-field-to-signal-query-best-effort-mode');
            expect(refactorings[2].name).toBe('convert-full-class-to-signal-queries-safe-mode');
            expect(refactorings[3].name).toBe('convert-full-class-to-signal-queries-best-effort-mode');
        });
        it('should not support refactoring a non-Angular property', () => {
            const files = {
                'app.ts': `
        import {Directive} from '@angular/core';

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
        it('should not support refactoring a signal query property', () => {
            const files = {
                'app.ts': `
        import {Directive, viewChild} from '@angular/core';

        @Directive({})
        export class AppComponent {
          bla = viewChild('ref');
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
          import {ViewChild, Component} from '@angular/core';

          @Component({template: ''})
          export class AppComponent {
            @ViewChild('ref') ref!: ElementRef;
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('re¦f!: ElementRef');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(4);
            expect(refactorings[0].name).toBe('convert-field-to-signal-query-safe-mode');
            expect(refactorings[1].name).toBe('convert-field-to-signal-query-best-effort-mode');
            expect(refactorings[2].name).toBe('convert-full-class-to-signal-queries-safe-mode');
            expect(refactorings[3].name).toBe('convert-full-class-to-signal-queries-best-effort-mode');
            const edits = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toBeUndefined();
            expect(edits === null || edits === void 0 ? void 0 : edits.edits).toEqual([
                {
                    fileName: '/test/app.ts',
                    textChanges: [
                        // Query declaration.
                        {
                            newText: `readonly ref = viewChild.required<ElementRef>('ref');`,
                            span: { start: 151, length: `@ViewChild('ref') ref!: ElementRef;`.length },
                        },
                        // Import (since there is just a single query).
                        { newText: '{Component, viewChild}', span: { start: 18, length: 22 } },
                    ],
                },
            ]);
        }));
        it('should show an error if the query is incompatible', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, ViewChild} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @ViewChild('ref') bla: ElementRef|null = null;

            click() {
              this.bla = null;
            }
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('bl¦a: ElementRef');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(4);
            expect(refactorings[0].name).toBe('convert-field-to-signal-query-safe-mode');
            expect(refactorings[1].name).toBe('convert-field-to-signal-query-best-effort-mode');
            expect(refactorings[2].name).toBe('convert-full-class-to-signal-queries-safe-mode');
            expect(refactorings[3].name).toBe('convert-full-class-to-signal-queries-best-effort-mode');
            const edits = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toContain(`Query field "bla" could not be migrated`);
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toContain(`Your application code writes to the query.`);
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toContain(`to forcibly convert.`);
            expect(edits === null || edits === void 0 ? void 0 : edits.edits).toEqual([]);
        }));
        it('should show an error if query is incompatible, but cannot be ignored', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, ContentChild} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @ContentChild('ref')
            set bla(value: ElementRef) {};
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('set bl¦a(');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(4);
            expect(refactorings[0].name).toBe('convert-field-to-signal-query-safe-mode');
            expect(refactorings[1].name).toBe('convert-field-to-signal-query-best-effort-mode');
            expect(refactorings[2].name).toBe('convert-full-class-to-signal-queries-safe-mode');
            expect(refactorings[3].name).toBe('convert-full-class-to-signal-queries-best-effort-mode');
            const edits = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toContain(`Query field "bla" could not be migrated`);
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toContain(`Accessor queries cannot be migrated as they are too complex.`);
            // This is not forcibly ignorable, so the error should not suggest this option.
            expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).not.toContain(`to forcibly convert.`);
            expect(edits === null || edits === void 0 ? void 0 : edits.edits).toEqual([]);
        }));
        it('should not suggest options when inside an accessor query body', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, ElementRef, ViewChild} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @ViewChild()
            set bla(res: ElementRef) {
              // inside
            };
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('insid¦e');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(0);
        }));
    });
    it('should compute best effort edits for incompatible field', () => __awaiter(void 0, void 0, void 0, function* () {
        const files = {
            'app.ts': `
        import {ViewChild, Component} from '@angular/core';

        @Component({template: ''})
        export class AppComponent {
          @ViewChild('ref') ref?: ElementRef;

          click() {
            this.ref = undefined;
          }
        }
   `,
        };
        const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
        const appFile = project.openFile('app.ts');
        appFile.moveCursorToText('re¦f?: ElementRef');
        const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
        expect(refactorings.length).toBe(4);
        expect(refactorings[0].name).toBe('convert-field-to-signal-query-safe-mode');
        expect(refactorings[1].name).toBe('convert-field-to-signal-query-best-effort-mode');
        expect(refactorings[2].name).toBe('convert-full-class-to-signal-queries-safe-mode');
        expect(refactorings[3].name).toBe('convert-full-class-to-signal-queries-best-effort-mode');
        const edits = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[1].name, () => { });
        expect(edits === null || edits === void 0 ? void 0 : edits.errorMessage).toBeUndefined();
        expect(edits === null || edits === void 0 ? void 0 : edits.edits).toEqual([
            {
                fileName: '/test/app.ts',
                textChanges: [
                    // Query declaration.
                    {
                        newText: `readonly ref = viewChild<ElementRef>('ref');`,
                        span: { start: 143, length: `@ViewChild('ref') ref!: ElementRef;`.length },
                    },
                    // Import (since there is just a single query).
                    { newText: '{Component, viewChild}', span: { start: 16, length: 22 } },
                ],
            },
        ]);
    }));
    describe('full class', () => {
        it('should support refactoring multiple query properties', () => {
            const files = {
                'app.ts': `
          import {Directive, ViewChild, ContentChild, ElementRef} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @ViewChild('refA') refA!: ElementRef;
            @ContentChild('refB') refB?: ElementRef;
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('App¦Component');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(2);
            expect(refactorings[0].name).toBe('convert-full-class-to-signal-queries-safe-mode');
            expect(refactorings[1].name).toBe('convert-full-class-to-signal-queries-best-effort-mode');
        });
        it('should not suggest options when inside an accessor query body', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, ViewChild, ElementRef} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @ViewChild('ref')
            set bla(value: ElementRef) {
              // hello
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
        it('should generate edits for migrating multiple query properties', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, ViewChild, ContentChild, ElementRef} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @ViewChild('refA') refA!: ElementRef;
            @ContentChild('refB') refB?: ElementRef;
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('App¦Component');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(2);
            expect(refactorings[0].name).toBe('convert-full-class-to-signal-queries-safe-mode');
            expect(refactorings[1].name).toBe('convert-full-class-to-signal-queries-best-effort-mode');
            const result = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toBe(undefined);
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toBe(undefined);
            expect(result === null || result === void 0 ? void 0 : result.edits).toEqual([
                {
                    fileName: '/test/app.ts',
                    textChanges: [
                        // Query declarations.
                        {
                            newText: `readonly refA = viewChild.required<ElementRef>('refA');`,
                            span: { start: 165, length: `@ViewChild('refA') refA!: ElementRef;`.length },
                        },
                        {
                            newText: `readonly refB = contentChild<ElementRef>('refB');`,
                            span: { start: 215, length: `@ContentChild('refB') refB?: ElementRef;`.length },
                        },
                        // Import.
                        {
                            newText: '{Directive, ElementRef, viewChild, contentChild}',
                            span: { start: 18, length: 48 },
                        },
                    ],
                },
            ]);
        }));
        it('should generate edits for partially migrating multiple query properties', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, ViewChild, ContentChild, ElementRef} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @ViewChild('refA') refA!: ElementRef;
            @ContentChild('refB') refB?: ElementRef;

            click() {
              this.refB = undefined;
            }
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('App¦Component');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(2);
            expect(refactorings[0].name).toBe('convert-full-class-to-signal-queries-safe-mode');
            expect(refactorings[1].name).toBe('convert-full-class-to-signal-queries-best-effort-mode');
            const result = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toContain('1 query could not be migrated.');
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toContain('click on the skipped queries and try to migrate individually.');
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toContain('action to forcibly convert.');
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toBe(undefined);
            expect(result === null || result === void 0 ? void 0 : result.edits).toEqual([
                {
                    fileName: '/test/app.ts',
                    textChanges: [
                        // Query declarations.
                        {
                            newText: `readonly refA = viewChild.required<ElementRef>('refA');`,
                            span: { start: 165, length: `@ViewChild('refA') refA!: ElementRef;`.length },
                        },
                        // Import
                        {
                            newText: '{Directive, ContentChild, ElementRef, viewChild}',
                            span: { start: 18, length: 48 },
                        },
                    ],
                },
            ]);
        }));
        it('should error when no queries could be migrated', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, ViewChild, ViewChildren, QueryList, ElementRef} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @ViewChild('ref1') bla!: ElementRef;
            @ViewChildren('refs') bla2!: QueryList<ElementRef>;

            click() {
              this.bla = undefined;
              this.bla2.changes.subscribe();
            }
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('App¦Component');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(2);
            expect(refactorings[0].name).toBe('convert-full-class-to-signal-queries-safe-mode');
            expect(refactorings[1].name).toBe('convert-full-class-to-signal-queries-best-effort-mode');
            const result = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toContain('2 queries could not be migrated.');
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toContain('click on the skipped queries and try to migrate individually.');
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toContain('action to forcibly convert.');
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toBe(undefined);
            expect(result === null || result === void 0 ? void 0 : result.edits).toEqual([]);
        }));
        it('should not suggest force mode when all queries are incompatible and non-ignorable', () => __awaiter(void 0, void 0, void 0, function* () {
            const files = {
                'app.ts': `
          import {Directive, ViewChild} from '@angular/core';

          @Directive({})
          export class AppComponent {
            @ViewChild('ref1') set bla(v: string) {};
            @ViewChild('ref2') set bla2(v: string) {};
          }
     `,
            };
            const project = (0, testing_2.createModuleAndProjectWithDeclarations)(env, 'test', files);
            const appFile = project.openFile('app.ts');
            appFile.moveCursorToText('App¦Component');
            const refactorings = project.getRefactoringsAtPosition('app.ts', appFile.cursor);
            expect(refactorings.length).toBe(2);
            expect(refactorings[0].name).toBe('convert-full-class-to-signal-queries-safe-mode');
            expect(refactorings[1].name).toBe('convert-full-class-to-signal-queries-best-effort-mode');
            const result = yield project.applyRefactoring('app.ts', appFile.cursor, refactorings[0].name, () => { });
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toContain('2 queries could not be migrated.');
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).toContain('click on the skipped queries and try to migrate individually.');
            expect(result === null || result === void 0 ? void 0 : result.errorMessage).not.toContain('action to forcibly convert.');
            expect(result === null || result === void 0 ? void 0 : result.warningMessage).toBe(undefined);
            expect(result === null || result === void 0 ? void 0 : result.edits).toEqual([]);
        }));
    });
});
