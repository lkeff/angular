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
const file_system_1 = require("../../file_system");
const testing_1 = require("../../file_system/testing");
const incremental_1 = require("../../incremental");
const program_driver_1 = require("../../program_driver");
const reflection_1 = require("../../reflection");
const api_1 = require("../../typecheck/api");
const compiler_1 = require("../src/compiler");
const host_1 = require("../src/host");
function makeFreshCompiler(host, options, program, programStrategy, incrementalStrategy, enableTemplateTypeChecker, usePoisonedData) {
    const ticket = (0, compiler_1.freshCompilationTicket)(program, options, incrementalStrategy, programStrategy, 
    /* perfRecorder */ null, enableTemplateTypeChecker, usePoisonedData);
    return compiler_1.NgCompiler.fromTicket(ticket, host);
}
(0, testing_1.runInEachFileSystem)(() => {
    describe('NgCompiler', () => {
        let fs;
        beforeEach(() => {
            fs = (0, file_system_1.getFileSystem)();
            fs.ensureDir((0, file_system_1.absoluteFrom)('/node_modules/@angular/core'));
            fs.writeFile((0, file_system_1.absoluteFrom)('/node_modules/@angular/core/index.d.ts'), `
        export declare const Component: any;
      `);
        });
        it('should also return template diagnostics when asked for component diagnostics', () => {
            const COMPONENT = (0, file_system_1.absoluteFrom)('/cmp.ts');
            fs.writeFile(COMPONENT, `
        import {Component} from '@angular/core';
        @Component({
          selector: 'test-cmp',
          templateUrl: './template.html',
        })
        export class Cmp {}
      `);
            fs.writeFile((0, file_system_1.absoluteFrom)('/template.html'), `{{does_not_exist.foo}}`);
            const options = {
                strictTemplates: true,
            };
            const baseHost = new file_system_1.NgtscCompilerHost((0, file_system_1.getFileSystem)(), options);
            const host = host_1.NgCompilerHost.wrap(baseHost, [COMPONENT], options, /* oldProgram */ null);
            const program = typescript_1.default.createProgram({ host, options, rootNames: host.inputFiles });
            const compiler = makeFreshCompiler(host, options, program, new program_driver_1.TsCreateProgramDriver(program, host, options, []), new incremental_1.NoopIncrementalBuildStrategy(), 
            /** enableTemplateTypeChecker */ false, 
            /* usePoisonedData */ false);
            const diags = compiler.getDiagnosticsForFile((0, file_system_1.getSourceFileOrError)(program, COMPONENT), api_1.OptimizeFor.SingleFile);
            expect(diags.length).toBe(1);
            expect(diags[0].messageText).toContain('does_not_exist');
        });
        describe('getComponentsWithTemplateFile', () => {
            it('should return the component(s) using a template file', () => {
                const templateFile = (0, file_system_1.absoluteFrom)('/template.html');
                fs.writeFile(templateFile, `This is the template, used by components CmpA and CmpC`);
                const cmpAFile = (0, file_system_1.absoluteFrom)('/cmp-a.ts');
                fs.writeFile(cmpAFile, `
            import {Component} from '@angular/core';
            @Component({
              selector: 'cmp-a',
              templateUrl: './template.html',
            })
            export class CmpA {}
          `);
                const cmpBFile = (0, file_system_1.absoluteFrom)('/cmp-b.ts');
                fs.writeFile(cmpBFile, `
            import {Component} from '@angular/core';
            @Component({
              selector: 'cmp-b',
              template: 'CmpB does not use an external template',
            })
            export class CmpB {}
          `);
                const cmpCFile = (0, file_system_1.absoluteFrom)('/cmp-c.ts');
                fs.writeFile(cmpCFile, `
            import {Component} from '@angular/core';
            @Component({
              selector: 'cmp-c',
              templateUrl: './template.html',
            })
            export class CmpC {}
          `);
                const options = {};
                const baseHost = new file_system_1.NgtscCompilerHost((0, file_system_1.getFileSystem)(), options);
                const host = host_1.NgCompilerHost.wrap(baseHost, [cmpAFile, cmpBFile, cmpCFile], options, 
                /* oldProgram */ null);
                const program = typescript_1.default.createProgram({ host, options, rootNames: host.inputFiles });
                const CmpA = getClass((0, file_system_1.getSourceFileOrError)(program, cmpAFile), 'CmpA');
                const CmpC = getClass((0, file_system_1.getSourceFileOrError)(program, cmpCFile), 'CmpC');
                const compiler = makeFreshCompiler(host, options, program, new program_driver_1.TsCreateProgramDriver(program, host, options, []), new incremental_1.NoopIncrementalBuildStrategy(), 
                /** enableTemplateTypeChecker */ false, 
                /* usePoisonedData */ false);
                const components = compiler.getComponentsWithTemplateFile(templateFile);
                expect(components).toEqual(new Set([CmpA, CmpC]));
            });
        });
        describe('getComponentsWithStyle', () => {
            it('should return the component(s) using a style file', () => {
                const styleFile = (0, file_system_1.absoluteFrom)('/style.css');
                fs.writeFile(styleFile, `/* This is the style, used by components CmpA and CmpC */`);
                const cmpAFile = (0, file_system_1.absoluteFrom)('/cmp-a.ts');
                fs.writeFile(cmpAFile, `
            import {Component} from '@angular/core';
            @Component({
              selector: 'cmp-a',
              template: '',
              styleUrls: ['./style.css'],
            })
            export class CmpA {}
          `);
                const cmpBFile = (0, file_system_1.absoluteFrom)('/cmp-b.ts');
                fs.writeFile(cmpBFile, `
            import {Component} from '@angular/core';
            @Component({
              selector: 'cmp-b',
              template: '',
              styles: ['/* CmpB does not use external style */'],
            })
            export class CmpB {}
          `);
                const cmpCFile = (0, file_system_1.absoluteFrom)('/cmp-c.ts');
                fs.writeFile(cmpCFile, `
            import {Component} from '@angular/core';
            @Component({
              selector: 'cmp-c',
              template: '',
              styleUrls: ['./style.css']
            })
            export class CmpC {}
          `);
                const options = {};
                const baseHost = new file_system_1.NgtscCompilerHost((0, file_system_1.getFileSystem)(), options);
                const host = host_1.NgCompilerHost.wrap(baseHost, [cmpAFile, cmpBFile, cmpCFile], options, 
                /* oldProgram */ null);
                const program = typescript_1.default.createProgram({ host, options, rootNames: host.inputFiles });
                const CmpA = getClass((0, file_system_1.getSourceFileOrError)(program, cmpAFile), 'CmpA');
                const CmpC = getClass((0, file_system_1.getSourceFileOrError)(program, cmpCFile), 'CmpC');
                const compiler = makeFreshCompiler(host, options, program, new program_driver_1.TsCreateProgramDriver(program, host, options, []), new incremental_1.NoopIncrementalBuildStrategy(), 
                /** enableTemplateTypeChecker */ false, 
                /* usePoisonedData */ false);
                const components = compiler.getComponentsWithStyleFile(styleFile);
                expect(components).toEqual(new Set([CmpA, CmpC]));
            });
        });
        describe('getDirectiveResources', () => {
            it('should return the component resources', () => {
                const styleFile = (0, file_system_1.absoluteFrom)('/style.css');
                fs.writeFile(styleFile, `/* This is the template, used by components CmpA */`);
                const styleFile2 = (0, file_system_1.absoluteFrom)('/style2.css');
                fs.writeFile(styleFile2, `/* This is the template, used by components CmpA */`);
                const templateFile = (0, file_system_1.absoluteFrom)('/template.ng.html');
                fs.writeFile(templateFile, `This is the template, used by components CmpA`);
                const cmpAFile = (0, file_system_1.absoluteFrom)('/cmp-a.ts');
                fs.writeFile(cmpAFile, `
            import {Component} from '@angular/core';
            @Component({
              selector: 'cmp-a',
              templateUrl: './template.ng.html',
              styleUrls: ['./style.css', '../../style2.css'],
            })
            export class CmpA {}
          `);
                const options = {};
                const baseHost = new file_system_1.NgtscCompilerHost((0, file_system_1.getFileSystem)(), options);
                const host = host_1.NgCompilerHost.wrap(baseHost, [cmpAFile], options, /* oldProgram */ null);
                const program = typescript_1.default.createProgram({ host, options, rootNames: host.inputFiles });
                const CmpA = getClass((0, file_system_1.getSourceFileOrError)(program, cmpAFile), 'CmpA');
                const compiler = makeFreshCompiler(host, options, program, new program_driver_1.TsCreateProgramDriver(program, host, options, []), new incremental_1.NoopIncrementalBuildStrategy(), 
                /** enableTemplateTypeChecker */ false, 
                /* usePoisonedData */ false);
                const resources = compiler.getDirectiveResources(CmpA);
                expect(resources).not.toBeNull();
                const { template, styles } = resources;
                expect(template.path).toEqual(templateFile);
                expect(styles === null || styles === void 0 ? void 0 : styles.size).toEqual(2);
                const actualPaths = new Set(Array.from(styles || []).map((r) => r.path));
                expect(actualPaths).toEqual(new Set([styleFile, styleFile2]));
            });
            it('does not return component style resources if not an array of strings', () => {
                const styleFile = (0, file_system_1.absoluteFrom)('/style.css');
                fs.writeFile(styleFile, `/* This is the template, used by components CmpA */`);
                const styleFile2 = (0, file_system_1.absoluteFrom)('/style2.css');
                fs.writeFile(styleFile2, `/* This is the template, used by components CmpA */`);
                const cmpAFile = (0, file_system_1.absoluteFrom)('/cmp-a.ts');
                fs.writeFile(cmpAFile, `
            import {Component} from '@angular/core';
            const STYLES = ['./style.css', '../../style2.css'];
            @Component({
              selector: 'cmp-a',
              template: '',
              styleUrls: STYLES,
            })
            export class CmpA {}
          `);
                const options = {};
                const baseHost = new file_system_1.NgtscCompilerHost((0, file_system_1.getFileSystem)(), options);
                const host = host_1.NgCompilerHost.wrap(baseHost, [cmpAFile], options, /* oldProgram */ null);
                const program = typescript_1.default.createProgram({ host, options, rootNames: host.inputFiles });
                const CmpA = getClass((0, file_system_1.getSourceFileOrError)(program, cmpAFile), 'CmpA');
                const compiler = makeFreshCompiler(host, options, program, new program_driver_1.TsCreateProgramDriver(program, host, options, []), new incremental_1.NoopIncrementalBuildStrategy(), 
                /** enableTemplateTypeChecker */ false, 
                /* usePoisonedData */ false);
                const resources = compiler.getDirectiveResources(CmpA);
                expect(resources).not.toBeNull();
                const { styles } = resources;
                expect(styles === null || styles === void 0 ? void 0 : styles.size).toEqual(0);
            });
        });
        describe('getResourceDependencies', () => {
            it('should return resource dependencies of a component source file', () => {
                const COMPONENT = (0, file_system_1.absoluteFrom)('/cmp.ts');
                fs.writeFile(COMPONENT, `
          import {Component} from '@angular/core';
          @Component({
            selector: 'test-cmp',
            templateUrl: './template.html',
            styleUrls: ['./style.css'],
          })
          export class Cmp {}
        `);
                fs.writeFile((0, file_system_1.absoluteFrom)('/template.html'), `<h1>Resource</h1>`);
                fs.writeFile((0, file_system_1.absoluteFrom)('/style.css'), `h1 { }`);
                const options = {
                    strictTemplates: true,
                };
                const baseHost = new file_system_1.NgtscCompilerHost((0, file_system_1.getFileSystem)(), options);
                const host = host_1.NgCompilerHost.wrap(baseHost, [COMPONENT], options, /* oldProgram */ null);
                const program = typescript_1.default.createProgram({ host, options, rootNames: host.inputFiles });
                const compiler = makeFreshCompiler(host, options, program, new program_driver_1.TsCreateProgramDriver(program, host, options, []), new incremental_1.NoopIncrementalBuildStrategy(), 
                /** enableTemplateTypeChecker */ false, 
                /* usePoisonedData */ false);
                const deps = compiler.getResourceDependencies((0, file_system_1.getSourceFileOrError)(program, COMPONENT));
                expect(deps.length).toBe(2);
                expect(deps).toEqual(jasmine.arrayContaining([
                    jasmine.stringMatching(/\/template.html$/),
                    jasmine.stringMatching(/\/style.css$/),
                ]));
            });
        });
        describe('resource-only changes', () => {
            it('should reuse the full compilation state for a resource-only change', () => {
                const COMPONENT = (0, file_system_1.absoluteFrom)('/cmp.ts');
                const TEMPLATE = (0, file_system_1.absoluteFrom)('/template.html');
                fs.writeFile(COMPONENT, `
          import {Component} from '@angular/core';
          @Component({
            selector: 'test-cmp',
            templateUrl: './template.html',
          })
          export class Cmp {}
        `);
                fs.writeFile(TEMPLATE, `<h1>Resource</h1>`);
                const options = {
                    strictTemplates: true,
                };
                const baseHost = new file_system_1.NgtscCompilerHost((0, file_system_1.getFileSystem)(), options);
                const host = host_1.NgCompilerHost.wrap(baseHost, [COMPONENT], options, /* oldProgram */ null);
                const program = typescript_1.default.createProgram({ host, options, rootNames: host.inputFiles });
                const compilerA = makeFreshCompiler(host, options, program, new program_driver_1.TsCreateProgramDriver(program, host, options, []), new incremental_1.NoopIncrementalBuildStrategy(), 
                /** enableTemplateTypeChecker */ false, 
                /* usePoisonedData */ false);
                const componentSf = (0, file_system_1.getSourceFileOrError)(program, COMPONENT);
                // There should be no diagnostics for the component.
                expect(compilerA.getDiagnosticsForFile(componentSf, api_1.OptimizeFor.WholeProgram).length).toBe(0);
                // Change the resource file and introduce an error.
                fs.writeFile(TEMPLATE, `<h1>Resource</h2>`);
                // Perform a resource-only incremental step.
                const resourceTicket = (0, compiler_1.resourceChangeTicket)(compilerA, new Set([TEMPLATE]));
                const compilerB = compiler_1.NgCompiler.fromTicket(resourceTicket, host);
                // A resource-only update should reuse the same compiler instance.
                expect(compilerB).toBe(compilerA);
                // The new template error should be reported in component diagnostics.
                expect(compilerB.getDiagnosticsForFile(componentSf, api_1.OptimizeFor.WholeProgram).length).toBe(1);
            });
        });
    });
});
function getClass(sf, name) {
    for (const stmt of sf.statements) {
        if ((0, reflection_1.isNamedClassDeclaration)(stmt) && stmt.name.text === name) {
            return stmt;
        }
    }
    throw new Error(`Class ${name} not found in file: ${sf.fileName}: ${sf.text}`);
}
