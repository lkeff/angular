"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const common_1 = require("../../annotations/common");
const diagnostics_1 = require("../../diagnostics");
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const partial_evaluator_1 = require("../../partial_evaluator");
const perf_1 = require("../../perf");
const reflection_1 = require("../../reflection");
const testing_2 = require("../../testing");
const transform_1 = require("../../transform");
const injectable_1 = require("../src/injectable");
(0, testing_1.runInEachFileSystem)(() => {
    describe('InjectableDecoratorHandler', () => {
        describe('compile()', () => {
            it('should produce a diagnostic when injectable already has a static ɵprov property (with errorOnDuplicateProv true)', () => {
                const { handler, TestClass, ɵprov, analysis } = setupHandler(/* errorOnDuplicateProv */ true);
                try {
                    handler.compileFull(TestClass, analysis);
                    return fail('Compilation should have failed');
                }
                catch (err) {
                    if (!(err instanceof diagnostics_1.FatalDiagnosticError)) {
                        return fail('Error should be a FatalDiagnosticError');
                    }
                    const diag = err.toDiagnostic();
                    expect(diag.code).toEqual((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INJECTABLE_DUPLICATE_PROV));
                    expect(diag.file.fileName.endsWith('entry.ts')).toBe(true);
                    expect(diag.start).toBe(ɵprov.nameNode.getStart());
                }
            });
            it('should not add new ɵprov property when injectable already has one (with errorOnDuplicateProv false)', () => {
                const { handler, TestClass, ɵprov, analysis } = setupHandler(
                /* errorOnDuplicateProv */ false);
                const res = handler.compileFull(TestClass, analysis);
                expect(res).not.toContain(jasmine.objectContaining({ name: 'ɵprov' }));
            });
        });
    });
});
function setupHandler(errorOnDuplicateProv) {
    const ENTRY_FILE = (0, file_system_1.absoluteFrom)('/entry.ts');
    const ANGULAR_CORE = (0, file_system_1.absoluteFrom)('/node_modules/@angular/core/index.d.ts');
    const { program } = (0, testing_2.makeProgram)([
        {
            name: ANGULAR_CORE,
            contents: 'export const Injectable: any; export const ɵɵdefineInjectable: any',
        },
        {
            name: ENTRY_FILE,
            contents: `
        import {Injectable, ɵɵdefineInjectable} from '@angular/core';
        export const TestClassToken = 'TestClassToken';
        @Injectable({providedIn: 'module'})
        export class TestClass {
          static ɵprov = ɵɵdefineInjectable({ factory: () => {}, token: TestClassToken, providedIn: "module" });
        }`,
        },
    ]);
    const checker = program.getTypeChecker();
    const reflectionHost = new reflection_1.TypeScriptReflectionHost(checker);
    const injectableRegistry = new common_1.InjectableClassRegistry(reflectionHost, /* isCore */ false);
    const evaluator = new partial_evaluator_1.PartialEvaluator(reflectionHost, checker, null);
    const handler = new injectable_1.InjectableDecoratorHandler(reflectionHost, evaluator, 
    /* isCore */ false, 
    /* strictCtorDeps */ false, injectableRegistry, perf_1.NOOP_PERF_RECORDER, true, 
    /*compilationMode */ transform_1.CompilationMode.FULL, errorOnDuplicateProv);
    const TestClass = (0, testing_2.getDeclaration)(program, ENTRY_FILE, 'TestClass', reflection_1.isNamedClassDeclaration);
    const ɵprov = reflectionHost
        .getMembersOfClass(TestClass)
        .find((member) => member.name === 'ɵprov');
    if (ɵprov === undefined) {
        throw new Error('TestClass did not contain a `ɵprov` member');
    }
    const detected = handler.detect(TestClass, reflectionHost.getDecoratorsOfDeclaration(TestClass));
    if (detected === undefined) {
        throw new Error('Failed to recognize TestClass');
    }
    const { analysis } = handler.analyze(TestClass, detected.metadata);
    if (analysis === undefined) {
        throw new Error('Failed to analyze TestClass');
    }
    return { handler, TestClass, ɵprov, analysis };
}
