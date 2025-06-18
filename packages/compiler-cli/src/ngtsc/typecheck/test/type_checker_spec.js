"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const diagnostics_1 = require("../../diagnostics");
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const api_1 = require("../api");
const testing_2 = require("../testing");
(0, testing_1.runInEachFileSystem)(() => {
    describe('TemplateTypeChecker', () => {
        it('should batch diagnostic operations when requested in WholeProgram mode', () => {
            const file1 = (0, file_system_1.absoluteFrom)('/file1.ts');
            const file2 = (0, file_system_1.absoluteFrom)('/file2.ts');
            const { program, templateTypeChecker, programStrategy } = (0, testing_2.setup)([
                { fileName: file1, templates: { 'Cmp1': '<div></div>' } },
                { fileName: file2, templates: { 'Cmp2': '<span></span>' } },
            ]);
            templateTypeChecker.getDiagnosticsForFile((0, file_system_1.getSourceFileOrError)(program, file1), api_1.OptimizeFor.WholeProgram);
            const ttcProgram1 = programStrategy.getProgram();
            templateTypeChecker.getDiagnosticsForFile((0, file_system_1.getSourceFileOrError)(program, file2), api_1.OptimizeFor.WholeProgram);
            const ttcProgram2 = programStrategy.getProgram();
            expect(ttcProgram1).toBe(ttcProgram2);
        });
        it('should not batch diagnostic operations when requested in SingleFile mode', () => {
            const file1 = (0, file_system_1.absoluteFrom)('/file1.ts');
            const file2 = (0, file_system_1.absoluteFrom)('/file2.ts');
            const { program, templateTypeChecker, programStrategy } = (0, testing_2.setup)([
                { fileName: file1, templates: { 'Cmp1': '<div></div>' } },
                { fileName: file2, templates: { 'Cmp2': '<span></span>' } },
            ]);
            templateTypeChecker.getDiagnosticsForFile((0, file_system_1.getSourceFileOrError)(program, file1), api_1.OptimizeFor.SingleFile);
            const ttcProgram1 = programStrategy.getProgram();
            // ttcProgram1 should not contain a type check block for Cmp2.
            const ttcSf2Before = (0, file_system_1.getSourceFileOrError)(ttcProgram1, (0, file_system_1.absoluteFrom)('/file2.ngtypecheck.ts'));
            expect(ttcSf2Before.text).not.toContain('Cmp2');
            templateTypeChecker.getDiagnosticsForFile((0, file_system_1.getSourceFileOrError)(program, file2), api_1.OptimizeFor.SingleFile);
            const ttcProgram2 = programStrategy.getProgram();
            // ttcProgram2 should now contain a type check block for Cmp2.
            const ttcSf2After = (0, file_system_1.getSourceFileOrError)(ttcProgram2, (0, file_system_1.absoluteFrom)('/file2.ngtypecheck.ts'));
            expect(ttcSf2After.text).toContain('Cmp2');
            expect(ttcProgram1).not.toBe(ttcProgram2);
        });
        it('should allow access to the type-check block of a component', () => {
            const file1 = (0, file_system_1.absoluteFrom)('/file1.ts');
            const file2 = (0, file_system_1.absoluteFrom)('/file2.ts');
            const { program, templateTypeChecker, programStrategy } = (0, testing_2.setup)([
                { fileName: file1, templates: { 'Cmp1': '<div>{{value}}</div>' } },
                { fileName: file2, templates: { 'Cmp2': '<span></span>' } },
            ]);
            const cmp1 = (0, testing_2.getClass)((0, file_system_1.getSourceFileOrError)(program, file1), 'Cmp1');
            const block = templateTypeChecker.getTypeCheckBlock(cmp1);
            expect(block).not.toBeNull();
            expect(block.getText()).toMatch(/: i[0-9]\.Cmp1/);
            expect(block.getText()).toContain(`value`);
        });
        it('should clear old inlines when necessary', () => {
            const file1 = (0, file_system_1.absoluteFrom)('/file1.ts');
            const file2 = (0, file_system_1.absoluteFrom)('/file2.ts');
            const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
            const dirDeclaration = {
                name: 'TestDir',
                selector: '[dir]',
                file: dirFile,
                type: 'directive',
                isGeneric: true,
            };
            const { program, templateTypeChecker, programStrategy } = (0, testing_2.setup)([
                {
                    fileName: file1,
                    templates: { 'CmpA': '<div dir></div>' },
                    declarations: [dirDeclaration],
                },
                {
                    fileName: file2,
                    templates: { 'CmpB': '<div dir></div>' },
                    declarations: [dirDeclaration],
                },
                {
                    fileName: dirFile,
                    source: `
                // A non-exported interface used as a type bound for a generic directive causes
                // an inline type constructor to be required.
                interface NotExported {}
                export abstract class TestDir<T extends NotExported> {}`,
                    templates: {},
                },
            ]);
            const sf1 = (0, file_system_1.getSourceFileOrError)(program, file1);
            const cmpA = (0, testing_2.getClass)(sf1, 'CmpA');
            const sf2 = (0, file_system_1.getSourceFileOrError)(program, file2);
            const cmpB = (0, testing_2.getClass)(sf2, 'CmpB');
            // Prime the TemplateTypeChecker by asking for a TCB from file1.
            expect(templateTypeChecker.getTypeCheckBlock(cmpA)).not.toBeNull();
            // Next, ask for a TCB from file2. This operation should clear data on TCBs generated for
            // file1.
            expect(templateTypeChecker.getTypeCheckBlock(cmpB)).not.toBeNull();
            // This can be detected by asking for a TCB again from file1. Since no data should be
            // available for file1, this should cause another type-checking program step.
            const prevTtcProgram = programStrategy.getProgram();
            expect(templateTypeChecker.getTypeCheckBlock(cmpA)).not.toBeNull();
            expect(programStrategy.getProgram()).not.toBe(prevTtcProgram);
        });
        describe('when inlining is unsupported', () => {
            it('should not produce errors for components that do not require inlining', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const dirFile = (0, file_system_1.absoluteFrom)('/dir.ts');
                const { program, templateTypeChecker } = (0, testing_2.setup)([
                    {
                        fileName,
                        source: `export class Cmp {}`,
                        templates: { 'Cmp': '<div dir></div>' },
                        declarations: [
                            {
                                name: 'TestDir',
                                selector: '[dir]',
                                file: dirFile,
                                type: 'directive',
                            },
                        ],
                    },
                    {
                        fileName: dirFile,
                        source: `export class TestDir {}`,
                        templates: {},
                    },
                ], { inlining: false });
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const diags = templateTypeChecker.getDiagnosticsForFile(sf, api_1.OptimizeFor.WholeProgram);
                expect(diags.length).toBe(0);
            });
            it('should produce errors for components that require TCB inlining', () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const { program, templateTypeChecker } = (0, testing_2.setup)([
                    {
                        fileName,
                        source: `abstract class Cmp {} // not exported, so requires inline`,
                        templates: { 'Cmp': '<div></div>' },
                    },
                ], { inlining: false });
                const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
                const diags = templateTypeChecker.getDiagnosticsForFile(sf, api_1.OptimizeFor.WholeProgram);
                expect(diags.length).toBe(1);
                expect(diags[0].code).toBe((0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.INLINE_TCB_REQUIRED));
            });
        });
        describe('getTemplateOfComponent()', () => {
            it("should provide access to a component's real template", () => {
                const fileName = (0, file_system_1.absoluteFrom)('/main.ts');
                const { program, templateTypeChecker } = (0, testing_2.setup)([
                    {
                        fileName,
                        templates: {
                            'Cmp': '<div>Template</div>',
                        },
                    },
                ]);
                const cmp = (0, testing_2.getClass)((0, file_system_1.getSourceFileOrError)(program, fileName), 'Cmp');
                const nodes = templateTypeChecker.getTemplate(cmp);
                expect(nodes).not.toBeNull();
                expect(nodes[0].sourceSpan.start.file.content).toBe('<div>Template</div>');
            });
        });
    });
});
