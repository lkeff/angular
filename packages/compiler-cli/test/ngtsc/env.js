"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgtscTestEnvironment = void 0;
const index_1 = require("../../index");
const typescript_1 = __importDefault(require("typescript"));
const extract_i18n_1 = require("../../src/extract_i18n");
const main_1 = require("../../src/main");
const file_system_1 = require("../../src/ngtsc/file_system");
const testing_1 = require("../../src/ngtsc/file_system/testing");
const testing_2 = require("../../src/ngtsc/testing");
const compiler_host_1 = require("../../src/transformers/compiler_host");
/**
 * Manages a temporary testing directory structure and environment for testing ngtsc by feeding it
 * TypeScript code.
 */
class NgtscTestEnvironment {
    constructor(fs, outDir, basePath) {
        this.fs = fs;
        this.outDir = outDir;
        this.basePath = basePath;
        this.multiCompileHostExt = null;
        this.oldProgram = null;
        this.changedResources = null;
        this.commandLineArgs = ['-p', this.basePath];
    }
    /**
     * Set up a new testing environment.
     */
    static setup(files = {}, workingDir) {
        const fs = (0, file_system_1.getFileSystem)();
        if (fs instanceof testing_1.MockFileSystem) {
            fs.init(files);
        }
        const host = new AugmentedCompilerHost(fs);
        (0, compiler_host_1.setWrapHostForTest)(makeWrapHost(host));
        workingDir = workingDir !== null && workingDir !== void 0 ? workingDir : (0, file_system_1.absoluteFrom)('/');
        const env = new NgtscTestEnvironment(fs, fs.resolve('/built'), workingDir);
        fs.chdir(workingDir);
        env.write((0, file_system_1.absoluteFrom)('/tsconfig-base.json'), `{
      "compilerOptions": {
        "emitDecoratorMetadata": false,
        "experimentalDecorators": true,
        "skipLibCheck": true,
        "noImplicitAny": true,
        "noEmitOnError": true,
        "strictNullChecks": true,
        "outDir": "built",
        "rootDir": ".",
        "baseUrl": ".",
        "allowJs": true,
        "declaration": true,
        "target": "es2015",
        "newLine": "lf",
        "module": "es2015",
        "moduleResolution": "node",
        "lib": ["es2015", "dom"],
        "typeRoots": ["node_modules/@types"]
      },
      "exclude": [
        "built"
      ]
    }`);
        return env;
    }
    assertExists(fileName) {
        if (!this.fs.exists(this.fs.resolve(this.outDir, fileName))) {
            throw new Error(`Expected ${fileName} to be emitted (outDir: ${this.outDir})`);
        }
    }
    assertDoesNotExist(fileName) {
        if (this.fs.exists(this.fs.resolve(this.outDir, fileName))) {
            throw new Error(`Did not expect ${fileName} to be emitted (outDir: ${this.outDir})`);
        }
    }
    getContents(fileName) {
        this.assertExists(fileName);
        const modulePath = this.fs.resolve(this.outDir, fileName);
        return this.fs.readFile(modulePath);
    }
    enableMultipleCompilations() {
        this.changedResources = new Set();
        this.multiCompileHostExt = new MultiCompileHostExt(this.fs);
        (0, compiler_host_1.setWrapHostForTest)(makeWrapHost(this.multiCompileHostExt));
    }
    /**
     * Installs a compiler host that allows for asynchronous reading of resources by implementing the
     * `CompilerHost.readResource` method. Note that only asynchronous compilations are affected, as
     * synchronous compilations do not use the asynchronous resource loader.
     */
    enablePreloading() {
        (0, compiler_host_1.setWrapHostForTest)(makeWrapHost(new ResourceLoadingCompileHost(this.fs)));
    }
    addCommandLineArgs(...args) {
        this.commandLineArgs.push(...args);
    }
    flushWrittenFileTracking() {
        if (this.multiCompileHostExt === null) {
            throw new Error(`Not tracking written files - call enableMultipleCompilations()`);
        }
        this.changedResources.clear();
        this.multiCompileHostExt.flushWrittenFileTracking();
    }
    getTsProgram() {
        if (this.oldProgram === null) {
            throw new Error('No ts.Program has been created yet.');
        }
        return this.oldProgram.getTsProgram();
    }
    getReuseTsProgram() {
        if (this.oldProgram === null) {
            throw new Error('No ts.Program has been created yet.');
        }
        return this.oldProgram.getReuseTsProgram();
    }
    /**
     * Older versions of the CLI do not provide the `CompilerHost.getModifiedResourceFiles()` method.
     * This results in the `changedResources` set being `null`.
     */
    simulateLegacyCLICompilerHost() {
        this.changedResources = null;
    }
    getFilesWrittenSinceLastFlush() {
        if (this.multiCompileHostExt === null) {
            throw new Error(`Not tracking written files - call enableMultipleCompilations()`);
        }
        const writtenFiles = new Set();
        this.multiCompileHostExt.getFilesWrittenSinceLastFlush().forEach((rawFile) => {
            if (rawFile.startsWith(this.outDir)) {
                writtenFiles.add(rawFile.slice(this.outDir.length));
            }
        });
        return writtenFiles;
    }
    write(fileName, content) {
        const absFilePath = this.fs.resolve(this.basePath, fileName);
        if (this.multiCompileHostExt !== null) {
            this.multiCompileHostExt.invalidate(absFilePath);
            if (!fileName.endsWith('.ts')) {
                this.changedResources.add(absFilePath);
            }
        }
        this.fs.ensureDir(this.fs.dirname(absFilePath));
        this.fs.writeFile(absFilePath, content);
    }
    invalidateCachedFile(fileName) {
        const absFilePath = this.fs.resolve(this.basePath, fileName);
        if (this.multiCompileHostExt === null) {
            throw new Error(`Not caching files - call enableMultipleCompilations()`);
        }
        this.multiCompileHostExt.invalidate(absFilePath);
        if (!fileName.endsWith('.ts')) {
            this.changedResources.add(absFilePath);
        }
    }
    tsconfig(extraOpts = {}, extraRootDirs, files) {
        const tsconfig = {
            extends: './tsconfig-base.json',
            angularCompilerOptions: extraOpts,
        };
        if (files !== undefined) {
            tsconfig['files'] = files;
        }
        if (extraRootDirs !== undefined) {
            tsconfig['compilerOptions'] = {
                rootDirs: ['.', ...extraRootDirs],
            };
        }
        this.write('tsconfig.json', JSON.stringify(tsconfig, null, 2));
        if (extraOpts['_useHostForImportGeneration'] ||
            extraOpts['_useHostForImportAndAliasGeneration']) {
            (0, compiler_host_1.setWrapHostForTest)(makeWrapHost(new FileNameToModuleNameHost(this.fs)));
        }
    }
    /**
     * Run the compiler to completion, and assert that no errors occurred.
     */
    driveMain(customTransformers) {
        const errorSpy = jasmine.createSpy('consoleError').and.callFake(console.error);
        let reuseProgram = undefined;
        if (this.multiCompileHostExt !== null) {
            reuseProgram = {
                program: this.oldProgram || undefined,
            };
        }
        const exitCode = (0, main_1.main)(this.commandLineArgs, errorSpy, undefined, customTransformers, reuseProgram, this.changedResources);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(exitCode).toBe(0);
        if (this.multiCompileHostExt !== null) {
            this.oldProgram = reuseProgram.program;
        }
    }
    /**
     * Run the compiler to completion, and return any `ts.Diagnostic` errors that may have occurred.
     */
    driveDiagnostics(expectedExitCode) {
        // ngtsc only produces ts.Diagnostic messages.
        let reuseProgram = undefined;
        if (this.multiCompileHostExt !== null) {
            reuseProgram = {
                program: this.oldProgram || undefined,
            };
        }
        const { exitCode, diagnostics } = (0, main_1.mainDiagnosticsForTest)(this.commandLineArgs, undefined, reuseProgram, this.changedResources);
        if (expectedExitCode !== undefined) {
            expect(exitCode)
                .withContext(`Expected program to exit with code ${expectedExitCode}, but it actually exited with code ${exitCode}.`)
                .toBe(expectedExitCode);
        }
        if (this.multiCompileHostExt !== null) {
            this.oldProgram = reuseProgram.program;
        }
        // In ngtsc, only `ts.Diagnostic`s are produced.
        return diagnostics;
    }
    driveDiagnosticsAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rootNames, options } = (0, main_1.readNgcCommandLineAndConfiguration)(this.commandLineArgs);
            const host = (0, index_1.createCompilerHost)({ options });
            const program = (0, index_1.createProgram)({ rootNames, host, options });
            yield program.loadNgStructureAsync();
            // ngtsc only produces ts.Diagnostic messages.
            return (0, index_1.defaultGatherDiagnostics)(program);
        });
    }
    driveTemplateTypeChecker() {
        const { rootNames, options } = (0, main_1.readNgcCommandLineAndConfiguration)(this.commandLineArgs);
        const host = (0, index_1.createCompilerHost)({ options });
        const program = (0, index_1.createProgram)({ rootNames, host, options });
        const checker = program.compiler.getTemplateTypeChecker();
        return {
            program: program.getTsProgram(),
            checker,
        };
    }
    driveIndexer() {
        const { rootNames, options } = (0, main_1.readNgcCommandLineAndConfiguration)(this.commandLineArgs);
        const host = (0, index_1.createCompilerHost)({ options });
        const program = (0, index_1.createProgram)({ rootNames, host, options });
        return program.getIndexedComponents();
    }
    driveDocsExtraction(entryPoint) {
        const { rootNames, options } = (0, main_1.readNgcCommandLineAndConfiguration)(this.commandLineArgs);
        const host = (0, index_1.createCompilerHost)({ options });
        const program = (0, index_1.createProgram)({ rootNames, host, options });
        return program.getApiDocumentation(entryPoint, new Set()).entries;
    }
    driveDocsExtractionForSymbols(entryPoint) {
        const { rootNames, options } = (0, main_1.readNgcCommandLineAndConfiguration)(this.commandLineArgs);
        const host = (0, index_1.createCompilerHost)({ options });
        const program = (0, index_1.createProgram)({ rootNames, host, options });
        return program.getApiDocumentation(entryPoint, new Set()).symbols;
    }
    driveXi18n(format, outputFileName, locale = null) {
        const errorSpy = jasmine.createSpy('consoleError').and.callFake(console.error);
        const args = [...this.commandLineArgs, `--i18nFormat=${format}`, `--outFile=${outputFileName}`];
        if (locale !== null) {
            args.push(`--locale=${locale}`);
        }
        const exitCode = (0, extract_i18n_1.mainXi18n)(args, errorSpy);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(exitCode).toEqual(0);
    }
    driveHmr(fileName, className) {
        const { rootNames, options } = (0, main_1.readNgcCommandLineAndConfiguration)(this.commandLineArgs);
        const host = (0, index_1.createCompilerHost)({ options });
        const program = (0, index_1.createProgram)({ rootNames, host, options });
        const sourceFile = program.getTsProgram().getSourceFile(fileName);
        if (sourceFile == null) {
            throw new Error(`Cannot find file at "${fileName}"`);
        }
        for (const node of sourceFile.statements) {
            if (typescript_1.default.isClassDeclaration(node) && node.name != null && node.name.text === className) {
                return program.compiler.emitHmrUpdateModule(node);
            }
        }
        throw new Error(`Cannot find class with name "${className}" in "${fileName}"`);
    }
}
exports.NgtscTestEnvironment = NgtscTestEnvironment;
class AugmentedCompilerHost extends testing_2.NgtscTestCompilerHost {
}
const ROOT_PREFIX = 'root/';
class FileNameToModuleNameHost extends AugmentedCompilerHost {
    fileNameToModuleName(importedFilePath) {
        const relativeFilePath = (0, file_system_1.relativeFrom)(this.fs.relative(this.fs.pwd(), this.fs.resolve(importedFilePath)));
        const rootedPath = this.fs.join('root', relativeFilePath);
        return rootedPath.replace(/(\.d)?.ts$/, '');
    }
    resolveModuleNames(moduleNames, containingFile, reusedNames, redirectedReference, options) {
        return moduleNames.map((moduleName) => {
            if (moduleName.startsWith(ROOT_PREFIX)) {
                // Strip the artificially added root prefix.
                moduleName = '/' + moduleName.slice(ROOT_PREFIX.length);
            }
            return typescript_1.default.resolveModuleName(moduleName, containingFile, options, this, 
            /* cache */ undefined, redirectedReference).resolvedModule;
        });
    }
}
class MultiCompileHostExt extends AugmentedCompilerHost {
    constructor() {
        super(...arguments);
        this.cache = new Map();
        this.writtenFiles = new Set();
    }
    getSourceFile(fileName, languageVersion, onError, shouldCreateNewSourceFile) {
        if (this.cache.has(fileName)) {
            return this.cache.get(fileName);
        }
        const sf = super.getSourceFile(fileName, languageVersion);
        if (sf !== undefined) {
            this.cache.set(sf.fileName, sf);
        }
        return sf;
    }
    flushWrittenFileTracking() {
        this.writtenFiles.clear();
    }
    writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles) {
        super.writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles);
        this.writtenFiles.add(fileName);
    }
    getFilesWrittenSinceLastFlush() {
        return this.writtenFiles;
    }
    invalidate(fileName) {
        this.cache.delete(fileName);
    }
}
class ResourceLoadingCompileHost extends AugmentedCompilerHost {
    readResource(fileName) {
        const resource = this.readFile(fileName);
        if (resource === undefined) {
            throw new Error(`Resource ${fileName} not found`);
        }
        return resource;
    }
}
function makeWrapHost(wrapped) {
    return (delegate) => {
        wrapped.delegate = delegate;
        return new Proxy(delegate, {
            get: (target, name) => {
                if (wrapped[name] !== undefined) {
                    return wrapped[name].bind(wrapped);
                }
                return target[name];
            },
        });
    };
}
