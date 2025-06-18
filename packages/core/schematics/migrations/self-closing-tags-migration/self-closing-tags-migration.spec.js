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
const compiler_cli_1 = require("@angular/compiler-cli");
const self_closing_tags_migration_1 = require("./self-closing-tags-migration");
describe('self-closing tags', () => {
    beforeEach(() => {
        (0, testing_1.initMockFileSystem)('Native');
    });
    describe('self-closing tags migration', () => {
        it('should skip dom elements', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verifyDeclarationNoChange(`<button id="123"></button>`);
        }));
        it('should skip custom elements with content', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verifyDeclarationNoChange(`<my-cmp>1</my-cmp>`);
        }));
        it('should skip already self-closing custom elements', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verifyDeclarationNoChange(`<my-cmp /> <my-cmp with="attributes" />`);
        }));
        it('should migrate custom elements', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verifyDeclaration({
                before: `<my-cmp></my-cmp>`,
                after: `<my-cmp />`,
            });
        }));
        it('should migrate custom elements with attributes', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verifyDeclaration({
                before: `<my-cmp attr="value"></my-cmp>`,
                after: `<my-cmp attr="value" />`,
            });
        }));
        it('should migrate multiple custom elements in the template', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verifyDeclaration({
                before: `<my-cmp></my-cmp><my-cmp></my-cmp>`,
                after: `<my-cmp /><my-cmp />`,
            });
        }));
        it('should migrate a template that contains directives, pipes, inputs, outputs, and events', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verifyDeclaration({
                before: `
          <app-management *ngIf="
              categoryList &&
              ((test1 && test1.length > 0) ||
              (test && test.length > 0))
            "
            [test]="test > 2"
            [test2]="test | uppercase"
            (click)="test.length > 0 ? test($event) : null"
            (testEvent)="test1($event)"></app-management>
        `,
                after: `
          <app-management *ngIf="
              categoryList &&
              ((test1 && test1.length > 0) ||
              (test && test.length > 0))
            "
            [test]="test > 2"
            [test2]="test | uppercase"
            (click)="test.length > 0 ? test($event) : null"
            (testEvent)="test1($event)" />
        `,
            });
        }));
        it('should migrate multiple cases of spacing', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verifyDeclaration({
                before: `<app-my-cmp1>   </app-my-cmp1>`,
                after: `<app-my-cmp1 />`,
            });
            yield verifyDeclaration({
                before: `
          <app-my-cmp1 test="hello">

          </app-my-cmp1>
        `,
                after: `<app-my-cmp1 test="hello" />`,
            });
            yield verifyDeclarationNoChange(`
         <app-my-cmp4
            test="hello"
          >
            123
          </app-my-cmp4>
      `);
            yield verifyDeclaration({
                before: `
          <app-my-cmp1 hello="world">
            <app-my-cmp1 hello="world">
            </app-my-cmp1>
          </app-my-cmp1>
        `,
                after: `
          <app-my-cmp1 hello="world">
            <app-my-cmp1 hello="world" />
          </app-my-cmp1>
        `,
            });
            yield verifyDeclaration({
                before: `
          <app-my-cmp10 test="hello"
            [test]="hello"
            (test)="hello()"
          >
          </app-my-cmp10>
        `,
                after: `
          <app-my-cmp10 test="hello"
            [test]="hello"
            (test)="hello()"
           />
        `,
            });
        }));
        it('should migrate the template with multiple nested elements', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verifyDeclaration({
                before: `
          <hello-world12>
            <hello-world13>
              <hello-world14 count="1" [test]="hello" (test)="test" ></hello-world14>
                <hello-world15>
                  <hello-world16  count="1" [test]="hello" (test)="test"  />
                  <hello-world17  count="1" [test]="hello" (test)="test" ></hello-world17>
                  <hello-world18
                   count="1" [test]="hello"
                    (test)="test"
                    >

                  </hello-world18>
                </hello-world15>
            </hello-world13>
          </hello-world12>
          `,
                after: `
          <hello-world12>
            <hello-world13>
              <hello-world14 count="1" [test]="hello" (test)="test"  />
                <hello-world15>
                  <hello-world16  count="1" [test]="hello" (test)="test"  />
                  <hello-world17 count="1" [test]="hello" (test)="test"  />
                  <hello-world18 count="1" [test]="hello"
                    (test)="test"
                     />
                </hello-world15>
            </hello-world13>
          </hello-world12>
          `,
            });
        }));
        it('should migrate multiple components in a file', () => __awaiter(void 0, void 0, void 0, function* () {
            yield verify({
                before: `
            import {Component} from '@angular/core';
            @Component({ template: '<my-cmp></my-cmp>' })
            export class Cmp1 {}

            @Component({ template: '<my-cmp></my-cmp><my-cmp></my-cmp>' })
            export class Cmp2 {}
          `,
                after: `
            import {Component} from '@angular/core';
            @Component({ template: '<my-cmp />' })
            export class Cmp1 {}

            @Component({ template: '<my-cmp /><my-cmp />' })
            export class Cmp2 {}
          `,
            });
        }));
        it('should migrate an external template file', () => __awaiter(void 0, void 0, void 0, function* () {
            const templateFileContent = `
        <app-my-cmp1>   </app-my-cmp1>
        <app-my-cmp1>

        </app-my-cmp1>

        <app-my-cmp1 hello="world">
          <app-my-cmp1 hello="world">
          </app-my-cmp1>
        </app-my-cmp1>
      `;
            const templateFileExpected = `
        <app-my-cmp1 />
        <app-my-cmp1 />

        <app-my-cmp1 hello="world">
          <app-my-cmp1 hello="world" />
        </app-my-cmp1>
      `;
            const tsFileContent = `
        import {Component} from '@angular/core';
        @Component({ templateUrl: 'app.component.html' })
        export class AppComponent {}
      `;
            const { fs } = yield (0, testing_2.runTsurgeMigration)(new self_closing_tags_migration_1.SelfClosingTagsMigration(), [
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                    isProgramRootFile: true,
                    contents: tsFileContent,
                },
                {
                    name: (0, compiler_cli_1.absoluteFrom)('/app.component.html'),
                    contents: templateFileContent,
                },
            ]);
            const componentTsFile = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts')).trim();
            const actualComponentHtmlFile = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.html')).trim();
            const expectedTemplate = templateFileExpected.trim();
            // no changes should be made to the component TS file
            expect(componentTsFile).toEqual(tsFileContent.trim());
            expect(actualComponentHtmlFile)
                .withContext((0, testing_2.diffText)(expectedTemplate, actualComponentHtmlFile))
                .toEqual(expectedTemplate);
        }));
    });
});
function verifyDeclaration(testCase) {
    return __awaiter(this, void 0, void 0, function* () {
        yield verify({
            before: populateDeclarationTestCase(testCase.before.trim()),
            after: populateExpectedResult(testCase.after.trim()),
        });
    });
}
function verifyDeclarationNoChange(beforeAndAfter) {
    return __awaiter(this, void 0, void 0, function* () {
        yield verifyDeclaration({ before: beforeAndAfter, after: beforeAndAfter });
    });
}
function verify(testCase) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fs } = yield (0, testing_2.runTsurgeMigration)(new self_closing_tags_migration_1.SelfClosingTagsMigration(), [
            {
                name: (0, compiler_cli_1.absoluteFrom)('/app.component.ts'),
                isProgramRootFile: true,
                contents: testCase.before,
            },
        ]);
        const actual = fs.readFile((0, compiler_cli_1.absoluteFrom)('/app.component.ts')).trim();
        const expected = testCase.after.trim();
        expect(actual).withContext((0, testing_2.diffText)(expected, actual)).toEqual(expected);
    });
}
function populateDeclarationTestCase(declaration) {
    return `
      import {Component} from '@angular/core';
      @Component({ template: \`${declaration}\` })
      export class AppComponent {}
  `;
}
function populateExpectedResult(declaration) {
    return `
      import {Component} from '@angular/core';
      @Component({ template: \`${declaration}\` })
      export class AppComponent {}
  `;
}
