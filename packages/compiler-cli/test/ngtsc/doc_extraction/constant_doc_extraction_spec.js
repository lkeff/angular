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
    describe('ngtsc constant docs extraction', () => {
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup(testFiles);
            env.tsconfig();
        });
        it('should extract constants', () => {
            env.write('index.ts', `
        export const VERSION = '16.0.0';
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            const constantEntry = docs[0];
            expect(constantEntry.name).toBe('VERSION');
            expect(constantEntry.entryType).toBe(entities_1.EntryType.Constant);
            expect(constantEntry.type).toBe('string');
        });
        it('should extract multiple constant declarations in a single statement', () => {
            env.write('index.ts', `
        export const PI = 3.14, VERSION = '16.0.0';
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(2);
            const [pi, version] = docs;
            expect(pi.name).toBe('PI');
            expect(pi.entryType).toBe(entities_1.EntryType.Constant);
            expect(pi.type).toBe('number');
            expect(version.name).toBe('VERSION');
            expect(version.entryType).toBe(entities_1.EntryType.Constant);
            expect(version.type).toBe('string');
        });
        it('should extract non-primitive constants', () => {
            env.write('index.ts', `
        import {InjectionToken} from '@angular/core';
        export const SOME_TOKEN = new InjectionToken('something');
        export const TYPED_TOKEN = new InjectionToken<string>();
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(2);
            const [someToken, typedToken] = docs;
            expect(someToken.name).toBe('SOME_TOKEN');
            expect(someToken.entryType).toBe(entities_1.EntryType.Constant);
            expect(someToken.type).toBe('InjectionToken<unknown>');
            expect(typedToken.name).toBe('TYPED_TOKEN');
            expect(typedToken.entryType).toBe(entities_1.EntryType.Constant);
            expect(typedToken.type).toBe('InjectionToken<string>');
        });
        it('should extract an object literal marked as an enum', () => {
            env.write('index.ts', `
        /**
         * Toppings for your pizza.
         * @object-literal-as-enum
         */
        export const PizzaTopping = {
          /** It is cheese */
          Cheese: 0,

          /** Or "tomato" if you are British */
          Tomato: "tomato",
        };
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            expect(docs[0].entryType).toBe(entities_1.EntryType.Enum);
            expect(docs[0].jsdocTags).toEqual([]);
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
        it('should extract an object literal cast to a const and marked as an enum', () => {
            env.write('index.ts', `
        /**
         * Toppings for your pizza.
         * @object-literal-as-enum
         */
        export const PizzaTopping = {
          /** It is cheese */
          Cheese: 0,

          /** Or "tomato" if you are British */
          Tomato: "tomato",
        } as const;
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            expect(docs[0].entryType).toBe(entities_1.EntryType.Enum);
            expect(docs[0].jsdocTags).toEqual([]);
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
