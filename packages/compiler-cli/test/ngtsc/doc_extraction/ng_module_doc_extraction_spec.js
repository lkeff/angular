"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../../../src/ngtsc/docs/src/entities");
const testing_1 = require("../../../src/ngtsc/file_system/testing");
const testing_2 = require("../../../src/ngtsc/testing");
const env_1 = require("../env");
const testFiles = (0, testing_2.loadStandardTestFiles)({ fakeCommon: true });
(0, testing_1.runInEachFileSystem)(() => {
    let env;
    describe('ngtsc NgModule docs extraction', () => {
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup(testFiles);
            env.tsconfig();
        });
        it('should extract NgModule info', () => {
            env.write('index.ts', `
        import {Directive, NgModule} from '@angular/core';

        @Directive({selector: 'some-tag'})
        export class SomeDirective { }

        @NgModule({declarations: [SomeDirective]})
        export class SomeNgModule { }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(2);
            expect(docs[1].entryType).toBe(entities_1.EntryType.NgModule);
            const ngModuleEntry = docs[1];
            expect(ngModuleEntry.name).toBe('SomeNgModule');
        });
    });
});
