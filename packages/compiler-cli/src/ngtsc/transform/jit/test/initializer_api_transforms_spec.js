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
describe('initializer API metadata transform', () => {
    let host;
    let context;
    beforeEach(() => {
        context = new mocks_1.MockAotContext('/', {
            'core.d.ts': `
        export declare const Directive: any;
        export declare const Input: any;
        export declare const input: any;
        export declare const model: any;
      `,
        });
        host = new mocks_1.MockCompilerHost(context);
    });
    function transform(contents, postDownlevelDecoratorsTransform = false, customPreTransform) {
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
            before: [
                ...(customPreTransform ? [customPreTransform] : []),
                (0, index_1.getInitializerApiJitTransform)(reflectionHost, importTracker, /* isCore */ false),
            ],
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
    describe('input()', () => {
        it('should add `@Input` decorator for a signal input', () => {
            const result = transform(`
        import {input, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          someInput = input(0);
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "someInput", required: false, transform: undefined })
          ], MyDir.prototype, "someInput", void 0);
      `));
        });
        it('should add `@Input` decorator for a required signal input', () => {
            const result = transform(`
        import {input, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          someInput = input.required<string>();
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "someInput", required: true, transform: undefined })
          ], MyDir.prototype, "someInput", void 0);
      `));
        });
        it('should add `@Input` decorator for signal inputs with alias options', () => {
            const result = transform(`
        import {input, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          someInput = input(null, {alias: "public1"});
          someInput2 = input.required<string>({alias: "public2"});
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "public1", required: false, transform: undefined })
          ], MyDir.prototype, "someInput", void 0);
        __decorate([
          i0.Input({ isSignal: true, alias: "public2", required: true, transform: undefined })
          ], MyDir.prototype, "someInput2", void 0);
      `));
        });
        it('should add `@Input` decorator for signal inputs with transforms', () => {
            const result = transform(`
        import {input, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          someInput = input(0, {transform: v => v + 1});
          someInput2 = input.required<number>({transform: v => v + 1});
        }
      `);
            // Transform functions are never captured because the input signal already captures
            // them and will run these independently of whether a `transform` is specified here.
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "someInput", required: false, transform: undefined })
          ], MyDir.prototype, "someInput", void 0);
        __decorate([
          i0.Input({ isSignal: true, alias: "someInput2", required: true, transform: undefined })
          ], MyDir.prototype, "someInput2", void 0);
      `));
        });
        it('should not transform `@Input` decorator for non-signal inputs', () => {
            const result = transform(`
        import {Input, input, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          someInput = input.required<string>({});
          @Input({someOptionIndicatingThatNothingChanged: true}) nonSignalInput: number = 0;
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "someInput", required: true, transform: undefined })
          ], MyDir.prototype, "someInput", void 0);
        __decorate([
          Input({ someOptionIndicatingThatNothingChanged: true })
          ], MyDir.prototype, "nonSignalInput", void 0);
      `));
        });
        it('should not transform signal inputs with an existing `@Input` decorator', () => {
            // This is expected to not happen because technically the TS code for signal inputs
            // should never discover both `@Input` and signal inputs. We handle this gracefully
            // though in case someone compiles without the Angular compiler (which would report a
            // diagnostic).
            const result = transform(`
        import {Input, input, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          @Input() someInput = input.required<string>({});
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          Input()
          ], MyDir.prototype, "someInput", void 0);
      `));
        });
        it('should preserve existing decorators applied on signal inputs fields', () => {
            const result = transform(`
        import {Input, input, Directive} from '@angular/core';

        declare const MyCustomDecorator: any;

        @Directive({})
        class MyDir {
          @MyCustomDecorator() someInput = input.required<string>({});
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
      __decorate([
        i0.Input({ isSignal: true, alias: "someInput", required: true, transform: undefined }),
        MyCustomDecorator()
        ], MyDir.prototype, "someInput", void 0);
      `));
        });
        it('should work with decorator downleveling post-transform', () => {
            const result = transform(`
            import {input, Directive} from '@angular/core';

            @Directive({})
            class MyDir {
              someInput = input(0);
            }
          `, 
            /* postDownlevelDecoratorsTransform */ true);
            expect(result).toContain(omitLeadingWhitespace(`
        static propDecorators = {
          someInput: [{ type: i0.Input, args: [{ isSignal: true, alias: "someInput", required: false, transform: undefined },] }]
        };
      `));
        });
        it('should migrate if the class decorator is downleveled in advance', () => {
            const fakeDownlevelPreTransform = (ctx) => {
                return (sf) => {
                    const visitor = (node) => {
                        if (typescript_1.default.isClassDeclaration(node)) {
                            return ctx.factory.updateClassDeclaration(node, [], node.name, node.typeParameters, node.heritageClauses, node.members);
                        }
                        return node;
                    };
                    return typescript_1.default.visitEachChild(sf, visitor, ctx);
                };
            };
            const result = transform(`
        import {input, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          someInput = input(0);
        }
      `, false, fakeDownlevelPreTransform);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "someInput", required: false, transform: undefined })
          ], MyDir.prototype, "someInput", void 0);
      `));
        });
        // Tsickle may transform the class via the downlevel decorator transform in advance in G3.
        // In addition, the property declaration may be transformed too, to add `@type` JSDocs in G3.
        it('should migrate if the class member and class is transformed in advance', () => {
            const fakeDownlevelPreTransform = (ctx) => {
                return (sf) => {
                    const visitor = (node) => {
                        // Updating the `{transform: () => {}} arrow function triggers both transforms.
                        if (typescript_1.default.isArrowFunction(node)) {
                            return ctx.factory.updateArrowFunction(node, node.modifiers, node.typeParameters, node.parameters, node.type, node.equalsGreaterThanToken, ctx.factory.createBlock([]));
                        }
                        return typescript_1.default.visitEachChild(node, visitor, ctx);
                    };
                    return typescript_1.default.visitEachChild(sf, visitor, ctx);
                };
            };
            const result = transform(`
        import {input, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          someInput = input({transform: () => {}});
        }
      `, false, fakeDownlevelPreTransform);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "someInput", required: false, transform: undefined })
          ], MyDir.prototype, "someInput", void 0);
      `));
        });
    });
    describe('model()', () => {
        it('should add `@Input` and `@Output` decorators for a model input', () => {
            const result = transform(`
        import {model, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          value = model(0);
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "value", required: false }),
          i0.Output("valueChange")
        ], MyDir.prototype, "value", void 0);
      `));
        });
        it('should add `@Input` and `@Output` decorators for a required model input', () => {
            const result = transform(`
        import {model, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          value = model.required<string>();
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "value", required: true }),
          i0.Output("valueChange")
        ], MyDir.prototype, "value", void 0);
      `));
        });
        it('should add `@Input` and `@Output` decorators for an aliased model input', () => {
            const result = transform(`
        import {model, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          value = model(null, {alias: "alias"});
          value2 = model.required<string>({alias: "alias2"});
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "alias", required: false }),
          i0.Output("aliasChange")
        ], MyDir.prototype, "value", void 0);
        __decorate([
          i0.Input({ isSignal: true, alias: "alias2", required: true }),
          i0.Output("alias2Change")
        ], MyDir.prototype, "value2", void 0);
      `));
        });
        it('should not transform model inputs with an existing `@Input` decorator', () => {
            const result = transform(`
        import {Input, model, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          @Input() value = model.required<string>();
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          Input()
          ], MyDir.prototype, "value", void 0);
      `));
        });
        it('should not transform model inputs with an existing `@Output` decorator', () => {
            const result = transform(`
        import {Output, model, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          @Output() value = model<string>();
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          Output()
          ], MyDir.prototype, "value", void 0);
      `));
        });
        it('should preserve existing decorators applied on model input fields', () => {
            const result = transform(`
        import {model, Directive} from '@angular/core';

        declare const MyCustomDecorator: any;

        @Directive({})
        class MyDir {
          @MyCustomDecorator() value = model.required<string>({});
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Input({ isSignal: true, alias: "value", required: true }),
          i0.Output("valueChange"),
          MyCustomDecorator()
        ], MyDir.prototype, "value", void 0);
      `));
        });
        it('should work with decorator downleveling post-transform', () => {
            const result = transform(`
            import {model, Directive} from '@angular/core';

            @Directive({})
            class MyDir {
              someInput = model(0);
            }
          `, 
            /* postDownlevelDecoratorsTransform */ true);
            expect(result).toContain(omitLeadingWhitespace(`
        static propDecorators = {
          someInput: [{ type: i0.Input, args: [{ isSignal: true, alias: "someInput", required: false },] }, { type: i0.Output, args: ["someInputChange",] }]
        };
      `));
        });
    });
    describe('output()', () => {
        it('should insert an `@Output` decorator', () => {
            const result = transform(`
        import {output, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          someInput = output();
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Output("someInput")
          ], MyDir.prototype, "someInput", void 0);
      `));
        });
        it('should insert an `@Output` decorator with aliases', () => {
            const result = transform(`
        import {output, Directive} from '@angular/core';

        @Directive({})
        class MyDir {
          someInput = output({alias: 'someAlias'});
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          i0.Output("someAlias")
          ], MyDir.prototype, "someInput", void 0);
      `));
        });
        it('should not change an existing `@Output` decorator', () => {
            const result = transform(`
        import {output, Output, Directive} from '@angular/core';

        const bla = 'some string';

        @Directive({})
        class MyDir {
          @Output(bla) someInput = output({});
        }
      `);
            expect(result).toContain(omitLeadingWhitespace(`
        __decorate([
          Output(bla)
          ], MyDir.prototype, "someInput", void 0);
      `));
        });
    });
});
/** Omits the leading whitespace for each line of the given text. */
function omitLeadingWhitespace(text) {
    return text.replace(/^\s+/gm, '');
}
