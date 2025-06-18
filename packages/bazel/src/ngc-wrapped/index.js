"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.main = main;
exports.runOneBuild = runOneBuild;
exports.compile = compile;
exports.maybeWriteUnusedInputsList = maybeWriteUnusedInputsList;
exports.patchNgHostWithFileNameToModuleName = patchNgHostWithFileNameToModuleName;
// `tsc-wrapped` helpers are not exposed in the primary `@bazel/concatjs` entry-point.
const ng = __importStar(require("@angular/compiler-cli"));
const bazel_1 = require("@angular/compiler-cli/private/bazel");
const index_js_1 = __importDefault(require("@bazel/concatjs/internal/tsc_wrapped/index.js"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const typescript_1 = __importDefault(require("typescript"));
const utils_1 = require("./utils");
// FIXME: we should be able to add the assets to the tsconfig so FileLoader
// knows about them
const NGC_ASSETS = /\.(css|html)$/;
const BAZEL_BIN = /\b(blaze|bazel)-out\b.*?\bbin\b/;
// Note: We compile the content of node_modules with plain ngc command line.
const ALL_DEPS_COMPILED_WITH_BAZEL = false;
function main(args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (index_js_1.default.runAsWorker(args)) {
            yield index_js_1.default.runWorkerLoop(runOneBuild);
        }
        else {
            return (yield runOneBuild(args)) ? 0 : 1;
        }
        return 0;
    });
}
/** The one FileCache instance used in this process. */
const fileCache = new index_js_1.default.FileCache(index_js_1.default.debug);
function runOneBuild(args, inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        if (args[0] === '-p') {
            args.shift();
        }
        // Strip leading at-signs, used to indicate a params file
        const project = args[0].replace(/^@+/, '');
        const [parsedOptions, errors] = index_js_1.default.parseTsconfig(project);
        if (errors === null || errors === void 0 ? void 0 : errors.length) {
            console.error(ng.formatDiagnostics(errors));
            return false;
        }
        if (parsedOptions === null) {
            console.error('Could not parse tsconfig. No parse diagnostics provided.');
            return false;
        }
        const { bazelOpts, options: tsOptions, files, config } = parsedOptions;
        const { errors: userErrors, options: userOptions } = ng.readConfiguration(project);
        if (userErrors === null || userErrors === void 0 ? void 0 : userErrors.length) {
            console.error(ng.formatDiagnostics(userErrors));
            return false;
        }
        const allowedNgCompilerOptionsOverrides = new Set([
            'diagnostics',
            'trace',
            'disableExpressionLowering',
            'disableTypeScriptVersionCheck',
            'i18nOutLocale',
            'i18nOutFormat',
            'i18nOutFile',
            'i18nInLocale',
            'i18nInFile',
            'i18nInFormat',
            'i18nUseExternalIds',
            'i18nInMissingTranslations',
            'preserveWhitespaces',
            'createExternalSymbolFactoryReexports',
            'extendedDiagnostics',
            'forbidOrphanComponents',
            'onlyExplicitDeferDependencyImports',
            'generateExtraImportsInLocalMode',
            '_enableLetSyntax',
            '_enableHmr',
            'strictStandalone',
            'typeCheckHostBindings',
        ]);
        const userOverrides = Object.entries(userOptions)
            .filter(([key]) => allowedNgCompilerOptionsOverrides.has(key))
            .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
        // Angular Compiler options are always set under Bazel. See `ng_module.bzl`.
        const angularConfigRawOptions = config['angularCompilerOptions'];
        const compilerOpts = Object.assign(Object.assign(Object.assign({}, userOverrides), angularConfigRawOptions), tsOptions);
        // These are options passed through from the `ng_module` rule which aren't supported
        // by the `@angular/compiler-cli` and are only intended for `ngc-wrapped`.
        const { expectedOut, _useManifestPathsAsModuleName } = angularConfigRawOptions;
        const tsHost = typescript_1.default.createCompilerHost(compilerOpts, true);
        const { diagnostics } = compile({
            allDepsCompiledWithBazel: ALL_DEPS_COMPILED_WITH_BAZEL,
            useManifestPathsAsModuleName: _useManifestPathsAsModuleName,
            expectedOuts: expectedOut,
            compilerOpts,
            tsHost,
            bazelOpts,
            files,
            inputs,
        });
        if (diagnostics.length) {
            console.error(ng.formatDiagnostics(diagnostics));
        }
        return diagnostics.every((d) => d.category !== typescript_1.default.DiagnosticCategory.Error);
    });
}
function compile({ allDepsCompiledWithBazel = true, useManifestPathsAsModuleName, compilerOpts, tsHost, bazelOpts, files, inputs, expectedOuts, gatherDiagnostics, bazelHost, }) {
    let fileLoader;
    // These options are expected to be set in Bazel. See:
    // https://github.com/bazelbuild/rules_nodejs/blob/591e76edc9ee0a71d604c5999af8bad7909ef2d4/packages/concatjs/internal/common/tsconfig.bzl#L246.
    const baseUrl = compilerOpts.baseUrl;
    const rootDir = compilerOpts.rootDir;
    const rootDirs = compilerOpts.rootDirs;
    if (bazelOpts.maxCacheSizeMb !== undefined) {
        const maxCacheSizeBytes = bazelOpts.maxCacheSizeMb * (1 << 20);
        fileCache.setMaxCacheSize(maxCacheSizeBytes);
    }
    else {
        fileCache.resetMaxCacheSize();
    }
    if (inputs) {
        fileLoader = new index_js_1.default.CachedFileLoader(fileCache);
        // Resolve the inputs to absolute paths to match TypeScript internals
        const resolvedInputs = new Map();
        const inputKeys = Object.keys(inputs);
        for (let i = 0; i < inputKeys.length; i++) {
            const key = inputKeys[i];
            resolvedInputs.set(index_js_1.default.resolveNormalizedPath(key), inputs[key]);
        }
        fileCache.updateCache(resolvedInputs);
    }
    else {
        fileLoader = new index_js_1.default.UncachedFileLoader();
    }
    // Detect from compilerOpts whether the entrypoint is being invoked in Ivy mode.
    if (!compilerOpts.rootDirs) {
        throw new Error('rootDirs is not set!');
    }
    const bazelBin = compilerOpts.rootDirs.find((rootDir) => BAZEL_BIN.test(rootDir));
    if (!bazelBin) {
        throw new Error(`Couldn't find bazel bin in the rootDirs: ${compilerOpts.rootDirs}`);
    }
    const expectedOutsSet = new Set(expectedOuts.map((p) => convertToForwardSlashPath(p)));
    const originalWriteFile = tsHost.writeFile.bind(tsHost);
    tsHost.writeFile = (fileName, content, writeByteOrderMark, onError, sourceFiles) => {
        const relative = (0, utils_1.relativeToRootDirs)(convertToForwardSlashPath(fileName), [rootDir]);
        if (expectedOutsSet.has(relative)) {
            expectedOutsSet.delete(relative);
            originalWriteFile(fileName, content, writeByteOrderMark, onError, sourceFiles);
        }
    };
    if (!bazelHost) {
        bazelHost = new index_js_1.default.CompilerHost(files, compilerOpts, bazelOpts, tsHost, fileLoader);
    }
    const delegate = bazelHost.shouldSkipTsickleProcessing.bind(bazelHost);
    bazelHost.shouldSkipTsickleProcessing = (fileName) => {
        // The base implementation of shouldSkipTsickleProcessing checks whether `fileName` is part of
        // the original `srcs[]`. For Angular (Ivy) compilations, ngfactory/ngsummary files that are
        // shims for original .ts files in the program should be treated identically. Thus, strip the
        // '.ngfactory' or '.ngsummary' part of the filename away before calling the delegate.
        return delegate(fileName.replace(/\.(ngfactory|ngsummary)\.ts$/, '.ts'));
    };
    // Never run the tsickle decorator transform.
    // TODO(b/254054103): Remove the transform and this flag.
    bazelHost.transformDecorators = false;
    // By default in the `prodmode` output, we do not add annotations for closure compiler.
    // Though, if we are building inside `google3`, closure annotations are desired for
    // prodmode output, so we enable it by default. The defaults can be overridden by
    // setting the `annotateForClosureCompiler` compiler option in the user tsconfig.
    if (!bazelOpts.es5Mode && !bazelOpts.devmode) {
        if (bazelOpts.workspaceName === 'google3') {
            compilerOpts.annotateForClosureCompiler = true;
        }
        else {
            compilerOpts.annotateForClosureCompiler = false;
        }
    }
    // The `annotateForClosureCompiler` Angular compiler option is not respected by default
    // as ngc-wrapped handles tsickle emit on its own. This means that we need to update
    // the tsickle compiler host based on the `annotateForClosureCompiler` flag.
    if (compilerOpts.annotateForClosureCompiler) {
        bazelHost.transformTypesToClosure = true;
    }
    // Patch fileExists when resolving modules, so that CompilerHost can ask TypeScript to
    // resolve non-existing generated files that don't exist on disk, but are
    // synthetic and added to the `programWithStubs` based on real inputs.
    const origBazelHostFileExist = bazelHost.fileExists;
    bazelHost.fileExists = (fileName) => {
        if (NGC_ASSETS.test(fileName)) {
            return tsHost.fileExists(fileName);
        }
        return origBazelHostFileExist.call(bazelHost, fileName);
    };
    const origBazelHostShouldNameModule = bazelHost.shouldNameModule.bind(bazelHost);
    bazelHost.shouldNameModule = (fileName) => {
        const flatModuleOutPath = path.posix.join(bazelOpts.package, compilerOpts.flatModuleOutFile + '.ts');
        // The bundle index file is synthesized in bundle_index_host so it's not in the
        // compilationTargetSrc.
        // However we still want to give it an AMD module name for devmode.
        // We can't easily tell which file is the synthetic one, so we build up the path we expect
        // it to have and compare against that.
        if (fileName === path.posix.join(baseUrl, flatModuleOutPath))
            return true;
        // Also handle the case the target is in an external repository.
        // Pull the workspace name from the target which is formatted as `@wksp//package:target`
        // if it the target is from an external workspace. If the target is from the local
        // workspace then it will be formatted as `//package:target`.
        const targetWorkspace = bazelOpts.target.split('/')[0].replace(/^@/, '');
        if (targetWorkspace &&
            fileName === path.posix.join(baseUrl, 'external', targetWorkspace, flatModuleOutPath))
            return true;
        return origBazelHostShouldNameModule(fileName);
    };
    const ngHost = ng.createCompilerHost({ options: compilerOpts, tsHost: bazelHost });
    (0, utils_1.patchNgHostWithFileNameToModuleName)(ngHost, compilerOpts, rootDirs, bazelOpts.workspaceName, bazelOpts.compilationTargetSrc, !!useManifestPathsAsModuleName);
    ngHost.toSummaryFileName = (fileName, referringSrcFileName) => path.posix.join(bazelOpts.workspaceName, (0, utils_1.relativeToRootDirs)(fileName, rootDirs).replace(utils_1.EXT, ''));
    if (allDepsCompiledWithBazel) {
        // Note: The default implementation would work as well,
        // but we can be faster as we know how `toSummaryFileName` works.
        // Note: We can't do this if some deps have been compiled with the command line,
        // as that has a different implementation of fromSummaryFileName / toSummaryFileName
        ngHost.fromSummaryFileName = (fileName, referringLibFileName) => {
            const workspaceRelative = fileName.split('/').splice(1).join('/');
            return index_js_1.default.resolveNormalizedPath(bazelBin, workspaceRelative) + '.d.ts';
        };
    }
    // Patch a property on the ngHost that allows the resourceNameToModuleName function to
    // report better errors.
    ngHost.reportMissingResource = (resourceName) => {
        console.error(`\nAsset not found:\n  ${resourceName}`);
        console.error("Check that it's included in the `assets` attribute of the `ng_module` rule.\n");
    };
    const emitCallback = ({ program, targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers = {}, }) => program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
    if (!gatherDiagnostics) {
        gatherDiagnostics = (program) => gatherDiagnosticsForInputsOnly(compilerOpts, bazelOpts, program);
    }
    const { diagnostics, emitResult, program } = ng.performCompilation({
        rootNames: files,
        options: compilerOpts,
        host: ngHost,
        emitCallback,
        gatherDiagnostics,
    });
    let externs = '/** @externs */\n';
    const hasError = diagnostics.some((diag) => diag.category === typescript_1.default.DiagnosticCategory.Error);
    if (!hasError) {
        if (bazelOpts.manifest) {
            fs.writeFileSync(bazelOpts.manifest, '// Empty. Should not be used.');
        }
    }
    // If compilation fails unexpectedly, performCompilation returns no program.
    // Make sure not to crash but report the diagnostics.
    if (!program)
        return { program, diagnostics };
    if (bazelOpts.tsickleExternsPath) {
        // Note: when tsickleExternsPath is provided, we always write a file as a
        // marker that compilation succeeded, even if it's empty (just containing an
        // @externs).
        fs.writeFileSync(bazelOpts.tsickleExternsPath, externs);
    }
    // There might be some expected output files that are not written by the
    // compiler. In this case, just write an empty file.
    for (const fileName of expectedOutsSet) {
        originalWriteFile(fileName, '', false);
    }
    if (!compilerOpts.noEmit) {
        maybeWriteUnusedInputsList(program.getTsProgram(), rootDir, bazelOpts);
    }
    return { program, diagnostics };
}
/**
 * Writes a collection of unused input files and directories which can be
 * consumed by bazel to avoid triggering rebuilds if only unused inputs are
 * changed.
 *
 * See https://bazel.build/contribute/codebase#input-discovery
 */
function maybeWriteUnusedInputsList(program, rootDir, bazelOpts) {
    if (!(bazelOpts === null || bazelOpts === void 0 ? void 0 : bazelOpts.unusedInputsListPath)) {
        return;
    }
    if (bazelOpts.allowedInputs === undefined) {
        throw new Error('`unusedInputsListPath` is set, but no list of allowed inputs provided.');
    }
    // ts.Program's getSourceFiles() gets populated by the sources actually
    // loaded while the program is being built.
    const usedFiles = new Set();
    for (const sourceFile of program.getSourceFiles()) {
        // Only concern ourselves with typescript files.
        usedFiles.add(sourceFile.fileName);
    }
    // allowedInputs are absolute paths to files which may also end with /* which
    // implies any files in that directory can be used.
    const unusedInputs = [];
    for (const f of bazelOpts.allowedInputs) {
        // A ts/x file is unused if it was not found directly in the used sources.
        if ((f.endsWith('.ts') || f.endsWith('.tsx')) && !usedFiles.has(f)) {
            unusedInputs.push(f);
            continue;
        }
        // TODO: Iterate over contents of allowed directories checking for used files.
    }
    // Bazel expects the unused input list to contain paths relative to the
    // execroot directory.
    // See https://docs.bazel.build/versions/main/output_directories.html
    fs.writeFileSync(bazelOpts.unusedInputsListPath, unusedInputs.map((f) => path.relative(rootDir, f)).join('\n'));
}
function isCompilationTarget(bazelOpts, sf) {
    return bazelOpts.compilationTargetSrc.indexOf(sf.fileName) !== -1;
}
function convertToForwardSlashPath(filePath) {
    return filePath.replace(/\\/g, '/');
}
function gatherDiagnosticsForInputsOnly(options, bazelOpts, ngProgram) {
    const tsProgram = ngProgram.getTsProgram();
    // For the Ivy compiler, track the amount of time spent fetching TypeScript diagnostics.
    let previousPhase = bazel_1.PerfPhase.Unaccounted;
    if (ngProgram instanceof ng.NgtscProgram) {
        previousPhase = ngProgram.compiler.perfRecorder.phase(bazel_1.PerfPhase.TypeScriptDiagnostics);
    }
    const diagnostics = [];
    // These checks mirror ts.getPreEmitDiagnostics, with the important
    // exception of avoiding b/30708240, which is that if you call
    // program.getDeclarationDiagnostics() it somehow corrupts the emit.
    diagnostics.push(...tsProgram.getOptionsDiagnostics());
    diagnostics.push(...tsProgram.getGlobalDiagnostics());
    const programFiles = tsProgram.getSourceFiles().filter((f) => isCompilationTarget(bazelOpts, f));
    for (let i = 0; i < programFiles.length; i++) {
        const sf = programFiles[i];
        // Note: We only get the diagnostics for individual files
        // to e.g. not check libraries.
        diagnostics.push(...tsProgram.getSyntacticDiagnostics(sf));
        // In local mode compilation the TS semantic check issues tons of diagnostics due to the fact
        // that the file dependencies (.d.ts files) are not available in the program. So it needs to be
        // disabled.
        if (options.compilationMode !== 'experimental-local') {
            diagnostics.push(...tsProgram.getSemanticDiagnostics(sf));
        }
    }
    if (ngProgram instanceof ng.NgtscProgram) {
        ngProgram.compiler.perfRecorder.phase(previousPhase);
    }
    if (!diagnostics.length) {
        // only gather the angular diagnostics if we have no diagnostics
        // in any other files.
        diagnostics.push(...ngProgram.getNgStructuralDiagnostics());
        diagnostics.push(...ngProgram.getNgSemanticDiagnostics());
    }
    return diagnostics;
}
/**
 * @deprecated
 * Kept here just for compatibility with 1P tools. To be removed soon after 1P update.
 */
function patchNgHostWithFileNameToModuleName(ngHost, compilerOpts, bazelOpts, rootDirs, useManifestPathsAsModuleName) {
    (0, utils_1.patchNgHostWithFileNameToModuleName)(ngHost, compilerOpts, rootDirs, bazelOpts.workspaceName, bazelOpts.compilationTargetSrc, useManifestPathsAsModuleName);
}
