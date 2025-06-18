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
const compiler_cli_1 = require("@angular/compiler-cli");
const testing_1 = require("../../utils/tsurge/testing");
const migration_1 = require("./migration");
const testing_2 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const diff_1 = require("../../utils/tsurge/testing/diff");
const dedent_1 = require("../../utils/tsurge/testing/dedent");
const jasmine_1 = require("../../utils/tsurge/testing/jasmine");
const declarationTestCases = [
    // View Child
    {
        id: 'viewChild with string locator and nullable',
        before: `@ViewChild('myBtn') button: MyButton|undefined = undefined;`,
        after: `readonly button = viewChild<MyButton>('myBtn');`,
    },
    {
        id: 'viewChild with class type locator and nullable',
        before: `@ViewChild(MyButton) button: MyButton|undefined = undefined;`,
        after: `readonly button = viewChild(MyButton);`,
    },
    {
        id: 'viewChild with class type locator and nullable via question-mark shorthand',
        before: `@ViewChild(MyButton) button?: MyButton;`,
        after: `readonly button = viewChild(MyButton);`,
    },
    {
        id: 'viewChild with class type locator and exclamation mark to simulate required',
        before: `@ViewChild(MyButton) button!: MyButton;`,
        after: `readonly button = viewChild.required(MyButton);`,
    },
    {
        id: 'viewChild with string locator and read option, nullable shorthand',
        before: `@ViewChild('myBtn', {read: ElementRef}) buttonEl?: ElementRef;`,
        after: `readonly buttonEl = viewChild('myBtn', { read: ElementRef });`,
    },
    {
        id: 'viewChild with string locator and read option, required',
        before: `@ViewChild('myBtn', {read: ElementRef}) buttonEl!: ElementRef;`,
        after: `readonly buttonEl = viewChild.required('myBtn', { read: ElementRef });`,
    },
    {
        id: 'viewChild retain accessibility modifier',
        before: `@ViewChild('sidenav') public sidenav: HTMLElement;`,
        after: `public readonly sidenav = viewChild<HTMLElement>('sidenav');`,
    },
    // Content Child
    {
        id: 'contentChild with string locator and nullable',
        before: `@ContentChild('myBtn') button: MyButton|undefined = undefined;`,
        after: `readonly button = contentChild<MyButton>('myBtn');`,
    },
    {
        id: 'contentChild with class type locator and nullable',
        before: `@ContentChild(MyButton) button: MyButton|undefined = undefined;`,
        after: `readonly button = contentChild(MyButton);`,
    },
    {
        id: 'contentChild with class type locator and nullable via question-mark shorthand',
        before: `@ContentChild(MyButton) button?: MyButton;`,
        after: `readonly button = contentChild(MyButton);`,
    },
    {
        id: 'contentChild with class type locator and exclamation mark to simulate required',
        before: `@ContentChild(MyButton) button!: MyButton;`,
        after: `readonly button = contentChild.required(MyButton);`,
    },
    {
        id: 'contentChild with string locator and read option, nullable shorthand',
        before: `@ContentChild('myBtn', {read: ElementRef}) buttonEl?: ElementRef;`,
        after: `readonly buttonEl = contentChild('myBtn', { read: ElementRef });`,
    },
    {
        id: 'contentChild with string locator and read option, required',
        before: `@ContentChild('myBtn', {read: ElementRef}) buttonEl!: ElementRef;`,
        after: `readonly buttonEl = contentChild.required('myBtn', { read: ElementRef });`,
    },
    {
        id: 'contentChild with string locator and read option, required',
        before: `@ContentChild('myBtn', {read: ElementRef}) buttonEl!: ElementRef;`,
        after: `readonly buttonEl = contentChild.required('myBtn', { read: ElementRef });`,
    },
    {
        id: 'contentChild with descendants option',
        before: `@ContentChild('myBtn', {descendants: false}) buttonEl!: ElementRef;`,
        after: `readonly buttonEl = contentChild.required<ElementRef>('myBtn', { descendants: false });`,
    },
    // ViewChildren
    {
        id: 'viewChildren with string locator and nullable',
        before: `@ViewChildren('myBtn') button?: QueryList<ElementRef>;`,
        after: `readonly button = viewChildren<ElementRef>('myBtn');`,
    },
    {
        id: 'viewChildren with class type locator and nullable',
        before: `@ViewChildren(MyButton) button?: QueryList<MyButton>;`,
        after: `readonly button = viewChildren(MyButton);`,
    },
    {
        id: 'viewChildren with class type locator and exclamation mark',
        before: `@ViewChildren(MyButton) button!: QueryList<MyButton>;`,
        after: `readonly button = viewChildren(MyButton);`,
    },
    {
        id: 'viewChild with string locator and read option, nullable shorthand',
        before: `@ViewChildren('myBtn', {read: ElementRef}) buttonEl?: QueryList<ElementRef>;`,
        after: `readonly buttonEl = viewChildren('myBtn', { read: ElementRef });`,
    },
    {
        id: 'viewChildren with string locator and read option, required',
        before: `@ViewChildren('myBtn', {read: ElementRef}) buttonEl!: QueryList<ElementRef>;`,
        after: `readonly buttonEl = viewChildren('myBtn', { read: ElementRef });`,
    },
    {
        id: 'viewChildren with query list as initializer value',
        before: `@ViewChildren('myBtn') buttonEl = new QueryList<ElementRef>()`,
        after: `readonly buttonEl = viewChildren<ElementRef>('myBtn');`,
    },
    {
        id: 'viewChildren with query list as initializer value, and descendants option',
        before: `@ViewChildren('myBtn', {descendants: false}) buttonEl = new QueryList<ElementRef>()`,
        after: `readonly buttonEl = viewChildren<ElementRef>('myBtn', { descendants: false });`,
    },
    {
        id: 'viewChildren with query list as initializer value, and descendants option but same as default',
        before: `@ViewChildren('myBtn', {descendants: true}) buttonEl = new QueryList<ElementRef>()`,
        after: `readonly buttonEl = viewChildren<ElementRef>('myBtn');`,
    },
    {
        id: 'viewChildren retain accessibility modifier',
        before: `@ViewChildren('sidenav') public sidenav: HTMLElement;`,
        after: `public readonly sidenav = viewChildren('sidenav');`,
    },
    // ContentChildren
    {
        id: 'contentChildren with string locator and nullable',
        before: `@ContentChildren('myBtn') button?: QueryList<ElementRef>;`,
        after: `readonly button = contentChildren<ElementRef>('myBtn');`,
    },
    {
        id: 'contentChildren with class type locator and nullable',
        before: `@ContentChildren(MyButton) button?: QueryList<MyButton>;`,
        after: `readonly button = contentChildren(MyButton);`,
    },
    {
        id: 'contentChildren with class type locator and exclamation mark',
        before: `@ContentChildren(MyButton) button!: QueryList<MyButton>;`,
        after: `readonly button = contentChildren(MyButton);`,
    },
    {
        id: 'contentChildren with string locator and read option, nullable shorthand',
        before: `@ContentChildren('myBtn', {read: ElementRef}) buttonEl?: QueryList<ElementRef>;`,
        after: `readonly buttonEl = contentChildren('myBtn', { read: ElementRef });`,
    },
    {
        id: 'contentChildren with string locator and read option, required',
        before: `@ContentChildren('myBtn', {read: ElementRef}) buttonEl!: QueryList<ElementRef>;`,
        after: `readonly buttonEl = contentChildren('myBtn', { read: ElementRef });`,
    },
    {
        id: 'contentChildren with query list as initializer value',
        before: `@ContentChildren('myBtn') buttonEl = new QueryList<ElementRef>()`,
        after: `readonly buttonEl = contentChildren<ElementRef>('myBtn');`,
    },
    {
        id: 'contentChildren with query list as initializer value, and descendants option',
        before: `@ContentChildren('myBtn', {descendants: true}) buttonEl = new QueryList<ElementRef>()`,
        after: `readonly buttonEl = contentChildren<ElementRef>('myBtn', { descendants: true });`,
    },
    {
        id: 'contentChildren with query list as initializer value, and descendants option but same as default',
        before: `@ContentChildren('myBtn', {descendants: false}) buttonEl = new QueryList<ElementRef>()`,
        after: `readonly buttonEl = contentChildren<ElementRef>('myBtn');`,
    },
    // custom cases.
    {
        id: 'query with no resolvable ReadT',
        before: `@ContentChild('myBtn') buttonEl?: ElementRef`,
        after: `readonly buttonEl = contentChild<ElementRef>('myBtn');`,
    },
    {
        id: 'query with explicit ReadT',
        before: `@ContentChild('myBtn', {read: ButtonEl}) buttonEl?: ButtonEl`,
        after: `readonly buttonEl = contentChild('myBtn', { read: ButtonEl });`,
    },
    {
        id: 'query with explicit ReadT',
        before: `@ContentChild(SomeDir, {read: ElementRef}) buttonEl!: ElementRef`,
        after: `readonly buttonEl = contentChild.required(SomeDir, { read: ElementRef });`,
    },
    {
        id: 'query with no initializer and strict null checks enabled',
        before: `@ContentChild(ButtonEl) buttonEl: ElementRef;`,
        // with --strictNullChecks, `buttonEl` is technically required and the
        // user code assumes that throughout the project; as the type does not include
        // `undefined.`
        after: `readonly buttonEl = contentChild.required(ButtonEl);`,
        options: { strict: false, strictNullChecks: true },
    },
    {
        id: 'query with no initializer, strict null checks enabled, but includes `undefined` in type',
        before: `@ContentChild(ButtonEl) buttonEl: ElementRef|undefined;`,
        // `undefined` is explicitly included, so keeping as an optional query
        // is a reasonable migration without runtime changes.
        after: `readonly buttonEl = contentChild(ButtonEl);`,
        options: { strict: false, strictNullChecks: true },
    },
    {
        id: 'query with no initializer, strict null checks enabled, includes `undefined` via question mark',
        before: `@ContentChild(ButtonEl) buttonEl?: ElementRef;`,
        // `undefined` is explicitly included, so keeping as an optional query
        // is a reasonable migration without runtime changes.
        after: `readonly buttonEl = contentChild(ButtonEl);`,
        options: { strict: false, strictNullChecks: true },
    },
];
describe('signal queries migration', () => {
    beforeEach(() => {
        (0, jasmine_1.setupTsurgeJasmineHelpers)();
        (0, testing_2.initMockFileSystem)('Native');
    });
    describe('declaration test cases', () => {
        for (const c of declarationTestCases) {
            (c.focus ? fit : it)(c.id, () => __awaiter(void 0, void 0, void 0, function* () {
                const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
                    {
                        name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                        isProgramRootFile: true,
                        contents: populateDeclarationTestCaseComponent(c.before),
                    },
                ], c.options);
                let actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
                let expected = populateDeclarationTestCaseComponent(c.after);
                // Cut off the string before the class declaration.
                // The import diff is irrelevant here for now.
                actual = actual.substring(actual.indexOf('@Directive'));
                expected = expected.substring(expected.indexOf('@Directive'));
                if (actual !== expected) {
                    expect((0, diff_1.diffText)(expected, actual)).toBe('');
                }
            }));
        }
    });
    it('should not migrate if there is a write to a query', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: `
          import {ViewChild, ElementRef, Directive} from '@angular/core';

          @Directive()
          class MyComp {
            @ViewChild('labelRef') label?: ElementRef;

            click() {
              this.label = undefined;
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).not.toContain(`viewChild`);
        expect(actual).toContain(`@ViewChild('labelRef') label?: ElementRef;`);
    }));
    it('should update imports when migrating', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: `
          import {ViewChild, ElementRef, Directive} from '@angular/core';

          @Directive()
          class MyComp {
            @ViewChild('labelRef') label?: ElementRef;
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toContain(`import {ElementRef, Directive, viewChild} from '@angular/core';`);
        expect(actual).toContain(`label = viewChild<ElementRef>('labelRef')`);
    }));
    it('should update TS references when migrating', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChild, ElementRef, Directive} from '@angular/core';

          @Directive()
          class MyComp {
            @ViewChild('labelRef') label?: ElementRef;
            @ViewChild('always', {read: ElementRef}) always!: ElementRef;

            doSmth() {
              if (this.label !== undefined) {
                this.label.nativeElement.textContent;
              }

              this.always.nativeElement.textContent;
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Directive, viewChild} from '@angular/core';

      @Directive()
      class MyComp {
        readonly label = viewChild<ElementRef>('labelRef');
        readonly always = viewChild.required('always', { read: ElementRef });

        doSmth() {
          const label = this.label();
          if (label !== undefined) {
            label.nativeElement.textContent;
          }

          this.always().nativeElement.textContent;
        }
      }
    `);
    }));
    it('should update template references when migrating', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChild, ElementRef, Component} from '@angular/core';

          @Component({
            template: '<div>{{label}}</div>'
          })
          class MyComp {
            @ViewChild('labelRef') label?: ElementRef;
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChild} from '@angular/core';

      @Component({
        template: '<div>{{label()}}</div>'
      })
      class MyComp {
        readonly label = viewChild<ElementRef>('labelRef');
      }
    `);
    }));
    it('should update references part of control flow expressions that cannot narrow ' +
        '(due to no second usage inside the template)', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChild, ElementRef, Component} from '@angular/core';

          @Component({
            template: '<div *ngIf="label !== undefined">Showing</div>'
          })
          class MyComp {
            @ViewChild('labelRef') label?: ElementRef;
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChild} from '@angular/core';

      @Component({
        template: '<div *ngIf="label() !== undefined">Showing</div>'
      })
      class MyComp {
        readonly label = viewChild<ElementRef>('labelRef');
      }
    `);
    }));
    it('should not update references part of narrowing template expressions', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChild, ElementRef, Component} from '@angular/core';

          @Component({
            template: \`
              <div *ngIf="label !== undefined">
                {{label.nativeElement.textContent}}
              </div>\`
          })
          class MyComp {
            @ViewChild('labelRef') label?: ElementRef;
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ViewChild, ElementRef, Component} from '@angular/core';

      @Component({
        template: \`
          <div *ngIf="label !== undefined">
            {{label.nativeElement.textContent}}
          </div>\`
      })
      class MyComp {
        @ViewChild('labelRef') label?: ElementRef;
      }
    `);
    }));
    it('should update references in host bindings', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChild, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
            host: {
              '(click)': 'label.textContent',
            }
          })
          class MyComp {
            @ViewChild('labelRef') label?: ElementRef;
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChild} from '@angular/core';

      @Component({
        template: '',
        host: {
          '(click)': 'label().textContent',
        }
      })
      class MyComp {
        readonly label = viewChild<ElementRef>('labelRef');
      }
    `);
    }));
    it('should not remove imports when partially migrating', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: `
          import {ViewChild, ElementRef, Directive} from '@angular/core';

          @Directive()
          class MyComp {
            @ViewChild('labelRef') label?: ElementRef;
            @ViewChild('labelRef2') label2?: ElementRef;

            click() {
              this.label2 = undefined;
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toContain(`import {ViewChild, ElementRef, Directive, viewChild} from '@angular/core';`);
        expect(actual).toContain(`label = viewChild<ElementRef>('labelRef')`);
        expect(actual).toContain(`@ViewChild('labelRef2') label2?: ElementRef;`);
    }));
    it('should not migrate if query class is manually instantiated', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: `
          import {ViewChild, ElementRef, Directive} from '@angular/core';

          @Directive()
          class MyComp implements CompInterface {
            @ViewChild('labelRef') label?: ElementRef;
          }

          new MyComp();
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).not.toContain(`viewChild`);
        expect(actual).toContain(`@ViewChild`);
    }));
    describe('inheritance', () => {
        it('should not migrate if member is inherited from interface', () => __awaiter(void 0, void 0, void 0, function* () {
            const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                    isProgramRootFile: true,
                    contents: `
            import {ViewChild, ElementRef, Directive} from '@angular/core';

            interface CompInterface {
              label: ElementRef;
            }

            @Directive()
            class MyComp implements CompInterface {
              @ViewChild('labelRef') label?: ElementRef;
            }
          `,
                },
            ]);
            const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
            expect(actual).not.toContain(`viewChild`);
            expect(actual).toContain(`@ViewChild`);
        }));
        it('should not migrate if member is overridden via derived class', () => __awaiter(void 0, void 0, void 0, function* () {
            const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                    isProgramRootFile: true,
                    contents: `
            import {ViewChild, ElementRef, Directive} from '@angular/core';

            @Directive()
            class MyComp implements CompInterface {
              @ViewChild('labelRef') label?: ElementRef;
            }

            class Derived extends MyComp {
              override label: ElementRef;
            }
          `,
                },
            ]);
            const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
            expect(actual).not.toContain(`viewChild`);
            expect(actual).toContain(`@ViewChild`);
        }));
    });
    it('should remove QueryList imports', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: ''
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChildren} from '@angular/core';

      @Component({
        template: ''
      })
      class MyComp {
        readonly labels = viewChildren<ElementRef>('label');
      }
    `);
    }));
    it('should not remove QueryList import when used elsewhere', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: ''
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();

            bla: QueryList<ElementRef> = null!;
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {QueryList, ElementRef, Component, viewChildren} from '@angular/core';

      @Component({
        template: ''
      })
      class MyComp {
        readonly labels = viewChildren<ElementRef>('label');

        bla: QueryList<ElementRef> = null!;
      }
    `);
    }));
    it('should not remove QueryList import when part of skipped query', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: ''
          })
          class MyComp {
            @ViewChildren('label') labels: QueryList|null = new QueryList<ElementRef>();

            click() {
              this.labels = null;
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

      @Component({
        template: ''
      })
      class MyComp {
        @ViewChildren('label') labels: QueryList|null = new QueryList<ElementRef>();

        click() {
          this.labels = null;
        }
      }
    `);
    }));
    it('should remove `toArray` function calls for multi queries', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: ''
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();

            click() {
              this.labels.toArray().some(bla);
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChildren} from '@angular/core';

      @Component({
        template: ''
      })
      class MyComp {
        readonly labels = viewChildren<ElementRef>('label');

        click() {
          this.labels().some(bla);
        }
      }
    `);
    }));
    it('should remove `toArray` function calls for multi queries, with control flow', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: ''
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();

            click() {
              if (this.labels) {
                this.labels.toArray().some(bla);
              }
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChildren} from '@angular/core';

      @Component({
        template: ''
      })
      class MyComp {
        readonly labels = viewChildren<ElementRef>('label');

        click() {
          const labels = this.labels();
          if (labels) {
            labels.some(bla);
          }
        }
      }
    `);
    }));
    it('should remove `toArray` function calls in templates and host bindings', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '{{ labels.toArray().some(bla) }}',
            host: {
              '[id]': 'labels.toArray().find(bla)',
            }
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChildren} from '@angular/core';

      @Component({
        template: '{{ labels().some(bla) }}',
        host: {
          '[id]': 'labels().find(bla)',
        }
      })
      class MyComp {
        readonly labels = viewChildren<ElementRef>('label');
      }
    `);
    }));
    it('should not update `toArray` function calls if query is incompatible', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: ''
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();

            click() {
              this.labels.destroy();
              this.labels.toArray().some(bla);
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

      @Component({
        template: ''
      })
      class MyComp {
        @ViewChildren('label') labels = new QueryList<ElementRef>();

        click() {
          this.labels.destroy();
          this.labels.toArray().some(bla);
        }
      }
    `);
    }));
    it('should replace `get` function calls for multi queries', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: ''
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();

            click() {
              if (this.labels) {
                this.labels.get(1)?.nativeElement;
              }
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChildren} from '@angular/core';

      @Component({
        template: ''
      })
      class MyComp {
        readonly labels = viewChildren<ElementRef>('label');

        click() {
          const labels = this.labels();
          if (labels) {
            labels.at(1)?.nativeElement;
          }
        }
      }
    `);
    }));
    it('should replace `get` function calls in templates and host bindings', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ContentChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '{{ labels.get(0).nativeElement.textContent }}',
            host: {
              '[id]': 'labels.get(0).nativeElement.textContent',
            }
          })
          class MyComp {
            @ContentChildren('label') labels = new QueryList<ElementRef>();
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, contentChildren} from '@angular/core';

      @Component({
        template: '{{ labels().at(0).nativeElement.textContent }}',
        host: {
          '[id]': 'labels().at(0).nativeElement.textContent',
        }
      })
      class MyComp {
        readonly labels = contentChildren<ElementRef>('label');
      }
    `);
    }));
    it('should not migrate a query relying on QueryList#changes', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ContentChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
          })
          class MyComp {
            @ContentChildren('label') labels = new QueryList<ElementRef>();

            ngOnInit() {
              this.labels.changes.subscribe(() => {});
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ContentChildren, QueryList, ElementRef, Component} from '@angular/core';

      @Component({
        template: '',
      })
      class MyComp {
        @ContentChildren('label') labels = new QueryList<ElementRef>();

        ngOnInit() {
          this.labels.changes.subscribe(() => {});
        }
      }
    `);
    }));
    it('should not migrate a query relying on QueryList#reset', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ContentChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
          })
          class MyComp {
            @ContentChildren('label') labels = new QueryList<ElementRef>();

            ngOnInit() {
              this.labels.reset();
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ContentChildren, QueryList, ElementRef, Component} from '@angular/core';

      @Component({
        template: '',
      })
      class MyComp {
        @ContentChildren('label') labels = new QueryList<ElementRef>();

        ngOnInit() {
          this.labels.reset();
        }
      }
    `);
    }));
    it('should not migrate a query relying on QueryList#dirty', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ContentChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
          })
          class MyComp {
            @ContentChildren('label') labels = new QueryList<ElementRef>();

            ngOnInit() {
              const isDirty = this.labels.dirty;
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ContentChildren, QueryList, ElementRef, Component} from '@angular/core';

      @Component({
        template: '',
      })
      class MyComp {
        @ContentChildren('label') labels = new QueryList<ElementRef>();

        ngOnInit() {
          const isDirty = this.labels.dirty;
        }
      }
    `);
    }));
    it('should not migrate a query relying on QueryList#setDirty', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();

            ngOnInit() {
              this.labels.setDirty();
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

      @Component({
        template: '',
      })
      class MyComp {
        @ViewChildren('label') labels = new QueryList<ElementRef>();

        ngOnInit() {
          this.labels.setDirty();
        }
      }
    `);
    }));
    it('should not migrate a query relying on QueryList#notifyOnChanges', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();

            ngOnInit() {
              this.labels.notifyOnChanges();
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

      @Component({
        template: '',
      })
      class MyComp {
        @ViewChildren('label') labels = new QueryList<ElementRef>();

        ngOnInit() {
          this.labels.notifyOnChanges();
        }
      }
    `);
    }));
    it('should not migrate a query relying on QueryList#destroy', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '<button (click)="labels.destroy()"></button>',
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

      @Component({
        template: '<button (click)="labels.destroy()"></button>',
      })
      class MyComp {
        @ViewChildren('label') labels = new QueryList<ElementRef>();
      }
    `);
    }));
    it('should migrate a single-result query that accesses a `.changes` field, ' +
        'unrelated to QueryList', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
            import {ViewChild, ElementRef, Component} from '@angular/core';

            @Component({
              template: '',
            })
            class MyComp {
              @ViewChild('label') label!: ElementRef;

              ngOnInit() {
                this.label.changes;
              }
            }
          `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
        import {ElementRef, Component, viewChild} from '@angular/core';

        @Component({
          template: '',
        })
        class MyComp {
          readonly label = viewChild.required<ElementRef>('label');

          ngOnInit() {
            this.label().changes;
          }
        }
      `);
    }));
    it('should migrate `QueryList#first`', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();

            ngOnInit() {
              if (this.labels.first.nativeElement.textContent) {
                // do smth.
              };
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChildren} from '@angular/core';

      @Component({
        template: '',
      })
      class MyComp {
        readonly labels = viewChildren<ElementRef>('label');

        ngOnInit() {
          if (this.labels().at(0)!.nativeElement.textContent) {
            // do smth.
          };
        }
      }
    `);
    }));
    it('should migrate `QueryList#last`', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
          })
          class MyComp {
            @ViewChildren('label') labels = new QueryList<ElementRef>();

            ngOnInit() {
              if (this.labels.last.nativeElement.textContent) {
                // do smth.
              };
            }
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChildren} from '@angular/core';

      @Component({
        template: '',
      })
      class MyComp {
        readonly labels = viewChildren<ElementRef>('label');

        ngOnInit() {
          if (this.labels().at(-1)!.nativeElement.textContent) {
            // do smth.
          };
        }
      }
    `);
    }));
    it('should preserve existing property comments', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
          })
          class MyComp {
            /** works */
            @ViewChildren('label') labels = new QueryList<ElementRef>();
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ElementRef, Component, viewChildren} from '@angular/core';

      @Component({
        template: '',
      })
      class MyComp {
        /** works */
        readonly labels = viewChildren<ElementRef>('label');
      }
    `);
    }));
    it('should not break at runtime if there is an invalid query', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expectAsync((0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ContentChild, QueryList, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
          })
          class MyComp {
            // missing predicate/selector.
            @ContentChild() labels = new QueryList<ElementRef>();
          }
        `,
            },
        ])).not.toBeRejected();
    }));
    it('should properly deal with union types of single queries', () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration({}), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
          import {ViewChild, ElementRef, Component} from '@angular/core';

          @Component({
            template: '',
          })
          class MyComp {
            @ViewChild(MyService) bla: MyService|undefined = undefined;
            @ViewChild(MyService) bla2?: MyService;
            @ViewChild(MyService) bla3: MyService|null = null;
            @ViewChild(MyService) bla4: MyService|SomethingUnrelated = null!;
            @ViewChild(MyService) bla5!: MyService|SomethingUnrelated;
          }
        `,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
        expect(actual).toMatchWithDiff(`
      import {ViewChild, ElementRef, Component, viewChild} from '@angular/core';

      @Component({
        template: '',
      })
      class MyComp {
        readonly bla = viewChild(MyService);
        readonly bla2 = viewChild(MyService);
        @ViewChild(MyService) bla3: MyService|null = null;
        @ViewChild(MyService) bla4: MyService|SomethingUnrelated = null!;
        @ViewChild(MyService) bla5!: MyService|SomethingUnrelated;
      }
    `);
    }));
    describe('--best-effort-mode', () => {
        it('should be possible to forcibly migrate even with a detected `.changes` access', () => __awaiter(void 0, void 0, void 0, function* () {
            const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration({ bestEffortMode: true }), [
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                    isProgramRootFile: true,
                    contents: (0, dedent_1.dedent) `
            import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

            @Component({
              template: '',
            })
            class MyComp {
              @ViewChildren('label') labels = new QueryList<ElementRef>();

              click() {
                this.labels.changes.subscribe();
              }
            }
          `,
                },
            ]);
            const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
            expect(actual).toMatchWithDiff(`
        import {ElementRef, Component, viewChildren} from '@angular/core';

        @Component({
          template: '',
        })
        class MyComp {
          readonly labels = viewChildren<ElementRef>('label');

          click() {
            this.labels().changes.subscribe();
          }
        }
      `);
        }));
        it(`should not forcibly migrate if it's an accessor field`, () => __awaiter(void 0, void 0, void 0, function* () {
            const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration({ bestEffortMode: true }), [
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                    isProgramRootFile: true,
                    contents: (0, dedent_1.dedent) `
            import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

            @Component({
              template: '',
            })
            class MyComp {
              @ViewChildren('label')
              set labels(list: QueryList<ElementRef>) {}
            }
          `,
                },
            ]);
            const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
            expect(actual).toMatchWithDiff(`
        import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

        @Component({
          template: '',
        })
        class MyComp {
          @ViewChildren('label')
          set labels(list: QueryList<ElementRef>) {}
        }
      `);
        }));
    });
    describe('--insert-todos-for-skipped-fields', () => {
        it('should add a TODO for queries accessing QueryList#changes', () => __awaiter(void 0, void 0, void 0, function* () {
            const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration({ insertTodosForSkippedFields: true }), [
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                    isProgramRootFile: true,
                    contents: (0, dedent_1.dedent) `
              import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

              @Component({
                template: '',
              })
              class MyComp {
                @ViewChildren('label') labels = new QueryList<ElementRef>();

                click() {
                  this.labels.changes.subscribe();
                }
              }
          `,
                },
            ]);
            const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
            expect(actual).toMatchWithDiff(`
        import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

        @Component({
          template: '',
        })
        class MyComp {
          // TODO: Skipped for migration because:
          //  There are references to this query that cannot be migrated automatically.
          @ViewChildren('label') labels = new QueryList<ElementRef>();

          click() {
            this.labels.changes.subscribe();
          }
        }
      `);
        }));
        it(`should add a TODO for incompatible accessor fields`, () => __awaiter(void 0, void 0, void 0, function* () {
            const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration({ insertTodosForSkippedFields: true }), [
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                    isProgramRootFile: true,
                    contents: (0, dedent_1.dedent) `
              import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

              @Component({
                template: '',
              })
              class MyComp {
                @ViewChildren('label')
                set labels(list: QueryList<ElementRef>) {}
              }
          `,
                },
            ]);
            const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'));
            expect(actual).toMatchWithDiff(`
        import {ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

        @Component({
          template: '',
        })
        class MyComp {
          // TODO: Skipped for migration because:
          //  Accessor queries cannot be migrated as they are too complex.
          @ViewChildren('label')
          set labels(list: QueryList<ElementRef>) {}
        }
      `);
        }));
    });
    it(`should be able to compute statistics`, () => __awaiter(void 0, void 0, void 0, function* () {
        const { getStatistics } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration({ insertTodosForSkippedFields: true }), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
            import {ViewChild, ViewChildren, QueryList, ElementRef, Component} from '@angular/core';

            @Component({
              template: '',
            })
            class MyComp {
              @ViewChildren('label')
              set labels(list: QueryList<ElementRef>) {}

              @ViewChildren('refs') bla!: QueryList<ElementRef>;
              @ViewChild('refs') blaWrittenTo?: ElementRef;

              click() {
                this.blaWrittenTo = undefined;
              }
            }
        `,
            },
        ]);
        expect(yield getStatistics()).toEqual({
            counters: {
                queriesCount: 3,
                multiQueries: 2,
                incompatibleQueries: 2,
                'incompat-field-Accessor': 1,
                'incompat-field-WriteAssignment': 1,
            },
        });
    }));
    it(`should skip queries that are annotated with @HostBinding`, () => __awaiter(void 0, void 0, void 0, function* () {
        const { fs } = yield (0, testing_1.runTsurgeMigration)(new migration_1.SignalQueriesMigration({ insertTodosForSkippedFields: true }), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: (0, dedent_1.dedent) `
            import {ViewChild, HostBinding, Component, ElementRef} from '@angular/core';

            @Component({template: ''})
            class MyComp {
              @HostBinding('[attr.ref-name]')
              @ViewChild('ref', {read: RefNameStringToken})
              ref!: string;
            }
        `,
            },
        ]);
        expect(fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts'))).toMatchWithDiff(`
      import {ViewChild, HostBinding, Component, ElementRef} from '@angular/core';

      @Component({template: ''})
      class MyComp {
        // TODO: Skipped for migration because:
        //  This query is used in combination with \`@HostBinding\` and migrating would
        //  break.
        @HostBinding('[attr.ref-name]')
        @ViewChild('ref', {read: RefNameStringToken})
        ref!: string;
      }
    `);
    }));
});
function populateDeclarationTestCaseComponent(declaration) {
    return `
    import {
      ViewChild,
      ViewChildren,
      ContentChild,
      ContentChildren,
      Directive
    } from '@angular/core';

    type ElementRef = {};

    @Directive()
    export class TestDir {
      ${declaration}
    }
  `;
}
