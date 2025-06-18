"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("../../../src/ngtsc/file_system/testing");
const env_1 = require("../env");
(0, testing_1.runInEachFileSystem)(() => {
    describe('ngtsc docs: @docsPrivate tag', () => {
        let env;
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup({});
            env.tsconfig();
        });
        function test(input) {
            env.write('index.ts', input);
            return env.driveDocsExtraction('index.ts');
        }
        it('should omit constant annotated with `@docsPrivate`', () => {
            expect(test(`
        /** @docsPrivate <reason> */
        export const bla = true;
      `)).toEqual([]);
        });
        it('should omit class annotated with `@docsPrivate`', () => {
            expect(test(`
        /** @docsPrivate <reason> */
        export class Bla {}
      `)).toEqual([]);
        });
        it('should omit function annotated with `@docsPrivate`', () => {
            expect(test(`
        /** @docsPrivate <reason> */
        export function bla() {};
      `)).toEqual([]);
        });
        it('should omit interface annotated with `@docsPrivate`', () => {
            expect(test(`
        /** @docsPrivate <reason> */
        export interface BlaFunction {}
      `)).toEqual([]);
        });
        it('should error if marked as private without reasoning', () => {
            expect(() => test(`
        /** @docsPrivate */
        export interface BlaFunction {}
      `)).toThrowError(/Entry "BlaFunction" is marked as "@docsPrivate" but without reasoning./);
        });
    });
});
