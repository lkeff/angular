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
const inputFixture = `
  export interface InputSignal<T> {}

  export interface InputFunction {
    /** No explicit initial value */
    <T>(): InputSignal<T|undefined>;
    /** With explicit initial value */
    <T>(initialValue: T): InputSignal<T>;

    required: {
      /** Required, no options */
      <T>(): void;
      /** Required, with transform */
      <T, TransformT>(transformFn: (v: TransformT) => T): void;
    }
  }

  /**
   * This describes the overall initializer API
   * function.
   *
   * @initializerApiFunction
   */
  export const input: InputFunction = null!;
`;
const contentChildrenFixture = `\
  export interface Options<ReadT = void> {}

  /** Queries for children with "LocatorT". */
  export function contentChildren<LocatorT>(
      locator: LocatorT, opts?: Options): Signal<LocatorT>;
  /** Queries for children with "LocatorT" and "read" option. */
  export function contentChildren<LocatorT, ReadT>(
      locator: LocatorT, opts: Options<ReadT>): Signal<ReadT>;

  /**
  * Overall description of "contentChildren" API.
  *
  * @initializerApiFunction
  */
  export function contentChildren<LocatorT, ReadT>(
      locator: LocatorT, opts?: Options<ReadT>): Signal<ReadT> {
    return null;
  }
`;
const testFiles = (0, testing_2.loadStandardTestFiles)();
(0, testing_1.runInEachFileSystem)(() => {
    describe('ngtsc initializer API docs extraction', () => {
        let env;
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup(testFiles);
            env.tsconfig();
        });
        function test(input) {
            env.write('index.ts', input);
            return env
                .driveDocsExtraction('index.ts')
                .find((f) => f.entryType === entities_1.EntryType.InitializerApiFunction);
        }
        describe('interface-based', () => {
            it('should extract name', () => {
                var _a;
                expect((_a = test(inputFixture)) === null || _a === void 0 ? void 0 : _a.name).toBe('input');
            });
            it('should extract container description', () => {
                var _a;
                expect((_a = test(inputFixture)) === null || _a === void 0 ? void 0 : _a.description.replace(/\n/g, ' ')).toBe('This describes the overall initializer API function.');
            });
            it('should extract individual return types', () => {
                var _a, _b;
                expect((_a = test(inputFixture)) === null || _a === void 0 ? void 0 : _a.callFunction.signatures[0].returnType).toBe('InputSignal<T | undefined>');
                expect((_b = test(inputFixture)) === null || _b === void 0 ? void 0 : _b.callFunction.signatures[1].returnType).toBe('InputSignal<T>');
            });
            it('should extract container tags', () => {
                var _a;
                expect((_a = test(inputFixture)) === null || _a === void 0 ? void 0 : _a.jsdocTags).toEqual([
                    jasmine.objectContaining({ name: 'initializerApiFunction' }),
                ]);
            });
            it('should extract top-level call signatures', () => {
                var _a;
                expect((_a = test(inputFixture)) === null || _a === void 0 ? void 0 : _a.callFunction).toEqual({
                    name: 'input',
                    implementation: null,
                    signatures: [
                        jasmine.objectContaining({
                            generics: [{ name: 'T', constraint: undefined, default: undefined }],
                            returnType: 'InputSignal<T | undefined>',
                        }),
                        jasmine.objectContaining({
                            generics: [{ name: 'T', constraint: undefined, default: undefined }],
                            params: [jasmine.objectContaining({ name: 'initialValue', type: 'T' })],
                            returnType: 'InputSignal<T>',
                        }),
                    ],
                });
            });
            it('should extract sub-property call signatures', () => {
                var _a;
                expect((_a = test(inputFixture)) === null || _a === void 0 ? void 0 : _a.subFunctions).toEqual([
                    {
                        name: 'required',
                        implementation: null,
                        signatures: [
                            jasmine.objectContaining({
                                generics: [{ name: 'T', constraint: undefined, default: undefined }],
                                returnType: 'void',
                            }),
                            jasmine.objectContaining({
                                generics: [
                                    { name: 'T', constraint: undefined, default: undefined },
                                    { name: 'TransformT', constraint: undefined, default: undefined },
                                ],
                                params: [
                                    jasmine.objectContaining({
                                        name: 'transformFn',
                                        type: '(v: TransformT) => T',
                                    }),
                                ],
                                returnType: 'void',
                            }),
                        ],
                    },
                ]);
            });
        });
        describe('function-based', () => {
            it('should extract name', () => {
                var _a;
                expect((_a = test(contentChildrenFixture)) === null || _a === void 0 ? void 0 : _a.name).toBe('contentChildren');
            });
            it('should extract container description', () => {
                var _a;
                expect((_a = test(contentChildrenFixture)) === null || _a === void 0 ? void 0 : _a.description.replace(/\n/g, ' ')).toBe('Overall description of "contentChildren" API.');
            });
            it('should extract container tags', () => {
                var _a;
                expect((_a = test(contentChildrenFixture)) === null || _a === void 0 ? void 0 : _a.jsdocTags).toEqual([
                    jasmine.objectContaining({ name: 'initializerApiFunction' }),
                ]);
            });
            it('should extract top-level call signatures', () => {
                var _a;
                expect((_a = test(contentChildrenFixture)) === null || _a === void 0 ? void 0 : _a.callFunction).toEqual({
                    name: 'contentChildren',
                    implementation: jasmine.objectContaining({
                        name: 'contentChildren',
                        description: jasmine.stringContaining('Overall description of "contentChildren" API'),
                    }),
                    signatures: [
                        jasmine.objectContaining({
                            generics: [{ name: 'LocatorT', constraint: undefined, default: undefined }],
                            params: [
                                jasmine.objectContaining({ name: 'locator', type: 'LocatorT' }),
                                jasmine.objectContaining({
                                    name: 'opts',
                                    isOptional: true,
                                    type: 'Options<void> | undefined',
                                }),
                            ],
                            returnType: 'Signal<LocatorT>',
                        }),
                        jasmine.objectContaining({
                            generics: [
                                { name: 'LocatorT', constraint: undefined, default: undefined },
                                { name: 'ReadT', constraint: undefined, default: undefined },
                            ],
                            params: [
                                jasmine.objectContaining({ name: 'locator', type: 'LocatorT' }),
                                jasmine.objectContaining({
                                    name: 'opts',
                                    isOptional: false,
                                    type: 'Options<ReadT>',
                                }),
                            ],
                            returnType: 'Signal<ReadT>',
                        }),
                    ],
                });
            });
            it('should have an empty list of sub-properties', () => {
                var _a;
                // Function-based initializer APIs never have sub-properties.
                expect((_a = test(contentChildrenFixture)) === null || _a === void 0 ? void 0 : _a.subFunctions).toEqual([]);
            });
        });
    });
});
