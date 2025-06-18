"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const imports_1 = require("../../imports");
const reflection_1 = require("../../reflection");
const testing_2 = require("../../testing");
const type_check_file_1 = require("../src/type_check_file");
const type_parameter_emitter_1 = require("../src/type_parameter_emitter");
const testing_3 = require("../testing");
(0, testing_1.runInEachFileSystem)(() => {
    describe('type parameter emitter', () => {
        function createEmitter(source, additionalFiles = []) {
            const files = [
                ...(0, testing_3.angularCoreDtsFiles)(),
                { name: (0, file_system_1.absoluteFrom)('/app/main.ts'), contents: source },
                ...additionalFiles,
            ];
            const { program, host } = (0, testing_2.makeProgram)(files, undefined, undefined, false);
            const checker = program.getTypeChecker();
            const reflector = new reflection_1.TypeScriptReflectionHost(checker);
            const TestClass = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/app/main.ts'), 'TestClass', reflection_1.isNamedClassDeclaration);
            const moduleResolver = new imports_1.ModuleResolver(program, program.getCompilerOptions(), host, 
            /* moduleResolutionCache */ null);
            const refEmitter = new imports_1.ReferenceEmitter([
                new imports_1.LocalIdentifierStrategy(),
                new imports_1.AbsoluteModuleStrategy(program, checker, moduleResolver, reflector),
                new imports_1.LogicalProjectStrategy(reflector, new file_system_1.LogicalFileSystem([(0, file_system_1.absoluteFrom)('/app')], host)),
            ]);
            const env = new type_check_file_1.TypeCheckFile((0, file_system_1.absoluteFrom)('/app/main.ngtypecheck.ts'), testing_3.ALL_ENABLED_CONFIG, refEmitter, reflector, host);
            const emitter = new type_parameter_emitter_1.TypeParameterEmitter(TestClass.typeParameters, reflector);
            return { emitter, env };
        }
        function emit({ emitter, env }, flags) {
            const canEmit = emitter.canEmit((ref) => env.canReferenceType(ref, flags));
            let emitted;
            try {
                emitted = emitter.emit((ref) => env.referenceType(ref, flags));
                expect(canEmit).toBe(true);
            }
            catch (e) {
                expect(canEmit).toBe(false);
                throw e;
            }
            if (emitted === undefined) {
                return '';
            }
            const printer = typescript_1.default.createPrinter({ newLine: typescript_1.default.NewLineKind.LineFeed });
            const sf = typescript_1.default.createSourceFile('test.ts', '', typescript_1.default.ScriptTarget.Latest);
            const generics = emitted
                .map((param) => printer.printNode(typescript_1.default.EmitHint.Unspecified, param, sf))
                .join(', ');
            return `<${generics}>`;
        }
        it('can emit for simple generic types', () => {
            expect(emit(createEmitter(`export class TestClass {}`))).toEqual('');
            expect(emit(createEmitter(`export class TestClass<T> {}`))).toEqual('<T>');
            expect(emit(createEmitter(`export class TestClass<T extends any> {}`))).toEqual('<T extends any>');
            expect(emit(createEmitter(`export class TestClass<T extends unknown> {}`))).toEqual('<T extends unknown>');
            expect(emit(createEmitter(`export class TestClass<T extends string> {}`))).toEqual('<T extends string>');
            expect(emit(createEmitter(`export class TestClass<T extends number> {}`))).toEqual('<T extends number>');
            expect(emit(createEmitter(`export class TestClass<T extends boolean> {}`))).toEqual('<T extends boolean>');
            expect(emit(createEmitter(`export class TestClass<T extends object> {}`))).toEqual('<T extends object>');
            expect(emit(createEmitter(`export class TestClass<T extends null> {}`))).toEqual('<T extends null>');
            expect(emit(createEmitter(`export class TestClass<T extends undefined> {}`))).toEqual('<T extends undefined>');
            expect(emit(createEmitter(`export class TestClass<T extends string[]> {}`))).toEqual('<T extends string[]>');
            expect(emit(createEmitter(`export class TestClass<T extends [string, boolean]> {}`))).toEqual('<T extends [\n    string,\n    boolean\n]>');
            expect(emit(createEmitter(`export class TestClass<T extends string | boolean> {}`))).toEqual('<T extends string | boolean>');
            expect(emit(createEmitter(`export class TestClass<T extends string & boolean> {}`))).toEqual('<T extends string & boolean>');
            expect(emit(createEmitter(`export class TestClass<T extends { [key: string]: boolean }> {}`))).toEqual('<T extends {\n    [key: string]: boolean;\n}>');
        });
        it('can emit literal types', () => {
            expect(emit(createEmitter(`export class TestClass<T extends 'a"a'> {}`))).toEqual(`<T extends "a\\"a">`);
            expect(emit(createEmitter(`export class TestClass<T extends "b\\\"b"> {}`))).toEqual(`<T extends "b\\"b">`);
            expect(emit(createEmitter(`export class TestClass<T extends \`c\\\`c\`> {}`))).toEqual(`<T extends \`c\\\`c\`>`);
            expect(emit(createEmitter(`export class TestClass<T extends -1> {}`))).toEqual(`<T extends -1>`);
            expect(emit(createEmitter(`export class TestClass<T extends 1> {}`))).toEqual(`<T extends 1>`);
            expect(emit(createEmitter(`export class TestClass<T extends 1n> {}`))).toEqual(`<T extends 1n>`);
        });
        it('cannot emit import types', () => {
            const emitter = createEmitter(`export class TestClass<T extends import('module')> {}`);
            expect(() => emit(emitter)).toThrowError('Unable to emit import type');
        });
        it('can emit references into external modules', () => {
            const emitter = createEmitter(`
          import {NgIterable} from '@angular/core';

          export class TestClass<T extends NgIterable<any>> {}`);
            expect(emit(emitter)).toEqual('<T extends i0.NgIterable<any>>');
        });
        it('can emit references into external modules using qualified name', () => {
            const emitter = createEmitter(`
          import * as ng from '@angular/core';

          export class TestClass<T extends ng.NgIterable<any>> {}`);
            expect(emit(emitter)).toEqual('<T extends i0.NgIterable<any>>');
        });
        it('can emit references to other type parameters', () => {
            const emitter = createEmitter(`
          import {NgIterable} from '@angular/core';

          export class TestClass<T, U extends NgIterable<T>> {}`);
            expect(emit(emitter)).toEqual('<T, U extends i0.NgIterable<T>>');
        });
        it('can emit references to local, exported declarations', () => {
            const emitter = createEmitter(`
          class Local {};
          export {Local};
          export class TestClass<T extends Local> {}`);
            expect(emit(emitter)).toEqual('<T extends i0.Local>');
        });
        it('cannot emit references to non-exported local declarations', () => {
            const emitter = createEmitter(`
          class Local {};
          export class TestClass<T extends Local> {}`);
            expect(() => emit(emitter)).toThrow();
        });
        it('cannot emit references to local declarations as nested type arguments', () => {
            const emitter = createEmitter(`
          import {NgIterable} from '@angular/core';

          class Local {};
          export class TestClass<T extends NgIterable<Local>> {}`);
            expect(() => emit(emitter)).toThrow();
        });
        it('can emit references into external modules within array types', () => {
            const emitter = createEmitter(`
          import {NgIterable} from '@angular/core';

          export class TestClass<T extends NgIterable[]> {}`);
            expect(emit(emitter)).toEqual('<T extends i0.NgIterable[]>');
        });
        it('cannot emit references to local declarations within array types', () => {
            const emitter = createEmitter(`
          class Local {};
          export class TestClass<T extends Local[]> {}`);
            expect(() => emit(emitter)).toThrow();
        });
        it('can emit references into relative files', () => {
            const additionalFiles = [
                {
                    name: (0, file_system_1.absoluteFrom)('/app/internal.ts'),
                    contents: `export class Internal {}`,
                },
            ];
            const emitter = createEmitter(`
          import {Internal} from './internal';

          export class TestClass<T extends Internal> {}`, additionalFiles);
            expect(emit(emitter)).toEqual('<T extends i0.Internal>');
        });
        it('cannot emit references into relative source files that are outside of rootDirs', () => {
            const additionalFiles = [
                {
                    name: (0, file_system_1.absoluteFrom)('/internal.ts'),
                    contents: `export class Internal {}`,
                },
            ];
            const emitter = createEmitter(`
          import {Internal} from '../internal';

          export class TestClass<T extends Internal> {}`, additionalFiles);
            // The `internal.ts` source file is outside `rootDir` and importing from it would trigger
            // TS6059, so this emit should fail.
            expect(() => emit(emitter)).toThrow();
        });
        it('can emit references into relative declaration files that are outside of rootDirs', () => {
            const additionalFiles = [
                {
                    name: (0, file_system_1.absoluteFrom)('/internal.d.ts'),
                    contents: `export class Internal {}`,
                },
            ];
            const emitter = createEmitter(`
          import {Internal} from '../internal';

          export class TestClass<T extends Internal> {}`, additionalFiles);
            // The `internal.d.ts` is outside `rootDir` but declaration files do not trigger TS6059, so we
            // allow such an import to be created.
            expect(emit(emitter)).toEqual('<T extends i0.Internal>');
        });
        it('cannot emit unresolved references', () => {
            const emitter = createEmitter(`
          import {Internal} from 'unresolved';

          export class TestClass<T extends Internal> {}`);
            expect(() => emit(emitter)).toThrow();
        });
        it('can emit references to exported classes imported using a namespace import', () => {
            const additionalFiles = [
                {
                    name: (0, file_system_1.absoluteFrom)('/app/internal.ts'),
                    contents: `export class Internal {}`,
                },
            ];
            const emitter = createEmitter(`
        import * as ns from './internal';

        export class TestClass<T extends ns.Internal> {}`, additionalFiles);
            expect(emit(emitter)).toEqual('<T extends i0.Internal>');
        });
        it('cannot emit references to local classes exported within a namespace', () => {
            const additionalFiles = [
                {
                    name: (0, file_system_1.absoluteFrom)('/app/ns.ts'),
                    contents: `
          export namespace ns {
            export class Nested {}
          }
        `,
                },
            ];
            const emitter = createEmitter(`
          import {ns} from './ns';

          export class TestClass<T extends ns.Nested> {}`, additionalFiles);
            expect(() => emit(emitter)).toThrow();
        });
        it('cannot emit references to external classes exported within a namespace', () => {
            const additionalFiles = [
                {
                    name: (0, file_system_1.absoluteFrom)('/node_modules/ns/index.d.ts'),
                    contents: `
          export namespace ns {
            export declare class Nested {}
          }
        `,
                },
            ];
            const emitter = createEmitter(`
          import {ns} from 'ns';

          export class TestClass<T extends ns.Nested> {}`, additionalFiles);
            expect(() => emit(emitter)).toThrow();
        });
        it('can emit references to interfaces', () => {
            const additionalFiles = [
                {
                    name: (0, file_system_1.absoluteFrom)('/node_modules/types/index.d.ts'),
                    contents: `export declare interface MyInterface {}`,
                },
            ];
            const emitter = createEmitter(`
          import {MyInterface} from 'types';

          export class TestClass<T extends MyInterface> {}`, additionalFiles);
            expect(emit(emitter)).toEqual('<T extends i0.MyInterface>');
        });
        it('can emit references to enums', () => {
            const additionalFiles = [
                {
                    name: (0, file_system_1.absoluteFrom)('/node_modules/types/index.d.ts'),
                    contents: `export declare enum MyEnum {}`,
                },
            ];
            const emitter = createEmitter(`
          import {MyEnum} from 'types';

          export class TestClass<T extends MyEnum> {}`, additionalFiles);
            expect(emit(emitter)).toEqual('<T extends i0.MyEnum>');
        });
        it('can emit references to type aliases', () => {
            const additionalFiles = [
                {
                    name: (0, file_system_1.absoluteFrom)('/node_modules/types/index.d.ts'),
                    contents: `export declare type MyType = string;`,
                },
            ];
            const emitter = createEmitter(`
          import {MyType} from 'types';

          export class TestClass<T extends MyType> {}`, additionalFiles);
            expect(emit(emitter)).toEqual('<T extends i0.MyType>');
        });
        it('transforms generic type parameter defaults', () => {
            const additionalFiles = [
                {
                    name: (0, file_system_1.absoluteFrom)('/node_modules/types/index.d.ts'),
                    contents: `export declare type MyType = string;`,
                },
            ];
            const emitter = createEmitter(`
          import {MyType} from 'types';

          export class TestClass<T extends MyType = MyType> {}`, additionalFiles);
            expect(emit(emitter)).toEqual('<T extends i0.MyType = i0.MyType>');
        });
        it('cannot emit when a type parameter default cannot be emitted', () => {
            const emitter = createEmitter(`
          interface Local {}

          export class TestClass<T extends object = Local> {}`);
            expect(() => emit(emitter)).toThrow();
        });
        it('can opt into emitting references to ambient types', () => {
            const emitter = createEmitter(`export class TestClass<T extends HTMLElement> {}`, [
                (0, testing_3.typescriptLibDts)(),
            ]);
            expect(emit(emitter, imports_1.ImportFlags.AllowAmbientReferences)).toBe('<T extends HTMLElement>');
        });
    });
});
