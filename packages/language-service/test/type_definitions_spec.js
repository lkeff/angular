"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/compiler-cli/src/ngtsc/file_system/testing");
const testing_2 = require("../testing");
describe('type definitions', () => {
    let env;
    it('returns the pipe class as definition when checkTypeOfPipes is false', () => {
        (0, testing_1.initMockFileSystem)('Native');
        const files = {
            'app.ts': `
        import {Component, NgModule} from '@angular/core';
        import {CommonModule} from '@angular/common';

        @Component({
          templateUrl: 'app.html',
          standalone: false,
        })
        export class AppCmp {}

        @NgModule({declarations: [AppCmp], imports: [CommonModule]})
        export class AppModule {}
      `,
            'app.html': `Will be overridden`,
        };
        // checkTypeOfPipes is set to false when strict templates is false
        env = testing_2.LanguageServiceTestEnv.setup();
        const project = env.addProject('test', files, { strictTemplates: false });
        const definitions = getTypeDefinitionsAndAssertBoundSpan(project, {
            templateOverride: '{{"1/1/2020" | dat¦e}}',
        });
        expect(definitions.length).toEqual(3);
        (0, testing_2.assertTextSpans)(definitions, ['transform']);
        (0, testing_2.assertFileNames)(definitions, ['index.d.ts']);
    });
    describe('inputs', () => {
        it('return the definition for a signal input', () => {
            (0, testing_1.initMockFileSystem)('Native');
            const files = {
                'app.ts': `
          import {Component, Directive, input} from '@angular/core';

          @Directive({
            selector: 'my-dir',
            standalone: true
          })
          export class MyDir {
            firstName = input<string>();
          }

          @Component({
            templateUrl: 'app.html',
            standalone: true,
            imports: [MyDir],
          })
          export class AppCmp {}
        `,
                'app.html': `Will be overridden`,
            };
            env = testing_2.LanguageServiceTestEnv.setup();
            const project = env.addProject('test', files);
            const definitions = getTypeDefinitionsAndAssertBoundSpan(project, {
                templateOverride: `<my-dir [first¦Name]="undefined" />`,
            });
            expect(definitions.length).toEqual(1);
            (0, testing_2.assertTextSpans)(definitions, ['InputSignal']);
            (0, testing_2.assertFileNames)(definitions, ['index.d.ts']);
        });
    });
    describe('initializer-based output() API', () => {
        it('return the definition for an output', () => {
            (0, testing_1.initMockFileSystem)('Native');
            const files = {
                'app.ts': `
          import {Component, Directive, output} from '@angular/core';

          @Directive({
            selector: 'my-dir',
            standalone: true
          })
          export class MyDir {
            nameChanges = output<string>();
          }

          @Component({
            templateUrl: 'app.html',
            standalone: true,
            imports: [MyDir],
          })
          export class AppCmp {
            doSmth() {}
          }
        `,
                'app.html': `Will be overridden`,
            };
            env = testing_2.LanguageServiceTestEnv.setup();
            const project = env.addProject('test', files);
            const definitions = getTypeDefinitionsAndAssertBoundSpan(project, {
                templateOverride: `<my-dir (name¦Changes)="doSmth()" />`,
            });
            expect(definitions.length).toEqual(1);
            (0, testing_2.assertTextSpans)(definitions, ['OutputEmitterRef']);
            (0, testing_2.assertFilePaths)(definitions, [/node_modules\/@angular\/core\/.*\.d\.ts/]);
        });
    });
    describe('initializer-based outputFromObservable() API', () => {
        it('return the definition for an output', () => {
            (0, testing_1.initMockFileSystem)('Native');
            const files = {
                'app.ts': `
          import {Component, Directive, EventEmitter} from '@angular/core';
          import {outputFromObservable} from '@angular/core/rxjs-interop';

          @Directive({
            selector: 'my-dir',
            standalone: true
          })
          export class MyDir {
            nameChanges = outputFromObservable(new EventEmitter<number>());
          }

          @Component({
            templateUrl: 'app.html',
            standalone: true,
            imports: [MyDir],
          })
          export class AppCmp {
            doSmth() {}
          }
        `,
                'app.html': `Will be overridden`,
            };
            env = testing_2.LanguageServiceTestEnv.setup();
            const project = env.addProject('test', files);
            const definitions = getTypeDefinitionsAndAssertBoundSpan(project, {
                templateOverride: `<my-dir (name¦Changes)="doSmth()" />`,
            });
            expect(definitions.length).toEqual(1);
            (0, testing_2.assertTextSpans)(definitions, ['OutputRef']);
            (0, testing_2.assertFilePaths)(definitions, [/node_modules\/@angular\/core\/.*\.d\.ts/]);
        });
    });
    describe('model inputs', () => {
        const files = {
            'app.ts': `
        import {Component, Directive, model} from '@angular/core';

        @Directive({
          selector: 'my-dir',
          standalone: true
        })
        export class MyDir {
          twoWayValue = model<string>();
        }

        @Component({
          templateUrl: 'app.html',
          standalone: true,
          imports: [MyDir],
        })
        export class AppCmp {
          noop() {}
          value = 'hello' as string | undefined;
        }
      `,
            'app.html': `Will be overridden`,
        };
        it('should return the definition for the property side of a two-way binding', () => {
            (0, testing_1.initMockFileSystem)('Native');
            env = testing_2.LanguageServiceTestEnv.setup();
            const project = env.addProject('test', files);
            const definitions = getTypeDefinitionsAndAssertBoundSpan(project, {
                templateOverride: `<my-dir [twoWa¦yValue]="value" />`,
            });
            expect(definitions.length).toBe(1);
            (0, testing_2.assertTextSpans)(definitions, ['ModelSignal']);
            (0, testing_2.assertFileNames)(definitions, ['index.d.ts']);
        });
        it('should return the definition for the event side of a two-way binding', () => {
            (0, testing_1.initMockFileSystem)('Native');
            env = testing_2.LanguageServiceTestEnv.setup();
            const project = env.addProject('test', files);
            const definitions = getTypeDefinitionsAndAssertBoundSpan(project, {
                templateOverride: `<my-dir (twoWayV¦alueChange)="noop()" />`,
            });
            expect(definitions.length).toBe(1);
            (0, testing_2.assertTextSpans)(definitions, ['ModelSignal']);
            (0, testing_2.assertFileNames)(definitions, ['index.d.ts']);
        });
        it('should return the definition of a two-way binding', () => {
            (0, testing_1.initMockFileSystem)('Native');
            env = testing_2.LanguageServiceTestEnv.setup();
            const project = env.addProject('test', files);
            const definitions = getTypeDefinitionsAndAssertBoundSpan(project, {
                templateOverride: `<my-dir [(twoWa¦yValue)]="value" />`,
            });
            expect(definitions.length).toBe(1);
            (0, testing_2.assertTextSpans)(definitions, ['ModelSignal']);
            (0, testing_2.assertFileNames)(definitions, ['index.d.ts']);
        });
    });
    function getTypeDefinitionsAndAssertBoundSpan(project, { templateOverride }) {
        const text = templateOverride.replace('¦', '');
        const template = project.openFile('app.html');
        template.contents = text;
        env.expectNoSourceDiagnostics();
        project.expectNoTemplateDiagnostics('app.ts', 'AppCmp');
        template.moveCursorToText(templateOverride);
        const defs = template.getTypeDefinitionAtPosition();
        expect(defs).toBeTruthy();
        return defs.map((d) => (0, testing_2.humanizeDocumentSpanLike)(d, env));
    }
});
