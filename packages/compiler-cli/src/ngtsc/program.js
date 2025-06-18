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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgtscProgram = void 0;
const compiler_1 = require("@angular/compiler");
const typescript_1 = __importDefault(require("typescript"));
const api = __importStar(require("../transformers/api"));
const i18n_1 = require("../transformers/i18n");
const typescript_support_1 = require("../typescript_support");
const core_1 = require("./core");
const file_system_1 = require("./file_system");
const incremental_1 = require("./incremental");
const perf_1 = require("./perf");
const program_driver_1 = require("./program_driver");
const shims_1 = require("./shims");
const api_1 = require("./typecheck/api");
/**
 * Entrypoint to the Angular Compiler (Ivy+) which sits behind the `api.Program` interface, allowing
 * it to be a drop-in replacement for the legacy View Engine compiler to tooling such as the
 * command-line main() function or the Angular CLI.
 */
class NgtscProgram {
    constructor(rootNames, options, delegateHost, oldProgram) {
        this.options = options;
        const perfRecorder = perf_1.ActivePerfRecorder.zeroedToNow();
        perfRecorder.phase(perf_1.PerfPhase.Setup);
        // First, check whether the current TS version is supported.
        if (!options.disableTypeScriptVersionCheck) {
            (0, typescript_support_1.verifySupportedTypeScriptVersion)();
        }
        // In local compilation mode there are almost always (many) emit errors due to imports that
        // cannot be resolved. So we should emit regardless.
        if (options.compilationMode === 'experimental-local') {
            options.noEmitOnError = false;
        }
        const reuseProgram = oldProgram === null || oldProgram === void 0 ? void 0 : oldProgram.compiler.getCurrentProgram();
        this.host = core_1.NgCompilerHost.wrap(delegateHost, rootNames, options, reuseProgram !== null && reuseProgram !== void 0 ? reuseProgram : null);
        if (reuseProgram !== undefined) {
            // Prior to reusing the old program, restore shim tagging for all its `ts.SourceFile`s.
            // TypeScript checks the `referencedFiles` of `ts.SourceFile`s for changes when evaluating
            // incremental reuse of data from the old program, so it's important that these match in order
            // to get the most benefit out of reuse.
            (0, shims_1.retagAllTsFiles)(reuseProgram);
        }
        this.tsProgram = perfRecorder.inPhase(perf_1.PerfPhase.TypeScriptProgramCreate, () => typescript_1.default.createProgram(this.host.inputFiles, options, this.host, reuseProgram));
        perfRecorder.phase(perf_1.PerfPhase.Unaccounted);
        perfRecorder.memory(perf_1.PerfCheckpoint.TypeScriptProgramCreate);
        this.host.postProgramCreationCleanup();
        const programDriver = new program_driver_1.TsCreateProgramDriver(this.tsProgram, this.host, this.options, this.host.shimExtensionPrefixes);
        this.incrementalStrategy =
            oldProgram !== undefined
                ? oldProgram.incrementalStrategy.toNextBuildStrategy()
                : new incremental_1.TrackedIncrementalBuildStrategy();
        const modifiedResourceFiles = new Set();
        if (this.host.getModifiedResourceFiles !== undefined) {
            const strings = this.host.getModifiedResourceFiles();
            if (strings !== undefined) {
                for (const fileString of strings) {
                    modifiedResourceFiles.add((0, file_system_1.absoluteFrom)(fileString));
                }
            }
        }
        let ticket;
        if (oldProgram === undefined) {
            ticket = (0, core_1.freshCompilationTicket)(this.tsProgram, options, this.incrementalStrategy, programDriver, perfRecorder, 
            /* enableTemplateTypeChecker */ false, 
            /* usePoisonedData */ false);
        }
        else {
            ticket = (0, core_1.incrementalFromCompilerTicket)(oldProgram.compiler, this.tsProgram, this.incrementalStrategy, programDriver, modifiedResourceFiles, perfRecorder);
        }
        // Create the NgCompiler which will drive the rest of the compilation.
        this.compiler = core_1.NgCompiler.fromTicket(ticket, this.host);
    }
    getTsProgram() {
        return this.tsProgram;
    }
    getReuseTsProgram() {
        return this.compiler.getCurrentProgram();
    }
    getTsOptionDiagnostics(cancellationToken) {
        return this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.TypeScriptDiagnostics, () => this.tsProgram.getOptionsDiagnostics(cancellationToken));
    }
    getTsSyntacticDiagnostics(sourceFile, cancellationToken) {
        return this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.TypeScriptDiagnostics, () => {
            const ignoredFiles = this.compiler.ignoreForDiagnostics;
            let res;
            if (sourceFile !== undefined) {
                if (ignoredFiles.has(sourceFile)) {
                    return [];
                }
                res = this.tsProgram.getSyntacticDiagnostics(sourceFile, cancellationToken);
            }
            else {
                const diagnostics = [];
                for (const sf of this.tsProgram.getSourceFiles()) {
                    if (!ignoredFiles.has(sf)) {
                        diagnostics.push(...this.tsProgram.getSyntacticDiagnostics(sf, cancellationToken));
                    }
                }
                res = diagnostics;
            }
            return res;
        });
    }
    getTsSemanticDiagnostics(sourceFile, cancellationToken) {
        // No TS semantic check should be done in local compilation mode, as it is always full of errors
        // due to cross file imports.
        if (this.options.compilationMode === 'experimental-local') {
            return [];
        }
        return this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.TypeScriptDiagnostics, () => {
            const ignoredFiles = this.compiler.ignoreForDiagnostics;
            let res;
            if (sourceFile !== undefined) {
                if (ignoredFiles.has(sourceFile)) {
                    return [];
                }
                res = this.tsProgram.getSemanticDiagnostics(sourceFile, cancellationToken);
            }
            else {
                const diagnostics = [];
                for (const sf of this.tsProgram.getSourceFiles()) {
                    if (!ignoredFiles.has(sf)) {
                        diagnostics.push(...this.tsProgram.getSemanticDiagnostics(sf, cancellationToken));
                    }
                }
                res = diagnostics;
            }
            return res;
        });
    }
    getNgOptionDiagnostics(cancellationToken) {
        return this.compiler.getOptionDiagnostics();
    }
    getNgStructuralDiagnostics(cancellationToken) {
        return [];
    }
    getNgSemanticDiagnostics(fileName, cancellationToken) {
        let sf = undefined;
        if (fileName !== undefined) {
            sf = this.tsProgram.getSourceFile(fileName);
            if (sf === undefined) {
                // There are no diagnostics for files which don't exist in the program - maybe the caller
                // has stale data?
                return [];
            }
        }
        if (sf === undefined) {
            return this.compiler.getDiagnostics();
        }
        else {
            return this.compiler.getDiagnosticsForFile(sf, api_1.OptimizeFor.WholeProgram);
        }
    }
    /**
     * Ensure that the `NgCompiler` has properly analyzed the program, and allow for the asynchronous
     * loading of any resources during the process.
     *
     * This is used by the Angular CLI to allow for spawning (async) child compilations for things
     * like SASS files used in `styleUrls`.
     */
    loadNgStructureAsync() {
        return this.compiler.analyzeAsync();
    }
    listLazyRoutes(entryRoute) {
        return [];
    }
    emitXi18n() {
        var _a, _b, _c;
        const ctx = new compiler_1.MessageBundle(new compiler_1.HtmlParser(), [], {}, (_a = this.options.i18nOutLocale) !== null && _a !== void 0 ? _a : null, this.options.i18nPreserveWhitespaceForLegacyExtraction);
        this.compiler.xi18n(ctx);
        (0, i18n_1.i18nExtract)((_b = this.options.i18nOutFormat) !== null && _b !== void 0 ? _b : null, (_c = this.options.i18nOutFile) !== null && _c !== void 0 ? _c : null, this.host, this.options, ctx, file_system_1.resolve);
    }
    emit(opts) {
        var _a;
        // Check if emission of the i18n messages bundle was requested.
        if (opts !== undefined &&
            opts.emitFlags !== undefined &&
            opts.emitFlags & api.EmitFlags.I18nBundle) {
            this.emitXi18n();
            // `api.EmitFlags` is a View Engine compiler concept. We only pay attention to the absence of
            // the other flags here if i18n emit was requested (since this is usually done in the xi18n
            // flow, where we don't want to emit JS at all).
            if (!(opts.emitFlags & api.EmitFlags.JS)) {
                return {
                    diagnostics: [],
                    emitSkipped: true,
                    emittedFiles: [],
                };
            }
        }
        const forceEmit = (_a = opts === null || opts === void 0 ? void 0 : opts.forceEmit) !== null && _a !== void 0 ? _a : false;
        this.compiler.perfRecorder.memory(perf_1.PerfCheckpoint.PreEmit);
        const res = this.compiler.perfRecorder.inPhase(perf_1.PerfPhase.TypeScriptEmit, () => {
            var _a;
            const { transformers } = this.compiler.prepareEmit();
            const ignoreFiles = this.compiler.ignoreForEmit;
            const emitCallback = ((_a = opts === null || opts === void 0 ? void 0 : opts.emitCallback) !== null && _a !== void 0 ? _a : defaultEmitCallback);
            const writeFile = (fileName, data, writeByteOrderMark, onError, sourceFiles) => {
                if (sourceFiles !== undefined) {
                    // Record successful writes for any `ts.SourceFile` (that's not a declaration file)
                    // that's an input to this write.
                    for (const writtenSf of sourceFiles) {
                        if (writtenSf.isDeclarationFile) {
                            continue;
                        }
                        this.compiler.incrementalCompilation.recordSuccessfulEmit(writtenSf);
                    }
                }
                this.host.writeFile(fileName, data, writeByteOrderMark, onError, sourceFiles);
            };
            const customTransforms = opts && opts.customTransformers;
            const beforeTransforms = transformers.before || [];
            const afterDeclarationsTransforms = transformers.afterDeclarations;
            if (customTransforms !== undefined && customTransforms.beforeTs !== undefined) {
                beforeTransforms.push(...customTransforms.beforeTs);
            }
            const emitResults = [];
            for (const targetSourceFile of this.tsProgram.getSourceFiles()) {
                if (targetSourceFile.isDeclarationFile || ignoreFiles.has(targetSourceFile)) {
                    continue;
                }
                if (!forceEmit && this.compiler.incrementalCompilation.safeToSkipEmit(targetSourceFile)) {
                    this.compiler.perfRecorder.eventCount(perf_1.PerfEvent.EmitSkipSourceFile);
                    continue;
                }
                this.compiler.perfRecorder.eventCount(perf_1.PerfEvent.EmitSourceFile);
                emitResults.push(emitCallback({
                    targetSourceFile,
                    program: this.tsProgram,
                    host: this.host,
                    options: this.options,
                    emitOnlyDtsFiles: false,
                    writeFile,
                    customTransformers: {
                        before: beforeTransforms,
                        after: customTransforms && customTransforms.afterTs,
                        afterDeclarations: afterDeclarationsTransforms,
                    },
                }));
            }
            this.compiler.perfRecorder.memory(perf_1.PerfCheckpoint.Emit);
            // Run the emit, including a custom transformer that will downlevel the Ivy decorators in
            // code.
            return ((opts && opts.mergeEmitResultsCallback) || mergeEmitResults)(emitResults);
        });
        // Record performance analysis information to disk if we've been asked to do so.
        if (this.options.tracePerformance !== undefined) {
            const perf = this.compiler.perfRecorder.finalize();
            (0, file_system_1.getFileSystem)().writeFile((0, file_system_1.getFileSystem)().resolve(this.options.tracePerformance), JSON.stringify(perf, null, 2));
        }
        return res;
    }
    getIndexedComponents() {
        return this.compiler.getIndexedComponents();
    }
    /**
     * Gets information for the current program that may be used to generate API
     * reference documentation. This includes Angular-specific information, such
     * as component inputs and outputs.
     *
     * @param entryPoint Path to the entry point for the package for which API
     *     docs should be extracted.
     */
    getApiDocumentation(entryPoint, privateModules) {
        return this.compiler.getApiDocumentation(entryPoint, privateModules);
    }
    getEmittedSourceFiles() {
        throw new Error('Method not implemented.');
    }
}
exports.NgtscProgram = NgtscProgram;
const defaultEmitCallback = ({ program, targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers, }) => program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers);
function mergeEmitResults(emitResults) {
    const diagnostics = [];
    let emitSkipped = false;
    const emittedFiles = [];
    for (const er of emitResults) {
        diagnostics.push(...er.diagnostics);
        emitSkipped = emitSkipped || er.emitSkipped;
        emittedFiles.push(...(er.emittedFiles || []));
    }
    return { diagnostics, emitSkipped, emittedFiles };
}
