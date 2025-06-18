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
const testing_2 = require("../../utils/tsurge/testing");
const diff_1 = require("../../utils/tsurge/testing/diff");
const compiler_cli_1 = require("@angular/compiler-cli");
const output_migration_1 = require("./output-migration");
describe('outputs', () => {
    beforeEach(() => {
        (0, testing_1.initMockFileSystem)('Native');
    });
    describe('outputs migration', () => {
        describe('EventEmitter declarations without problematic access patterns', () => {
            it('should migrate declaration with a primitive type hint', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyDeclaration({
                    before: '@Output() readonly someChange = new EventEmitter<string>();',
                    after: 'readonly someChange = output<string>();',
                });
            }));
            it('should migrate declaration with complex type hint', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyDeclaration({
                    before: '@Output() readonly someChange = new EventEmitter<string | number>();',
                    after: 'readonly someChange = output<string | number>();',
                });
            }));
            it('should keep type without initializer', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyDeclaration({
                    before: '@Output() eventMovement: EventEmitter<IResponse> = new EventEmitter();',
                    after: 'readonly eventMovement = output<IResponse>();',
                });
            }));
            it('should keep type with initializer', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyDeclaration({
                    before: '@Output() eventMovement: EventEmitter = new EventEmitter<IResponse>();',
                    after: 'readonly eventMovement = output<IResponse>();',
                });
            }));
            it('should keep type without initializer and with alias', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyDeclaration({
                    before: "@Output('customEvent') eventMovement: EventEmitter<IResponse> = new EventEmitter();",
                    after: "readonly eventMovement = output<IResponse>({ alias: 'customEvent' });",
                });
            }));
            it('should migrate declaration without type hint', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyDeclaration({
                    before: '@Output() readonly someChange = new EventEmitter();',
                    after: 'readonly someChange = output();',
                });
            }));
            it('should take alias into account', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyDeclaration({
                    before: `@Output('otherChange') readonly someChange = new EventEmitter();`,
                    after: `readonly someChange = output({ alias: 'otherChange' });`,
                });
            }));
            it('should not migrate aliases that do not evaluate to static string', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyNoChange(`
            import {Directive, Output, EventEmitter} from '@angular/core';

            const someConst = 'otherChange' as const;

            @Directive()
            export class TestDir {
              @Output(aliasParam) someChange = new EventEmitter();
            }
          `);
            }));
            it('should add readonly modifier', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyDeclaration({
                    before: '@Output() someChange = new EventEmitter();',
                    after: 'readonly someChange = output();',
                });
            }));
            it('should respect visibility modifiers', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyDeclaration({
                    before: `@Output() protected someChange = new EventEmitter();`,
                    after: `protected readonly someChange = output();`,
                });
            }));
            it('should preserve single line JSdoc comments when migrating outputs', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
            import {Directive, Output, EventEmitter} from '@angular/core';

            @Directive()
            export class TestDir {
              /** Whenever there is change, emits an event. */
              @Output() someChange = new EventEmitter();
            }
          `,
                    after: `
            import {Directive, output} from '@angular/core';

            @Directive()
            export class TestDir {
              /** Whenever there is change, emits an event. */
              readonly someChange = output();
            }
          `,
                });
            }));
            it('should preserve multiline JSdoc comments when migrating outputs', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
              import {Directive, Output, EventEmitter} from '@angular/core';

              @Directive()
              export class TestDir {
                /**
                 * Whenever there is change, emits an event.
                 */
                @Output() someChange = new EventEmitter();
              }
            `,
                    after: `
              import {Directive, output} from '@angular/core';

              @Directive()
              export class TestDir {
                /**
                 * Whenever there is change, emits an event.
                 */
                readonly someChange = output();
              }
            `,
                });
            }));
            it('should preserve multiline comments when migrating outputs', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
              import {Directive, Output, EventEmitter} from '@angular/core';

              @Directive()
              export class TestDir {
                /* Whenever there is change,emits an event. */
                @Output() someChange = new EventEmitter();
              }
            `,
                    after: `
              import {Directive, output} from '@angular/core';

              @Directive()
              export class TestDir {
                /* Whenever there is change,emits an event. */
                readonly someChange = output();
              }
            `,
                });
            }));
            it('should not insert a TODO comment for emit function with no type', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
              import {Directive, Output, EventEmitter} from '@angular/core';

              @Directive()
              export class TestDir {
                @Output() someChange = new EventEmitter();

                someMethod(): void {
                  this.someChange.emit();
                }
              }
            `,
                    after: `
              import {Directive, output} from '@angular/core';

              @Directive()
              export class TestDir {
                readonly someChange = output();

                someMethod(): void {
                  this.someChange.emit();
                }
              }
            `,
                });
            }));
            it('should insert a TODO comment for emit function with type', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
              import {Directive, Output, EventEmitter} from '@angular/core';

              @Directive()
              export class TestDir {
                @Output() someChange = new EventEmitter<string>();

                someMethod(): void {
                  this.someChange.emit();
                }
              }
            `,
                    after: `
              import {Directive, output} from '@angular/core';

              @Directive()
              export class TestDir {
                readonly someChange = output<string>();

                someMethod(): void {
                  // TODO: The 'emit' function requires a mandatory string argument
                  this.someChange.emit();
                }
              }
            `,
                });
            }));
            it('should migrate multiple outputs', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyDeclaration({
                    before: '@Output() someChange1 = new EventEmitter();\n@Output() someChange2 = new EventEmitter();',
                    after: `readonly someChange1 = output();\nreadonly someChange2 = output();`,
                });
            }));
            it('should migrate only EventEmitter outputs when multiple outputs exist', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
              import {Directive, Output, EventEmitter, Subject} from '@angular/core';

              @Directive()
              export class TestDir {
                @Output() someChange1 = new EventEmitter();
                @Output() someChange2 = new Subject();
              }
            `,
                    after: `
              import {Directive, Subject, output} from '@angular/core';

              @Directive()
              export class TestDir {
                readonly someChange1 = output();
                @Output() someChange2 = new Subject();
              }
            `,
                });
            }));
        });
        describe('.next migration', () => {
            it('should migrate .next usages that should have been .emit', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
            import {Directive, Output, EventEmitter} from '@angular/core';

            @Directive()
            export class TestDir {
              @Output() someChange = new EventEmitter<string>();

              onClick() {
                this.someChange.next('clicked');
              }
            }
          `,
                    after: `
            import {Directive, output} from '@angular/core';

            @Directive()
            export class TestDir {
              readonly someChange = output<string>();

              onClick() {
                this.someChange.emit('clicked');
              }
            }
          `,
                });
            }));
            it('should _not_ migrate .next usages when problematic output usage is detected', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyNoChange(`
            import {Directive, Output, EventEmitter} from '@angular/core';

            @Directive()
            export class TestDir {
              @Output() someChange = new EventEmitter<string>();

              onClick() {
                this.someChange.next('clicked');
              }

              someMethod() {
                this.someChange.pipe();
              }
            }
          `);
            }));
            it('should migrate .next usage inside inlined template expressions', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
            import {Component, Output, EventEmitter} from '@angular/core';

            @Component({
              selector: 'test-cmp',
              template: '<button (click)="someChange.next()">click me</button>'
            })
            export class TestCmpWithTemplate {
              @Output() someChange = new EventEmitter();
            }
          `,
                    after: `
            import {Component, output} from '@angular/core';

            @Component({
              selector: 'test-cmp',
              template: '<button (click)="someChange.emit()">click me</button>'
            })
            export class TestCmpWithTemplate {
              readonly someChange = output();
            }
          `,
                });
            }));
            it('should _not_ migrate .next usages when not an EventEmitter in external template', () => __awaiter(void 0, void 0, void 0, function* () {
                const tsContents = `
              import {Component} from '@angular/core';
              import {Subject} from 'rxjs';

              @Component({
                selector: 'test-cmp',
                templateUrl: '/app.component.html'
              })
              export class TestCmpWithTemplate {
                someChange = new Subject<void>();
              }
            `;
                const htmlContents = `<button (click)="someChange.next()">click me</button>`;
                const { fs } = yield (0, testing_2.runTsurgeMigration)(new output_migration_1.OutputMigration(), [
                    {
                        name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                        isProgramRootFile: true,
                        contents: tsContents,
                    },
                    {
                        name: (0, compiler_cli_1.absoluteFrom)('/app.component.html'),
                        contents: htmlContents,
                    },
                ]);
                const cmpActual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
                const htmlActual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.html'));
                // nothing should have changed
                expect(cmpActual).withContext((0, diff_1.diffText)(tsContents, cmpActual)).toEqual(tsContents);
                expect(htmlActual).withContext((0, diff_1.diffText)(htmlContents, htmlActual)).toEqual(htmlContents);
            }));
            it('should migrate .next usage inside external template expressions', () => __awaiter(void 0, void 0, void 0, function* () {
                const { fs } = yield (0, testing_2.runTsurgeMigration)(new output_migration_1.OutputMigration(), [
                    {
                        name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                        isProgramRootFile: true,
                        contents: `
              import {Component, Output, EventEmitter} from '@angular/core';

              @Component({
                selector: 'test-cmp',
                templateUrl: '/app.component.html'
              })
              export class TestCmpWithTemplate {
                @Output() someChange = new EventEmitter();
              }
            `,
                    },
                    {
                        name: (0, compiler_cli_1.absoluteFrom)('/app.component.html'),
                        contents: `<button (click)="someChange.next()">click me</button>`,
                    },
                ]);
                const cmpActual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
                const htmlActual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.html'));
                const cmpExpected = `
              import {Component, output} from '@angular/core';

              @Component({
                selector: 'test-cmp',
                templateUrl: '/app.component.html'
              })
              export class TestCmpWithTemplate {
                readonly someChange = output();
              }
            `;
                const htmlExpected = `<button (click)="someChange.emit()">click me</button>`;
                expect(cmpActual).withContext((0, diff_1.diffText)(cmpExpected, cmpActual)).toEqual(cmpExpected);
                expect(htmlActual).withContext((0, diff_1.diffText)(htmlExpected, htmlActual)).toEqual(htmlExpected);
            }));
            it('should migrate .next usage inside host listeners', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
            import {Component, Output, EventEmitter} from '@angular/core';

            @Component({
              selector: 'test-cmp',
              host: {
                '(click)': 'someChange.next()'
              },
              template: ''
            })
            export class TestCmpWithTemplate {
              @Output() someChange = new EventEmitter();
            }
          `,
                    after: `
            import {Component, output} from '@angular/core';

            @Component({
              selector: 'test-cmp',
              host: {
                '(click)': 'someChange.emit()'
              },
              template: ''
            })
            export class TestCmpWithTemplate {
              readonly someChange = output();
            }
          `,
                });
            }));
            it('should _not_ migrate .next usage inside host listeners if not an EventEmitter', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyNoChange(`
            import {Component, Output, EventEmitter} from '@angular/core';

            @Component({
              selector: 'test-cmp',
              host: {
                '(click)': 'someChange.next()'
              },
              template: ''
            })
            export class TestCmpWithTemplate {
              someChange = new Subject();
            }
          `);
            }));
            it('should migrate .next usage in @HostListener', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
            import {Component, Output, EventEmitter, HostListener} from '@angular/core';

            @Component({
              selector: 'test-cmp',
              template: '<button (click)="triggerSomeChange()">click me</button>'
            })
            export class TestCmpWithTemplate {
              @Output() someChange = new EventEmitter();

              @HostListener('click')
              triggerSomeChange() {
                this.someChange.next();
              }
            }
            `,
                    after: `
            import {Component, HostListener, output} from '@angular/core';

            @Component({
              selector: 'test-cmp',
              template: '<button (click)="triggerSomeChange()">click me</button>'
            })
            export class TestCmpWithTemplate {
              readonly someChange = output();

              @HostListener('click')
              triggerSomeChange() {
                this.someChange.emit();
              }
            }
            `,
                });
            }));
        });
        describe('.complete migration', () => {
            it('should remove .complete usage for migrated outputs', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
          import {Directive, Output, EventEmitter} from '@angular/core';

          @Directive()
          export class TestDir {
            @Output() someChange = new EventEmitter<string>();

            ngOnDestroy() {
              this.someChange.complete();
            }
          }
        `,
                    after: `
          import {Directive, output} from '@angular/core';

          @Directive()
          export class TestDir {
            readonly someChange = output<string>();

            ngOnDestroy() {
            }
          }
        `,
                });
            }));
            it('should remove .complete usage with comments', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verify({
                    before: `
          import {Directive, Output, EventEmitter} from '@angular/core';

          @Directive()
          export class TestDir {
            @Output() someChange = new EventEmitter<string>();

            ngOnDestroy() {
              // maybe complete before the destroy?
              this.someChange.complete();
            }
          }
        `,
                    after: `
          import {Directive, output} from '@angular/core';

          @Directive()
          export class TestDir {
            readonly someChange = output<string>();

            ngOnDestroy() {
            }
          }
        `,
                });
            }));
            it('should _not_ migrate .complete usage outside of expression statements', () => __awaiter(void 0, void 0, void 0, function* () {
                yield verifyNoChange(`
            import {Directive, Output, EventEmitter} from '@angular/core';

            @Directive()
            export class TestDir {
              @Output() someChange = new EventEmitter<string>();

              ngOnDestroy() {
                // play it safe and skip replacement for any .complete usage that are not
                // trivial expression statements
                (this.someChange.complete());
              }
            }
          `);
            }));
        });
        describe('.pipe migration', () => {
            describe('in test files', () => {
                it('should convert to observable in a test file importing jasmine', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield verify({
                        before: `
                import {Directive, Output, EventEmitter} from '@angular/core';
                import {map} from 'rxjs';
                import 'jasmine';

                @Directive()
                export class TestDir {
                  @Output() someChange = new EventEmitter<number>();
                  someChange$ = this.someChange.pipe(map((c) => c + 1)).pipe(map((d) => d - 1));
                }
              `,
                        after: `
                import { outputToObservable } from "@angular/core/rxjs-interop";

                import {Directive, output} from '@angular/core';
                import {map} from 'rxjs';
                import 'jasmine';

                @Directive()
                export class TestDir {
                  readonly someChange = output<number>();
                  someChange$ = outputToObservable(this.someChange).pipe(map((c) => c + 1)).pipe(map((d) => d - 1));
                }
              `,
                    });
                }));
            });
            describe('declarations _with_ problematic access patterns', () => {
                it('should _not_ migrate outputs that are used with .pipe', () => {
                    verifyNoChange(`
              import {Directive, Output, EventEmitter} from '@angular/core';

              @Directive()
              export class TestDir {
                @Output() someChange = new EventEmitter();

                someMethod() {
                  this.someChange.pipe();
                }
              }
            `);
                });
                it('should _not_ migrate outputs that are used with .pipe outside of a component class', () => {
                    verifyNoChange(`
              import {Directive, Output, EventEmitter} from '@angular/core';

              @Directive()
              export class TestDir {
                @Output() someChange = new EventEmitter();
              }

              let instance: TestDir;

              instance.someChange.pipe();
            `);
                });
            });
        });
    });
    describe('declarations other than EventEmitter', () => {
        it('should _not_ migrate outputs that are initialized with sth else than EventEmitter', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verify({
                before: populateDeclarationTestCase('@Output() protected someChange = new Subject();'),
                after: populateDeclarationTestCase('@Output() protected someChange = new Subject();'),
            });
        }));
    });
    describe('statistics', () => {
        it('should capture migration statistics with problematic usage detected', () => __awaiter(void 0, void 0, void 0, function* () {
            const runResults = yield (0, testing_2.runTsurgeMigration)(new output_migration_1.OutputMigration(), [
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                    isProgramRootFile: true,
                    contents: populateDeclarationTestCase(`
            @Output() protected ok1 = new EventEmitter();
            @Output() protected ok2 = new EventEmitter();
            @Output() protected ko1 = new EventEmitter();
            @Output() protected ko2 = new Subject();

            doSth() {
              this.ko1.pipe();
            }
        `),
                },
            ]);
            const stats = yield runResults.getStatistics();
            expect(stats.counters['detectedOutputs']).toBe(4);
            expect(stats.counters['problematicOutputs']).toBe(2);
            expect(stats.counters['successRate']).toBe(0.5);
        }));
        it('should capture migration statistics without problematic usages', () => __awaiter(void 0, void 0, void 0, function* () {
            const runResults = yield (0, testing_2.runTsurgeMigration)(new output_migration_1.OutputMigration(), [
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                    isProgramRootFile: true,
                    contents: populateDeclarationTestCase(`
            @Output() protected ok = new EventEmitter();
            @Output() protected ko = new EventEmitter();
        `),
                },
            ]);
            const stats = yield runResults.getStatistics();
            expect(stats.counters['detectedOutputs']).toBe(2);
            expect(stats.counters['problematicOutputs']).toBe(0);
            expect(stats.counters['successRate']).toBe(1);
        }));
    });
    describe('non-regression', () => {
        it('should properly process import replacements across multiple files', () => __awaiter(void 0, void 0, void 0, function* () {
            const { fs } = yield (0, testing_2.runTsurgeMigration)(new output_migration_1.OutputMigration(), [
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                    isProgramRootFile: true,
                    contents: `
            import {Component, Output, EventEmitter} from '@angular/core';

            @Component({selector: 'app-component'})
            export class AppComponent {
              @Output() appOut = new EventEmitter();
            }
          `,
                },
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/other.component.ts'),
                    isProgramRootFile: true,
                    contents: `
            import {Component, Output, EventEmitter} from '@angular/core';

            @Component({selector: 'other-component'})
            export class OtherComponent {
              @Output() otherOut = new EventEmitter();
            }
          `,
                },
            ]);
            for (const file of ['/app.component.ts', '/other.component.ts']) {
                const content = fs.readFile((0, compiler_cli_1.absoluteFrom)(file)).trim();
                const firstLine = content.split('\n')[0];
                expect(firstLine).toBe(`import {Component, output} from '@angular/core';`);
            }
        }));
    });
});
function verifyDeclaration(testCase) {
    return __awaiter(this, void 0, void 0, function* () {
        yield verify({
            before: populateDeclarationTestCase(testCase.before),
            after: populateExpectedResult(testCase.after),
        });
    });
}
function verifyNoChange(beforeAndAfter) {
    return __awaiter(this, void 0, void 0, function* () {
        yield verify({ before: beforeAndAfter, after: beforeAndAfter });
    });
}
function verify(testCase) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fs } = yield (0, testing_2.runTsurgeMigration)(new output_migration_1.OutputMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: testCase.before,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts')).trim();
        const expected = testCase.after.trim();
        expect(actual).withContext((0, diff_1.diffText)(expected, actual)).toEqual(expected);
    });
}
function populateDeclarationTestCase(declaration) {
    return `
import {
  Directive,
  Output,
  EventEmitter,
  Subject
} from '@angular/core';

@Directive()
export class TestDir {
  ${declaration}
}
`;
}
function populateExpectedResult(declaration) {
    return `
import {
  Directive,
  Subject,
  output
} from '@angular/core';

@Directive()
export class TestDir {
  ${declaration}
}
`;
}
