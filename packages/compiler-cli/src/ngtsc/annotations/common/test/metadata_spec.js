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
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../../file_system");
const testing_1 = require("../../../file_system/testing");
const reflection_1 = require("../../../reflection");
const testing_2 = require("../../../testing");
const translator_1 = require("../../../translator");
const metadata_1 = require("../src/metadata");
(0, testing_1.runInEachFileSystem)(() => {
    describe('ngtsc setClassMetadata converter', () => {
        it('should convert decorated class metadata', () => {
            const res = compileAndPrint(`
    import {Component} from '@angular/core';

    @Component('metadata') class Target {}
    `);
            expect(res).toEqual(`(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Target, [{ type: Component, args: ['metadata'] }], null, null); })();`);
        });
        it('should convert namespaced decorated class metadata', () => {
            const res = compileAndPrint(`
    import * as core from '@angular/core';

    @core.Component('metadata') class Target {}
    `);
            expect(res).toEqual(`(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Target, [{ type: core.Component, args: ['metadata'] }], null, null); })();`);
        });
        it('should convert decorated class constructor parameter metadata', () => {
            const res = compileAndPrint(`
    import {Component, Inject, Injector} from '@angular/core';
    const FOO = 'foo';

    @Component('metadata') class Target {
      constructor(@Inject(FOO) foo: any, bar: Injector) {}
    }
    `);
            expect(res).toContain(`() => [{ type: undefined, decorators: [{ type: Inject, args: [FOO] }] }, { type: i0.Injector }], null);`);
        });
        it('should convert decorated field metadata', () => {
            const res = compileAndPrint(`
    import {Component, Input} from '@angular/core';

    @Component('metadata') class Target {
      @Input() foo: string;

      @Input('value') bar: string;

      notDecorated: string;
    }
    `);
            expect(res).toContain(`{ foo: [{ type: Input }], bar: [{ type: Input, args: ['value'] }] })`);
        });
        it('should convert decorated field getter/setter metadata', () => {
            const res = compileAndPrint(`
    import {Component, Input} from '@angular/core';

    @Component('metadata') class Target {
      @Input() get foo() { return this._foo; }
      set foo(value: string) { this._foo = value; }
      private _foo: string;

      get bar() { return this._bar; }
      @Input('value') set bar(value: string) { this._bar = value; }
      private _bar: string;
    }
    `);
            expect(res).toContain(`{ foo: [{ type: Input }], bar: [{ type: Input, args: ['value'] }] })`);
        });
        it('should not convert non-angular decorators to metadata', () => {
            const res = compileAndPrint(`
    declare function NotAComponent(...args: any[]): any;

    @NotAComponent('metadata') class Target {}
    `);
            expect(res).toBe('');
        });
        it('should preserve quotes around class member names', () => {
            const res = compileAndPrint(`
        import {Component, Input} from '@angular/core';

        @Component('metadata') class Target {
          @Input() 'has-dashes-in-name' = 123;
          @Input() noDashesInName = 456;
        }
      `);
            expect(res).toContain(`{ 'has-dashes-in-name': [{ type: Input }], noDashesInName: [{ type: Input }] })`);
        });
    });
    function compileAndPrint(contents) {
        const _ = file_system_1.absoluteFrom;
        const CORE = {
            name: _('/node_modules/@angular/core/index.d.ts'),
            contents: `
      export declare function Input(...args: any[]): any;
      export declare function Inject(...args: any[]): any;
      export declare function Component(...args: any[]): any;
      export declare class Injector {}
    `,
        };
        const { program } = (0, testing_2.makeProgram)([
            CORE,
            {
                name: _('/index.ts'),
                contents,
            },
        ], { target: typescript_1.default.ScriptTarget.ES2015 });
        const host = new reflection_1.TypeScriptReflectionHost(program.getTypeChecker());
        const target = (0, testing_2.getDeclaration)(program, _('/index.ts'), 'Target', typescript_1.default.isClassDeclaration);
        const call = (0, metadata_1.extractClassMetadata)(target, host, false);
        if (call === null) {
            return '';
        }
        const sf = (0, file_system_1.getSourceFileOrError)(program, _('/index.ts'));
        const im = new translator_1.ImportManager(translator_1.presetImportManagerForceNamespaceImports);
        const stmt = (0, compiler_1.compileClassMetadata)(call).toStmt();
        const tsStatement = (0, translator_1.translateStatement)(sf, stmt, im);
        const res = typescript_1.default.createPrinter().printNode(typescript_1.default.EmitHint.Unspecified, tsStatement, sf);
        return res.replace(/\s+/g, ' ');
    }
});
