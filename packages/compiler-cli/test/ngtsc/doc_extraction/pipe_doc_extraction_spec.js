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
    describe('ngtsc pipe docs extraction', () => {
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup(testFiles);
            env.tsconfig();
        });
        it('should extract standalone pipe info', () => {
            env.write('index.ts', `
        import {Pipe} from '@angular/core';
        @Pipe({
          standalone: true,
          name: 'shorten',
        })
        export class ShortenPipe {
          transform(value: string): string { return ''; }
        }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            expect(docs[0].entryType).toBe(entities_1.EntryType.Pipe);
            const directiveEntry = docs[0];
            expect(directiveEntry.isStandalone).toBe(true);
            expect(directiveEntry.name).toBe('ShortenPipe');
            expect(directiveEntry.pipeName).toBe('shorten');
        });
        it('should extract NgModule pipe info', () => {
            env.write('index.ts', `
        import {Pipe, NgModule} from '@angular/core';
        @Pipe({
          name: 'shorten',
          standalone: false, 
        })
        export class ShortenPipe {
          transform(value: string): string { return ''; }
        }

        @NgModule({declarations: [ShortenPipe]})
        export class PipeModule { }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(2);
            expect(docs[0].entryType).toBe(entities_1.EntryType.Pipe);
            const directiveEntry = docs[0];
            expect(directiveEntry.isStandalone).toBe(false);
            expect(directiveEntry.name).toBe('ShortenPipe');
            expect(directiveEntry.pipeName).toBe('shorten');
        });
    });
});
