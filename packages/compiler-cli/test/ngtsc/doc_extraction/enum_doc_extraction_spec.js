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
    describe('ngtsc enum docs extraction', () => {
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup(testFiles);
            env.tsconfig();
        });
        it('should extract enum info without explicit values', () => {
            env.write('index.ts', `
        export enum PizzaTopping {
          /** It is cheese */
          Cheese,

          /** Or "tomato" if you are British */
          Tomato,
        }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            expect(docs[0].entryType).toBe(entities_1.EntryType.Enum);
            const enumEntry = docs[0];
            expect(enumEntry.name).toBe('PizzaTopping');
            expect(enumEntry.members.length).toBe(2);
            const [cheeseEntry, tomatoEntry] = enumEntry.members;
            expect(cheeseEntry.name).toBe('Cheese');
            expect(cheeseEntry.description).toBe('It is cheese');
            expect(cheeseEntry.value).toBe('');
            expect(tomatoEntry.name).toBe('Tomato');
            expect(tomatoEntry.description).toBe('Or "tomato" if you are British');
            expect(tomatoEntry.value).toBe('');
        });
        it('should extract enum info with explicit values', () => {
            env.write('index.ts', `
        export enum PizzaTopping {
          /** It is cheese */
          Cheese = 0,

          /** Or "tomato" if you are British */
          Tomato = "tomato",
        }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            expect(docs[0].entryType).toBe(entities_1.EntryType.Enum);
            const enumEntry = docs[0];
            expect(enumEntry.name).toBe('PizzaTopping');
            expect(enumEntry.members.length).toBe(2);
            const [cheeseEntry, tomatoEntry] = enumEntry.members;
            expect(cheeseEntry.name).toBe('Cheese');
            expect(cheeseEntry.description).toBe('It is cheese');
            expect(cheeseEntry.value).toBe('0');
            expect(cheeseEntry.type).toBe('PizzaTopping.Cheese');
            expect(tomatoEntry.name).toBe('Tomato');
            expect(tomatoEntry.description).toBe('Or "tomato" if you are British');
            expect(tomatoEntry.value).toBe('"tomato"');
            expect(tomatoEntry.type).toBe('PizzaTopping.Tomato');
        });
    });
});
