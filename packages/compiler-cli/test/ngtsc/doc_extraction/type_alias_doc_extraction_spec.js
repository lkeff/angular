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
    describe('ngtsc type alias docs extraction', () => {
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup(testFiles);
            env.tsconfig();
        });
        it('should extract type aliases based on primitives', () => {
            env.write('index.ts', `
        export type SuperNumber = number | string;
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            const typeAliasEntry = docs[0];
            expect(typeAliasEntry.name).toBe('SuperNumber');
            expect(typeAliasEntry.entryType).toBe(entities_1.EntryType.TypeAlias);
            expect(typeAliasEntry.type).toBe('number | string');
        });
        it('should extract type aliases for objects', () => {
            env.write('index.ts', `
        export type UserProfile = {
          name: string;
          age: number;
        };
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            const typeAliasEntry = docs[0];
            expect(typeAliasEntry.name).toBe('UserProfile');
            expect(typeAliasEntry.entryType).toBe(entities_1.EntryType.TypeAlias);
            expect(typeAliasEntry.type).toBe(`{
          name: string;
          age: number;
        }`);
        });
        it('should extract type aliases based with generics', () => {
            env.write('index.ts', `
          type Foo<T> = undefined;
          export type Bar<T extends string> = Foo<T>;
        `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            const typeAliasEntry = docs[0];
            expect(typeAliasEntry.name).toBe('Bar');
            expect(typeAliasEntry.entryType).toBe(entities_1.EntryType.TypeAlias);
            expect(typeAliasEntry.type).toBe('Foo<T>');
            expect(typeAliasEntry.generics).toEqual([
                { name: 'T', constraint: 'string', default: undefined },
            ]);
        });
    });
});
