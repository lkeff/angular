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
    describe('ngtsc re-export docs extraction', () => {
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup(testFiles);
            env.tsconfig();
        });
        it('should extract info from a named re-export', () => {
            env.write('index.ts', `
        export {PI} from './implementation';
      `);
            env.write('implementation.ts', `
        export const PI = 3.14;
        export const TAO = 6.28;
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            expect(docs[0].entryType).toBe(entities_1.EntryType.Constant);
            expect(docs[0].name).toBe('PI');
        });
        it('should extract info from an aggregate re-export', () => {
            env.write('index.ts', `
        export * from './implementation';
      `);
            env.write('implementation.ts', `
        export const PI = 3.14;
        export const TAO = 6.28;
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(2);
            const [piEntry, taoEntry] = docs;
            expect(piEntry.entryType).toBe(entities_1.EntryType.Constant);
            expect(piEntry.name).toBe('PI');
            expect(taoEntry.entryType).toBe(entities_1.EntryType.Constant);
            expect(taoEntry.name).toBe('TAO');
        });
        it('should extract info from a transitive re-export', () => {
            env.write('index.ts', `
        export * from './middle';
      `);
            env.write('middle.ts', `
        export * from 'implementation';
      `);
            env.write('implementation.ts', `
        export const PI = 3.14;
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            expect(docs[0].entryType).toBe(entities_1.EntryType.Constant);
            expect(docs[0].name).toBe('PI');
        });
        it('should extract info from an aliased re-export', () => {
            env.write('index.ts', `
        export * from './implementation';
      `);
            env.write('implementation.ts', `
        const PI = 3.14;

        export {PI as PI_CONSTANT};
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            expect(docs[0].entryType).toBe(entities_1.EntryType.Constant);
            expect(docs[0].name).toBe('PI_CONSTANT');
        });
    });
});
