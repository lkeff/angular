"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const diagnostics_1 = require("../../../diagnostics");
const file_system_1 = require("../../../file_system");
const testing_1 = require("../../../file_system/testing");
const imports_1 = require("../../../imports");
const reflection_1 = require("../../../reflection");
const typescript_2 = require("../../../reflection/src/typescript");
const testing_2 = require("../../../testing");
const initializer_function_access_1 = require("../src/initializer_function_access");
const initializer_functions_1 = require("../src/initializer_functions");
(0, testing_1.runInEachFileSystem)(() => {
    const modelApi = {
        functionName: 'model',
        owningModule: '@angular/core',
        allowedAccessLevels: [reflection_1.ClassMemberAccessLevel.PublicWritable],
    };
    describe('initializer function detection', () => {
        it('should identify a non-required function that is imported directly', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model} from '@angular/core';

        @Directive()
        export class Dir {
          test = model(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toEqual({
                api: modelApi,
                isRequired: false,
                call: jasmine.objectContaining({ kind: typescript_1.default.SyntaxKind.CallExpression }),
            });
        });
        it('should check for multiple initializer APIs', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model} from '@angular/core';

        @Directive()
        export class Dir {
          test = model(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([
                {
                    functionName: 'input',
                    owningModule: '@angular/core',
                    allowedAccessLevels: [reflection_1.ClassMemberAccessLevel.PublicWritable],
                },
                modelApi,
            ], member.value, reflector, importTracker);
            expect(result).toEqual({
                api: modelApi,
                isRequired: false,
                call: jasmine.objectContaining({ kind: typescript_1.default.SyntaxKind.CallExpression }),
            });
        });
        it('should support initializer APIs from different modules', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive} from '@angular/core';
        import {outputFromObservable} from '@angular/core/rxjs-interop';

        @Directive()
        export class Dir {
          test = outputFromObservable(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([
                modelApi,
                {
                    functionName: 'outputFromObservable',
                    owningModule: '@angular/core/rxjs-interop',
                    allowedAccessLevels: [reflection_1.ClassMemberAccessLevel.PublicWritable],
                },
            ], member.value, reflector, importTracker);
            expect(result).toEqual({
                api: {
                    functionName: 'outputFromObservable',
                    owningModule: '@angular/core/rxjs-interop',
                    allowedAccessLevels: [reflection_1.ClassMemberAccessLevel.PublicWritable],
                },
                isRequired: false,
                call: jasmine.objectContaining({ kind: typescript_1.default.SyntaxKind.CallExpression }),
            });
        });
        it('should identify a required function that is imported directly', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model} from '@angular/core';

        @Directive()
        export class Dir {
          test = model.required();
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toEqual({
                api: modelApi,
                isRequired: true,
                call: jasmine.objectContaining({ kind: typescript_1.default.SyntaxKind.CallExpression }),
            });
        });
        it('should identify a non-required function that is aliased', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model as alias} from '@angular/core';

        @Directive()
        export class Dir {
          test = alias(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toEqual({
                api: modelApi,
                isRequired: false,
                call: jasmine.objectContaining({ kind: typescript_1.default.SyntaxKind.CallExpression }),
            });
        });
        it('should identify a required function that is aliased', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model as alias} from '@angular/core';

        @Directive()
        export class Dir {
          test = alias.required();
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toEqual({
                api: modelApi,
                isRequired: true,
                call: jasmine.objectContaining({ kind: typescript_1.default.SyntaxKind.CallExpression }),
            });
        });
        it('should identify a non-required function that is imported via namespace import', () => {
            const { member, reflector, importTracker } = setup(`
        import * as core from '@angular/core';

        @core.Directive()
        export class Dir {
          test = core.model(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toEqual({
                api: modelApi,
                isRequired: false,
                call: jasmine.objectContaining({ kind: typescript_1.default.SyntaxKind.CallExpression }),
            });
        });
        it('should identify a required function that is imported via namespace import', () => {
            const { member, reflector, importTracker } = setup(`
        import * as core from '@angular/core';

        @core.Directive()
        export class Dir {
          test = core.model.required();
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toEqual({
                api: modelApi,
                isRequired: true,
                call: jasmine.objectContaining({ kind: typescript_1.default.SyntaxKind.CallExpression }),
            });
        });
        it('should not identify a valid core function that is not being checked for', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, input} from '@angular/core';

        @Directive()
        export class Dir {
          test = input(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toBe(null);
        });
        it('should not identify a function coming from a different module', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive} from '@angular/core';
        import {model} from '@not-angular/core';

        @Directive()
        export class Dir {
          test = model(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toBe(null);
        });
        it('should not identify an invalid call on a core function', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model} from '@angular/core';

        @Directive()
        export class Dir {
          test = model.unknown();
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toBe(null);
        });
        it('should not identify an invalid call on a core function through a namespace import', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive} from '@angular/core';
        import * as core from '@angular/core';

        @Directive()
        export class Dir {
          test = core.model.unknown();
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toBe(null);
        });
        it('should identify shadowed declarations', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model} from '@angular/core';

        function wrapper() {
          function model(value: number): any {}

          @Directive()
          class Dir {
            test = model(1);
          }
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).toBe(null);
        });
    });
    it('should identify an initializer function in a file containing an import whose name overlaps with an object prototype member', () => {
        const { member, reflector, importTracker } = setup(`
          import {Directive, model} from '@angular/core';
          import {toString} from '@unknown/utils';

          @Directive()
          export class Dir {
            test = model(1);
          }
        `);
        const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
        expect(result).toEqual({
            api: modelApi,
            isRequired: false,
            call: jasmine.objectContaining({ kind: typescript_1.default.SyntaxKind.CallExpression }),
        });
    });
    describe('`validateAccessOfInitializerApiMember`', () => {
        it('should report errors if a private field is used, but not allowed', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model} from '@angular/core';

        @Directive()
        class Dir {
          private test = model(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).not.toBeNull();
            expect(() => (0, initializer_function_access_1.validateAccessOfInitializerApiMember)(result, member)).toThrowMatching((err) => err instanceof diagnostics_1.FatalDiagnosticError &&
                err.code === diagnostics_1.ErrorCode.INITIALIZER_API_DISALLOWED_MEMBER_VISIBILITY);
        });
        it('should report errors if a protected field is used, but not allowed', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model} from '@angular/core';

        @Directive()
        class Dir {
          protected test = model(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).not.toBeNull();
            expect(() => (0, initializer_function_access_1.validateAccessOfInitializerApiMember)(result, member)).toThrowMatching((err) => err instanceof diagnostics_1.FatalDiagnosticError &&
                err.code === diagnostics_1.ErrorCode.INITIALIZER_API_DISALLOWED_MEMBER_VISIBILITY);
        });
        it('should report errors if an ECMAScript private field is used, but not allowed', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model} from '@angular/core';

        @Directive()
        class Dir {
          #test = model(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).not.toBeNull();
            expect(() => (0, initializer_function_access_1.validateAccessOfInitializerApiMember)(result, member)).toThrowMatching((err) => err instanceof diagnostics_1.FatalDiagnosticError &&
                err.code === diagnostics_1.ErrorCode.INITIALIZER_API_DISALLOWED_MEMBER_VISIBILITY);
        });
        it('should report errors if a readonly public field is used, but not allowed', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model} from '@angular/core';

        @Directive()
        class Dir {
          // test model initializer API definition doesn't even allow readonly!
          readonly test = model(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([modelApi], member.value, reflector, importTracker);
            expect(result).not.toBeNull();
            expect(() => (0, initializer_function_access_1.validateAccessOfInitializerApiMember)(result, member)).toThrowMatching((err) => err instanceof diagnostics_1.FatalDiagnosticError &&
                err.code === diagnostics_1.ErrorCode.INITIALIZER_API_DISALLOWED_MEMBER_VISIBILITY);
        });
        it('should allow private field if API explicitly allows it', () => {
            const { member, reflector, importTracker } = setup(`
        import {Directive, model} from '@angular/core';

        @Directive()
        class Dir {
          // test model initializer API definition doesn't even allow readonly!
          private test = model(1);
        }
      `);
            const result = (0, initializer_functions_1.tryParseInitializerApi)([Object.assign(Object.assign({}, modelApi), { allowedAccessLevels: [reflection_1.ClassMemberAccessLevel.Private] })], member.value, reflector, importTracker);
            expect(result === null || result === void 0 ? void 0 : result.api).toEqual(jasmine.objectContaining({
                functionName: 'model',
            }));
            expect(() => (0, initializer_function_access_1.validateAccessOfInitializerApiMember)(result, member)).not.toThrow();
        });
    });
});
function setup(contents) {
    const fileName = (0, file_system_1.absoluteFrom)('/test.ts');
    const { program } = (0, testing_2.makeProgram)([
        {
            name: (0, file_system_1.absoluteFrom)('/node_modules/@angular/core/index.d.ts'),
            contents: `
        export const Directive: any;
        export const input: any;
        export const model: any;
      `,
        },
        {
            name: (0, file_system_1.absoluteFrom)('/node_modules/@angular/core/rxjs-interop/index.d.ts'),
            contents: `
        export const outputFromObservable: any;
      `,
        },
        {
            name: (0, file_system_1.absoluteFrom)('/node_modules/@unknown/utils/index.d.ts'),
            contents: `
        export declare function toString(value: any): string;
      `,
        },
        {
            name: (0, file_system_1.absoluteFrom)('/node_modules/@not-angular/core/index.d.ts'),
            contents: `
        export const model: any;
      `,
        },
        { name: fileName, contents },
    ], { target: typescript_1.default.ScriptTarget.ESNext });
    const sourceFile = program.getSourceFile(fileName);
    const importTracker = new imports_1.ImportedSymbolsTracker();
    const reflector = new reflection_1.TypeScriptReflectionHost(program.getTypeChecker());
    if (sourceFile === undefined) {
        throw new Error(`Cannot resolve test file ${fileName}`);
    }
    let member = null;
    (function walk(node) {
        if (typescript_1.default.isPropertyDeclaration(node) &&
            ((typescript_1.default.isIdentifier(node.name) && node.name.text === 'test') ||
                (typescript_1.default.isPrivateIdentifier(node.name) && node.name.text === '#test'))) {
            member = (0, typescript_2.reflectClassMember)(node);
        }
        else {
            typescript_1.default.forEachChild(node, walk);
        }
    })(sourceFile);
    if (member === null) {
        throw new Error(`Could not resolve a class property with a name of "test" in the test file`);
    }
    return { member, reflector, importTracker };
}
