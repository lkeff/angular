"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const file_system_1 = require("../../src/ngtsc/file_system");
const testing_1 = require("../../src/ngtsc/file_system/testing");
const indexer_1 = require("../../src/ngtsc/indexer");
const compiler_1 = require("@angular/compiler/src/compiler");
const env_1 = require("./env");
(0, testing_1.runInEachFileSystem)(() => {
    describe('ngtsc component indexing', () => {
        let fs;
        let env;
        let testSourceFile;
        let testTemplateFile;
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup();
            env.tsconfig();
            fs = (0, file_system_1.getFileSystem)();
            testSourceFile = fs.resolve(env.basePath, 'test.ts');
            testTemplateFile = fs.resolve(env.basePath, 'test.html');
        });
        describe('indexing metadata', () => {
            it('should generate component metadata', () => {
                const componentContent = `
        import {Component} from '@angular/core';

        @Component({
          selector: 'test-cmp',
          template: '<div></div>',
        })
        export class TestCmp {}
    `;
                env.write(testSourceFile, componentContent);
                const indexed = env.driveIndexer();
                expect(indexed.size).toBe(1);
                const [[decl, indexedComp]] = Array.from(indexed.entries());
                expect(decl.getText()).toContain('export class TestCmp {}');
                expect(indexedComp).toEqual(jasmine.objectContaining({
                    name: 'TestCmp',
                    selector: 'test-cmp',
                    file: new compiler_1.ParseSourceFile(componentContent, testSourceFile),
                }));
            });
            it('should index inline templates', () => {
                const componentContent = `
        import {Component} from '@angular/core';

        @Component({
          selector: 'test-cmp',
          template: '{{foo}}',
        })
        export class TestCmp { foo = 0; }
      `;
                env.write(testSourceFile, componentContent);
                const indexed = env.driveIndexer();
                const [[_, indexedComp]] = Array.from(indexed.entries());
                const template = indexedComp.template;
                expect(template).toEqual({
                    identifiers: new Set([
                        {
                            name: 'foo',
                            kind: indexer_1.IdentifierKind.Property,
                            span: new indexer_1.AbsoluteSourceSpan(127, 130),
                            target: null,
                        },
                    ]),
                    usedComponents: new Set(),
                    isInline: true,
                    file: new compiler_1.ParseSourceFile(componentContent, testSourceFile),
                });
            });
            it('should index external templates', () => {
                env.write(testSourceFile, `
        import {Component} from '@angular/core';

        @Component({
          selector: 'test-cmp',
          templateUrl: './test.html',
        })
        export class TestCmp { foo = 0; }
      `);
                env.write(testTemplateFile, '{{foo}}');
                const indexed = env.driveIndexer();
                const [[_, indexedComp]] = Array.from(indexed.entries());
                const template = indexedComp.template;
                expect(template).toEqual({
                    identifiers: new Set([
                        {
                            name: 'foo',
                            kind: indexer_1.IdentifierKind.Property,
                            span: new indexer_1.AbsoluteSourceSpan(2, 5),
                            target: null,
                        },
                    ]),
                    usedComponents: new Set(),
                    isInline: false,
                    file: new compiler_1.ParseSourceFile('{{foo}}', testTemplateFile),
                });
            });
            it('should index templates compiled without preserving whitespace', () => {
                env.tsconfig({
                    preserveWhitespaces: false,
                });
                env.write(testSourceFile, `
        import {Component} from '@angular/core';

        @Component({
          selector: 'test-cmp',
          templateUrl: './test.html',
        })
        export class TestCmp { foo = 0; }
      `);
                env.write(testTemplateFile, '  \n  {{foo}}');
                const indexed = env.driveIndexer();
                const [[_, indexedComp]] = Array.from(indexed.entries());
                const template = indexedComp.template;
                expect(template).toEqual({
                    identifiers: new Set([
                        {
                            name: 'foo',
                            kind: indexer_1.IdentifierKind.Property,
                            span: new indexer_1.AbsoluteSourceSpan(7, 10),
                            target: null,
                        },
                    ]),
                    usedComponents: new Set(),
                    isInline: false,
                    file: new compiler_1.ParseSourceFile('  \n  {{foo}}', testTemplateFile),
                });
            });
            it('should generate information about used components', () => {
                env.write(testSourceFile, `
        import {Component} from '@angular/core';

        @Component({
          selector: 'test-cmp',
          templateUrl: './test.html',
          standalone: false,
        })
        export class TestCmp {}
      `);
                env.write(testTemplateFile, '<div></div>');
                env.write('test_import.ts', `
        import {Component, NgModule} from '@angular/core';
        import {TestCmp} from './test';

        @Component({
          templateUrl: './test_import.html',
          standalone: false,
        })
        export class TestImportCmp {}

        @NgModule({
          declarations: [
            TestCmp,
            TestImportCmp,
          ],
          bootstrap: [TestImportCmp]
        })
        export class TestModule {}
      `);
                env.write('test_import.html', '<test-cmp></test-cmp>');
                const indexed = env.driveIndexer();
                expect(indexed.size).toBe(2);
                const indexedComps = Array.from(indexed.values());
                const testComp = indexedComps.find((comp) => comp.name === 'TestCmp');
                const testImportComp = indexedComps.find((cmp) => cmp.name === 'TestImportCmp');
                expect(testComp).toBeDefined();
                expect(testImportComp).toBeDefined();
                expect(testComp.template.usedComponents.size).toBe(0);
                expect(testImportComp.template.usedComponents.size).toBe(1);
                const [usedComp] = Array.from(testImportComp.template.usedComponents);
                expect(indexed.get(usedComp)).toEqual(testComp);
            });
        });
    });
});
