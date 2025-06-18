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
exports.Project = void 0;
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const typescript_1 = __importDefault(require("typescript"));
const language_service_1 = require("../../src/language_service");
const buffer_1 = require("./buffer");
const language_service_test_cache_1 = require("./language_service_test_cache");
function writeTsconfig(fs, tsConfigPath, entryFiles, angularCompilerOptions, tsCompilerOptions) {
    fs.writeFile(tsConfigPath, JSON.stringify({
        compilerOptions: Object.assign({ strict: true, experimentalDecorators: true, moduleResolution: 'node', target: 'es2015', rootDir: '.', lib: ['dom', 'es2015'] }, tsCompilerOptions),
        files: entryFiles,
        angularCompilerOptions: Object.assign({ strictTemplates: true }, angularCompilerOptions),
    }, null, 2));
}
class Project {
    static initialize(projectName, projectService, files, angularCompilerOptions = {}, tsCompilerOptions = {}) {
        const fs = (0, file_system_1.getFileSystem)();
        const tsConfigPath = (0, file_system_1.absoluteFrom)(`/${projectName}/tsconfig.json`);
        const entryFiles = [];
        for (const projectFilePath of Object.keys(files)) {
            const contents = files[projectFilePath];
            const filePath = (0, file_system_1.absoluteFrom)(`/${projectName}/${projectFilePath}`);
            const dirPath = fs.dirname(filePath);
            fs.ensureDir(dirPath);
            fs.writeFile(filePath, contents);
            if (projectFilePath.endsWith('.ts') && !projectFilePath.endsWith('.d.ts')) {
                entryFiles.push(filePath);
            }
        }
        writeTsconfig(fs, tsConfigPath, entryFiles, angularCompilerOptions, tsCompilerOptions);
        (0, language_service_test_cache_1.patchLanguageServiceProjectsWithTestHost)();
        // Ensure the project is live in the ProjectService.
        // This creates the `ts.Program` by configuring the project and loading it!
        projectService.openClientFile(entryFiles[0]);
        projectService.closeClientFile(entryFiles[0]);
        return new Project(projectName, projectService, tsConfigPath);
    }
    constructor(name, projectService, tsConfigPath) {
        this.name = name;
        this.projectService = projectService;
        this.tsConfigPath = tsConfigPath;
        this.buffers = new Map();
        // LS for project
        const tsProject = projectService.findProject(tsConfigPath);
        if (tsProject === undefined) {
            throw new Error(`Failed to create project for ${tsConfigPath}`);
        }
        this.tsProject = tsProject;
        // The following operation forces a ts.Program to be created.
        this.tsLS = tsProject.getLanguageService();
        this.ngLS = new language_service_1.LanguageService(tsProject, this.tsLS, {});
    }
    openFile(projectFileName) {
        if (!this.buffers.has(projectFileName)) {
            const fileName = (0, file_system_1.absoluteFrom)(`/${this.name}/${projectFileName}`);
            let scriptInfo = this.tsProject.getScriptInfo(fileName);
            this.projectService.openClientFile(
            // By attempting to open the file, the compiler is going to try to parse it as
            // TS which will throw an error. We pass in JSX which is more permissive.
            fileName, undefined, fileName.endsWith('.html') ? typescript_1.default.ScriptKind.JSX : typescript_1.default.ScriptKind.TS);
            scriptInfo = this.tsProject.getScriptInfo(fileName);
            if (scriptInfo === undefined) {
                throw new Error(`Unable to open ScriptInfo for ${projectFileName} in project ${this.tsConfigPath}`);
            }
            this.buffers.set(projectFileName, new buffer_1.OpenBuffer(this.ngLS, this.tsProject, projectFileName, scriptInfo));
        }
        return this.buffers.get(projectFileName);
    }
    getSourceFile(projectFileName) {
        const fileName = (0, file_system_1.absoluteFrom)(`/${this.name}/${projectFileName}`);
        return this.tsProject.getSourceFile(this.projectService.toPath(fileName));
    }
    getTypeChecker() {
        return this.ngLS.compilerFactory.getOrCreate().getCurrentProgram().getTypeChecker();
    }
    getDiagnosticsForFile(projectFileName) {
        const fileName = (0, file_system_1.absoluteFrom)(`/${this.name}/${projectFileName}`);
        const diagnostics = [];
        if (fileName.endsWith('.ts')) {
            diagnostics.push(...this.tsLS.getSyntacticDiagnostics(fileName));
            diagnostics.push(...this.tsLS.getSemanticDiagnostics(fileName));
        }
        diagnostics.push(...this.ngLS.getSemanticDiagnostics(fileName));
        return diagnostics;
    }
    getCodeFixesAtPosition(projectFileName, start, end, errorCodes) {
        const fileName = (0, file_system_1.absoluteFrom)(`/${this.name}/${projectFileName}`);
        return this.ngLS.getCodeFixesAtPosition(fileName, start, end, errorCodes, {}, {});
    }
    getRefactoringsAtPosition(projectFileName, positionOrRange) {
        const fileName = (0, file_system_1.absoluteFrom)(`/${this.name}/${projectFileName}`);
        return this.ngLS.getPossibleRefactorings(fileName, positionOrRange);
    }
    applyRefactoring(projectFileName, positionOrRange, refactorName, reportProgress) {
        const fileName = (0, file_system_1.absoluteFrom)(`/${this.name}/${projectFileName}`);
        return this.ngLS.applyRefactoring(fileName, positionOrRange, refactorName, reportProgress);
    }
    getCombinedCodeFix(projectFileName, fixId) {
        const fileName = (0, file_system_1.absoluteFrom)(`/${this.name}/${projectFileName}`);
        return this.ngLS.getCombinedCodeFix({
            type: 'file',
            fileName,
        }, fixId, {}, {});
    }
    expectNoSourceDiagnostics() {
        const program = this.tsLS.getProgram();
        if (program === undefined) {
            throw new Error(`Expected to get a ts.Program`);
        }
        const ngCompiler = this.ngLS.compilerFactory.getOrCreate();
        for (const sf of program.getSourceFiles()) {
            if (sf.isDeclarationFile ||
                sf.fileName.endsWith('.ngtypecheck.ts') ||
                !sf.fileName.endsWith('.ts')) {
                continue;
            }
            const syntactic = program.getSyntacticDiagnostics(sf);
            expect(syntactic.map((diag) => diag.messageText)).toEqual([]);
            if (syntactic.length > 0) {
                continue;
            }
            const semantic = program.getSemanticDiagnostics(sf);
            expect(semantic.map((diag) => diag.messageText)).toEqual([]);
            if (semantic.length > 0) {
                continue;
            }
            // It's more efficient to optimize for WholeProgram since we call this with every file in the
            // program.
            const ngDiagnostics = ngCompiler.getDiagnosticsForFile(sf, api_1.OptimizeFor.WholeProgram);
            expect(ngDiagnostics.map((diag) => diag.messageText)).toEqual([]);
        }
    }
    expectNoTemplateDiagnostics(projectFileName, className) {
        const program = this.tsLS.getProgram();
        if (program === undefined) {
            throw new Error(`Expected to get a ts.Program`);
        }
        const fileName = (0, file_system_1.absoluteFrom)(`/${this.name}/${projectFileName}`);
        const sf = (0, file_system_1.getSourceFileOrError)(program, fileName);
        const component = getClassOrError(sf, className);
        const diags = this.getTemplateTypeChecker().getDiagnosticsForComponent(component);
        expect(diags.map((diag) => diag.messageText)).toEqual([]);
    }
    getTemplateTypeChecker() {
        return this.ngLS.compilerFactory.getOrCreate().getTemplateTypeChecker();
    }
    getLogger() {
        return this.tsProject.projectService.logger;
    }
}
exports.Project = Project;
function getClassOrError(sf, name) {
    for (const stmt of sf.statements) {
        if (typescript_1.default.isClassDeclaration(stmt) && stmt.name !== undefined && stmt.name.text === name) {
            return stmt;
        }
    }
    throw new Error(`Class ${name} not found in file: ${sf.fileName}: ${sf.text}`);
}
