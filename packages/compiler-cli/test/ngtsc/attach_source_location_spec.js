"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("../../src/ngtsc/file_system/testing");
const testing_2 = require("../../src/ngtsc/testing");
const env_1 = require("./env");
const config_1 = require("@angular/compiler/src/render3/view/config");
const testFiles = (0, testing_2.loadStandardTestFiles)({ fakeCommon: true });
(0, testing_1.runInEachFileSystem)(() => {
    describe('source location instruction generation', () => {
        let env;
        beforeEach(() => {
            (0, config_1.setEnableTemplateSourceLocations)(true);
            env = env_1.NgtscTestEnvironment.setup(testFiles);
            env.tsconfig();
        });
        afterEach(() => {
            (0, config_1.setEnableTemplateSourceLocations)(false);
        });
        it('should attach the source location in an inline template', () => {
            env.write(`test.ts`, `
          import {Component} from '@angular/core';

          @Component({
            template: \`
              <div><span>
                <strong>Hello</strong>
              </span></div>
            \`,
          })
          class Comp {}
         `);
            env.driveMain();
            const content = env.getContents('test.js');
            expect(content).toContain('ɵɵelementStart(0, "div")(1, "span")(2, "strong");');
            expect(content).toContain('ɵɵattachSourceLocations("test.ts", [[0, 114, 5, 14], [1, 119, 5, 19], [2, 142, 6, 16]]);');
        });
        it('should attach the source location in an external template', () => {
            env.write('test.html', `
        <div><span>
          <strong>Hello</strong>
        </span></div>
      `);
            env.write(`test.ts`, `
          import {Component} from '@angular/core';

          @Component({templateUrl: './test.html'})
          class Comp {}
        `);
            env.driveMain();
            const content = env.getContents('test.js');
            expect(content).toContain('ɵɵelementStart(0, "div")(1, "span")(2, "strong");');
            expect(content).toContain('ɵɵattachSourceLocations("test.html", [[0, 9, 1, 8], [1, 14, 1, 13], [2, 31, 2, 10]]);');
        });
        it('should attach the source location to structural directives', () => {
            env.write(`test.ts`, `
          import {Component} from '@angular/core';
          import {CommonModule} from '@angular/common';

          @Component({
            imports: [CommonModule],
            template: \`
              <div *ngIf="true">
                <span></span>
              </div>
            \`,
          })
          class Comp {}
        `);
            env.driveMain();
            const content = env.getContents('test.js');
            expect(content).toContain('ɵɵtemplate(0,');
            expect(content).toContain('ɵɵelementStart(0, "div");');
            expect(content).toContain('ɵɵelement(1, "span");');
            expect(content).toContain('ɵɵattachSourceLocations("test.ts", [[0, 207, 7, 14], [1, 242, 8, 16]]);');
        });
        it('should not attach the source location to ng-container', () => {
            env.write(`test.ts`, `
          import {Component} from '@angular/core';

          @Component({
            template: \`
              <ng-container>
                <div>
                  <ng-container>
                    <span></span>
                  </ng-container>
                </div>
              </ng-container>
            \`,
          })
          class Comp {}
        `);
            env.driveMain();
            const content = env.getContents('test.js');
            expect(content).toContain('ɵɵelementContainerStart(0);');
            expect(content).toContain('ɵɵelementStart(1, "div");');
            expect(content).toContain('ɵɵelementContainerStart(2);');
            expect(content).toContain('ɵɵelement(3, "span");');
            expect(content).toContain('ɵɵattachSourceLocations("test.ts", [[1, 145, 6, 16], [3, 204, 8, 20]]);');
        });
    });
});
