"use strict";
/**
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
const imports_1 = require("../../../imports");
const reflection_1 = require("../../../reflection");
const index_1 = require("../index");
const mocks_1 = require("../../../../../test/mocks");
const TEST_FILE_INPUT = '/test.ts';
const TEST_FILE_OUTPUT = `/test.js`;
describe('signal queries metadata transform', () => {
    let host;
    let context;
    beforeEach(() => {
        context = new mocks_1.MockAotContext('/', {
            'core.d.ts': `
        export declare const Component: any;

        export declare const ViewChild: any;
        export declare const ViewChildren: any;
        export declare const ContentChild: any;
        export declare const ContentChildren: any;

        export declare const viewChild: any;
        export declare const viewChildren: any;
        export declare const contentChild: any;
        export declare const contentChildren: any;
      `,
        });
        host = new mocks_1.MockCompilerHost(context);
    });
    function transform(contents, postDownlevelDecoratorsTransform = false) {
        context.writeFile(TEST_FILE_INPUT, contents);
        const program = typescript_1.default.createProgram([TEST_FILE_INPUT], {
            module: typescript_1.default.ModuleKind.ESNext,
            lib: ['dom', 'es2022'],
            target: typescript_1.default.ScriptTarget.ES2022,
            traceResolution: true,
            experimentalDecorators: true,
            paths: {
                '@angular/core': ['./core.d.ts'],
            },
        }, host);
        const testFile = program.getSourceFile(TEST_FILE_INPUT);
        const typeChecker = program.getTypeChecker();
        const reflectionHost = new reflection_1.TypeScriptReflectionHost(typeChecker);
        const importTracker = new imports_1.ImportedSymbolsTracker();
        const transformers = {
            before: [(0, index_1.getInitializerApiJitTransform)(reflectionHost, importTracker, /* isCore */ false)],
        };
        if (postDownlevelDecoratorsTransform) {
            transformers.before.push((0, index_1.getDownlevelDecoratorsTransform)(typeChecker, reflectionHost, [], 
            /* isCore */ false, 
            /* isClosureCompilerEnabled */ false));
        }
        let output = null;
        const emitResult = program.emit(testFile, (fileName, outputText) => {
            if (fileName === TEST_FILE_OUTPUT) {
                output = outputText;
            }
        }, undefined, undefined, transformers);
        expect(emitResult.diagnostics.length).toBe(0);
        expect(output).not.toBeNull();
        return omitLeadingWhitespace(output);
    }
    it('should add `@ViewChild` decorator for a signal `viewChild`', () => {
        const result = transform(`
      import {viewChild, Component} from '@angular/core';

      @Component({})
      class MyDir {
        el = viewChild('el');
      }
    `);
        expect(result).toContain(omitLeadingWhitespace(`
      __decorate([
        i0.ViewChild('el', { isSignal: true })
      ], MyDir.prototype, "el", void 0);
    `));
    });
    it('should add `@ViewChild` decorator for a required `viewChild`', () => {
        const result = transform(`
      import {viewChild, Component} from '@angular/core';

      @Component({})
      class MyDir {
        el = viewChild.required('el');
      }
    `);
        expect(result).toContain(omitLeadingWhitespace(`
      __decorate([
        i0.ViewChild('el', { isSignal: true })
      ], MyDir.prototype, "el", void 0);
    `));
    });
    it('should add `@ViewChild` decorator for `viewChild` with read option', () => {
        const result = transform(`
      import {viewChild, Component} from '@angular/core';
      import * as bla from '@angular/core';

      const SomeToken = null!;

      @Component({})
      class MyDir {
        el = viewChild('el', {read: SomeToken});
        el2 = viewChild('el', {read: bla.Component});
      }
    `);
        expect(result).toContain(omitLeadingWhitespace(`
      __decorate([
        bla.ViewChild('el', { ...{ read: SomeToken }, isSignal: true })
        ], MyDir.prototype, "el", void 0);
    `));
        expect(result).toContain(omitLeadingWhitespace(`
      __decorate([
        bla.ViewChild('el', { ...{ read: bla.Component }, isSignal: true })
        ], MyDir.prototype, "el2", void 0);
  `));
    });
    it('should add `@ContentChild` decorator for signal queries with `descendants` option', () => {
        const result = transform(`
      import {contentChild, Directive} from '@angular/core';

      class X {}

      @Directive({})
      class MyDir {
        el = contentChild(X, {descendants: true});
      }
    `);
        expect(result).toContain(omitLeadingWhitespace(`
      __decorate([
        i0.ContentChild(X, { ...{ descendants: true }, isSignal: true })
      ], MyDir.prototype, "el", void 0);
    `));
    });
    it('should not transform decorators for non-signal queries', () => {
        const result = transform(`
      import {ViewChildren, viewChild, Component} from '@angular/core';

      @Component({})
      class MyDir {
        el = viewChild('el');
        @ViewChild('el', {someOptionIndicatingThatNothingChanged: true}) nonSignalQuery: any = null;
      }
    `);
        expect(result).toContain(omitLeadingWhitespace(`
      __decorate([
        i0.ViewChild('el', { isSignal: true })
        ], MyDir.prototype, "el", void 0);
      __decorate([
        ViewChild('el', { someOptionIndicatingThatNothingChanged: true })
        ], MyDir.prototype, "nonSignalQuery", void 0);
    `));
    });
    it('should not transform signal queries with an existing decorator', () => {
        // This is expected to not happen because technically the TS code for signal inputs
        // should never discover both decorators and a signal query declaration. We handle this
        // gracefully though in case someone compiles without the Angular compiler (which would report a
        // diagnostic).
        const result = transform(`
        import {contentChildren, ContentChildren, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          @ContentChildren('els', {isSignal: true}) els = contentChildren('els');
        }
      `);
        expect(result).toContain(omitLeadingWhitespace(`
      __decorate([
        ContentChildren('els', { isSignal: true })
        ], MyDir.prototype, "els", void 0);
      `));
    });
    it('should preserve existing decorators applied on signal inputs fields', () => {
        const result = transform(`
        import {contentChild, Directive} from '@angular/core';

        declare const MyCustomDecorator: any;

        @Directive({})
        class MyDir {
          @MyCustomDecorator() bla = contentChild('el', {descendants: false});
        }
      `);
        expect(result).toContain(omitLeadingWhitespace(`
      __decorate([
        i0.ContentChild('el', { ...{ descendants: false }, isSignal: true }),
        MyCustomDecorator()
        ], MyDir.prototype, "bla", void 0);
      `));
    });
    it('should work with decorator downleveling post-transform', () => {
        const result = transform(`
      import {viewChild, Component} from '@angular/core';

      class X {}

      @Component({})
      class MyDir {
        el = viewChild('el', {read: X});
      }
    `, 
        /* postDownlevelDecoratorsTransform */ true);
        expect(result).toContain(omitLeadingWhitespace(`
      static propDecorators = {
        el: [{ type: i0.ViewChild, args: ['el', { ...{ read: X }, isSignal: true },] }]
      };
    `));
    });
});
/** Omits the leading whitespace for each line of the given text. */
function omitLeadingWhitespace(text) {
    return text.replace(/^\s+/gm, '');
}
