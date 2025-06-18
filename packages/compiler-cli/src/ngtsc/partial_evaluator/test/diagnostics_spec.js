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
const os_1 = require("os");
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const imports_1 = require("../../imports");
const reflection_1 = require("../../reflection");
const testing_2 = require("../../testing");
const builtin_1 = require("../src/builtin");
const diagnostics_1 = require("../src/diagnostics");
const dynamic_1 = require("../src/dynamic");
const interface_1 = require("../src/interface");
const result_1 = require("../src/result");
(0, testing_1.runInEachFileSystem)((os) => {
    describe('partial evaluator', () => {
        describe('describeResolvedType()', () => {
            it('should describe primitives', () => {
                expect((0, diagnostics_1.describeResolvedType)(0)).toBe('number');
                expect((0, diagnostics_1.describeResolvedType)(true)).toBe('boolean');
                expect((0, diagnostics_1.describeResolvedType)(false)).toBe('boolean');
                expect((0, diagnostics_1.describeResolvedType)(null)).toBe('null');
                expect((0, diagnostics_1.describeResolvedType)(undefined)).toBe('undefined');
                expect((0, diagnostics_1.describeResolvedType)('text')).toBe('string');
            });
            it('should describe objects limited to a single level', () => {
                expect((0, diagnostics_1.describeResolvedType)(new Map())).toBe('{}');
                expect((0, diagnostics_1.describeResolvedType)(new Map([
                    ['a', 0],
                    ['b', true],
                ]))).toBe('{ a: number; b: boolean }');
                expect((0, diagnostics_1.describeResolvedType)(new Map([['a', new Map()]]))).toBe('{ a: object }');
                expect((0, diagnostics_1.describeResolvedType)(new Map([['a', [1, 2, 3]]]))).toBe('{ a: Array }');
            });
            it('should describe arrays limited to a single level', () => {
                expect((0, diagnostics_1.describeResolvedType)([])).toBe('[]');
                expect((0, diagnostics_1.describeResolvedType)([1, 2, 3])).toBe('[number, number, number]');
                expect((0, diagnostics_1.describeResolvedType)([
                    [1, 2],
                    [3, 4],
                ])).toBe('[Array, Array]');
                expect((0, diagnostics_1.describeResolvedType)([new Map([['a', 0]])])).toBe('[object]');
            });
            it('should describe references', () => {
                const namedFn = typescript_1.default.factory.createFunctionDeclaration(
                /* modifiers */ undefined, 
                /* asteriskToken */ undefined, 
                /* name */ 'test', 
                /* typeParameters */ undefined, 
                /* parameters */ [], 
                /* type */ undefined, 
                /* body */ undefined);
                expect((0, diagnostics_1.describeResolvedType)(new imports_1.Reference(namedFn))).toBe('test');
                const anonymousFn = typescript_1.default.factory.createFunctionDeclaration(
                /* modifiers */ undefined, 
                /* asteriskToken */ undefined, 
                /* name */ undefined, 
                /* typeParameters */ undefined, 
                /* parameters */ [], 
                /* type */ undefined, 
                /* body */ undefined);
                expect((0, diagnostics_1.describeResolvedType)(new imports_1.Reference(anonymousFn))).toBe('(anonymous)');
            });
            it('should describe enum values', () => {
                const decl = typescript_1.default.factory.createEnumDeclaration(
                /* modifiers */ undefined, 
                /* name */ 'MyEnum', 
                /* members */ [typescript_1.default.factory.createEnumMember('member', typescript_1.default.factory.createNumericLiteral(1))]);
                const ref = new imports_1.Reference(decl);
                expect((0, diagnostics_1.describeResolvedType)(new result_1.EnumValue(ref, 'member', 1))).toBe('MyEnum');
            });
            it('should describe dynamic values', () => {
                const node = typescript_1.default.factory.createObjectLiteralExpression();
                expect((0, diagnostics_1.describeResolvedType)(dynamic_1.DynamicValue.fromUnsupportedSyntax(node))).toBe('(not statically analyzable)');
            });
            it('should describe known functions', () => {
                expect((0, diagnostics_1.describeResolvedType)(new builtin_1.StringConcatBuiltinFn('foo'))).toBe('Function');
            });
            it('should describe external modules', () => {
                expect((0, diagnostics_1.describeResolvedType)(new result_1.ResolvedModule(new Map(), () => undefined))).toBe('(module)');
            });
        });
        if (os !== 'Windows' && (0, os_1.platform)() !== 'win32') {
            describe('traceDynamicValue()', () => {
                it('should not include the origin node if points to a different dynamic node.', () => {
                    // In the below expression, the read of "value" is evaluated to be dynamic, but it's also
                    // the exact node for which the diagnostic is produced. Therefore, this node is not part
                    // of the trace.
                    const trace = traceExpression('const value = nonexistent;', 'value');
                    expect(trace.length).toBe(1);
                    expect(trace[0].messageText).toBe(`Unknown reference.`);
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe('nonexistent');
                });
                it('should include the origin node if it is dynamic by itself', () => {
                    const trace = traceExpression('', 'nonexistent;');
                    expect(trace.length).toBe(1);
                    expect(trace[0].messageText).toBe(`Unknown reference.`);
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe('nonexistent');
                });
                it('should include a trace for a dynamic subexpression in the origin expression', () => {
                    const trace = traceExpression('const value = nonexistent;', 'value.property');
                    expect(trace.length).toBe(2);
                    expect(trace[0].messageText).toBe('Unable to evaluate this expression statically.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe('value');
                    expect(trace[1].messageText).toBe('Unknown reference.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[1].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[1])).toBe('nonexistent');
                });
                it('should reduce the granularity to a single entry per statement', () => {
                    // Dynamic values exist for each node that has been visited, but only the initial dynamic
                    // value within a statement is included in the trace.
                    const trace = traceExpression(`const firstChild = document.body.childNodes[0];
             const child = firstChild.firstChild;`, 'child !== undefined');
                    expect(trace.length).toBe(4);
                    expect(trace[0].messageText).toBe('Unable to evaluate this expression statically.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe('child');
                    expect(trace[1].messageText).toBe('Unable to evaluate this expression statically.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[1].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[1])).toBe('firstChild');
                    expect(trace[2].messageText).toBe('Unable to evaluate this expression statically.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[2].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[2])).toBe('document.body');
                    expect(trace[3].messageText).toBe(`A value for 'document' cannot be determined statically, as it is an external declaration.`);
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[3].file)).toBe((0, file_system_1.absoluteFrom)('/lib.d.ts'));
                    expect(getSourceCode(trace[3])).toBe('document: any');
                });
                it('should trace dynamic strings', () => {
                    const trace = traceExpression('', '`${document}`');
                    expect(trace.length).toBe(1);
                    expect(trace[0].messageText).toBe('A string value could not be determined statically.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe('document');
                });
                it('should trace invalid expression types', () => {
                    const trace = traceExpression('', 'true()');
                    expect(trace.length).toBe(1);
                    expect(trace[0].messageText).toBe('Unable to evaluate an invalid expression.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe('true');
                });
                it('should trace unknown syntax', () => {
                    const trace = traceExpression('', `new String('test')`);
                    expect(trace.length).toBe(1);
                    expect(trace[0].messageText).toBe('This syntax is not supported.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe("new String('test')");
                });
                it('should trace complex function invocations', () => {
                    const trace = traceExpression(`
          function complex() {
            console.log('test');
            return true;
          }`, 'complex()');
                    expect(trace.length).toBe(2);
                    expect(trace[0].messageText).toBe('Unable to evaluate function call of complex function. A function must have exactly one return statement.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe('complex()');
                    expect(trace[1].messageText).toBe('Function is declared here.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[1].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[1])).toContain(`console.log('test');`);
                });
                it('should trace object destructuring of external reference', () => {
                    const trace = traceExpression('const {body: {firstChild}} = document;', 'firstChild');
                    expect(trace.length).toBe(2);
                    expect(trace[0].messageText).toBe('Unable to evaluate this expression statically.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe('body: {firstChild}');
                    expect(trace[1].messageText).toBe(`A value for 'document' cannot be determined statically, as it is an external declaration.`);
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[1].file)).toBe((0, file_system_1.absoluteFrom)('/lib.d.ts'));
                    expect(getSourceCode(trace[1])).toBe('document: any');
                });
                it('should trace deep object destructuring of external reference', () => {
                    const trace = traceExpression('const {doc: {body: {firstChild}}} = {doc: document};', 'firstChild');
                    expect(trace.length).toBe(2);
                    expect(trace[0].messageText).toBe('Unable to evaluate this expression statically.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe('body: {firstChild}');
                    expect(trace[1].messageText).toBe(`A value for 'document' cannot be determined statically, as it is an external declaration.`);
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[1].file)).toBe((0, file_system_1.absoluteFrom)('/lib.d.ts'));
                    expect(getSourceCode(trace[1])).toBe('document: any');
                });
                it('should trace array destructuring of dynamic value', () => {
                    const trace = traceExpression('const [firstChild] = document.body.childNodes;', 'firstChild');
                    expect(trace.length).toBe(3);
                    expect(trace[0].messageText).toBe('Unable to evaluate this expression statically.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[0].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[0])).toBe('firstChild');
                    expect(trace[1].messageText).toBe('Unable to evaluate this expression statically.');
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[1].file)).toBe((0, file_system_1.absoluteFrom)('/entry.ts'));
                    expect(getSourceCode(trace[1])).toBe('document.body');
                    expect(trace[2].messageText).toBe(`A value for 'document' cannot be determined statically, as it is an external declaration.`);
                    expect((0, file_system_1.absoluteFromSourceFile)(trace[2].file)).toBe((0, file_system_1.absoluteFrom)('/lib.d.ts'));
                    expect(getSourceCode(trace[2])).toBe('document: any');
                });
            });
        }
    });
});
function getSourceCode(diag) {
    const text = diag.file.text;
    return text.slice(diag.start, diag.start + diag.length);
}
function traceExpression(code, expr) {
    const { program } = (0, testing_2.makeProgram)([
        { name: (0, file_system_1.absoluteFrom)('/entry.ts'), contents: `${code}; const target$ = ${expr};` },
        { name: (0, file_system_1.absoluteFrom)('/lib.d.ts'), contents: `declare const document: any;` },
    ], 
    /* options */ undefined, 
    /* host */ undefined, 
    /* checkForErrors */ false);
    const checker = program.getTypeChecker();
    const decl = (0, testing_2.getDeclaration)(program, (0, file_system_1.absoluteFrom)('/entry.ts'), 'target$', typescript_1.default.isVariableDeclaration);
    const valueExpr = decl.initializer;
    const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker);
    const evaluator = new interface_1.PartialEvaluator(reflectionHost, checker, /* dependencyTracker */ null);
    const value = evaluator.evaluate(valueExpr);
    if (!(value instanceof dynamic_1.DynamicValue)) {
        throw new Error('Expected DynamicValue');
    }
    return (0, diagnostics_1.traceDynamicValue)(valueExpr, value);
}
