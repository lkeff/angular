"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgTscPlugin = void 0;
const core_1 = require("./core");
const file_system_1 = require("./file_system");
const incremental_1 = require("./incremental");
const perf_1 = require("./perf");
const program_driver_1 = require("./program_driver");
const api_1 = require("./typecheck/api");
/**
 * A plugin for `tsc_wrapped` which allows Angular compilation from a plain `ts_library`.
 */
class NgTscPlugin {
    get compiler() {
        if (this._compiler === null) {
            throw new Error('Lifecycle error: setupCompilation() must be called first.');
        }
        return this._compiler;
    }
    constructor(ngOptions) {
        this.ngOptions = ngOptions;
        this.name = 'ngtsc';
        this.options = null;
        this.host = null;
        this._compiler = null;
        (0, file_system_1.setFileSystem)(new file_system_1.NodeJSFileSystem());
    }
    wrapHost(host, inputFiles, options) {
        // TODO(alxhub): Eventually the `wrapHost()` API will accept the old `ts.Program` (if one is
        // available). When it does, its `ts.SourceFile`s need to be re-tagged to enable proper
        // incremental compilation.
        this.options = Object.assign(Object.assign({}, this.ngOptions), options);
        this.host = core_1.NgCompilerHost.wrap(host, inputFiles, this.options, /* oldProgram */ null);
        return this.host;
    }
    setupCompilation(program, oldProgram) {
        var _a;
        // TODO(alxhub): we provide a `PerfRecorder` to the compiler, but because we're not driving the
        // compilation, the information captured within it is incomplete, and may not include timings
        // for phases such as emit.
        //
        // Additionally, nothing actually captures the perf results here, so recording stats at all is
        // somewhat moot for now :)
        const perfRecorder = perf_1.ActivePerfRecorder.zeroedToNow();
        if (this.host === null || this.options === null) {
            throw new Error('Lifecycle error: setupCompilation() before wrapHost().');
        }
        this.host.postProgramCreationCleanup();
        const programDriver = new program_driver_1.TsCreateProgramDriver(program, this.host, this.options, this.host.shimExtensionPrefixes);
        const strategy = new incremental_1.PatchedProgramIncrementalBuildStrategy();
        const oldState = oldProgram !== undefined ? strategy.getIncrementalState(oldProgram) : null;
        let ticket;
        const modifiedResourceFiles = new Set();
        if (this.host.getModifiedResourceFiles !== undefined) {
            for (const resourceFile of (_a = this.host.getModifiedResourceFiles()) !== null && _a !== void 0 ? _a : []) {
                modifiedResourceFiles.add((0, file_system_1.resolve)(resourceFile));
            }
        }
        if (oldProgram === undefined || oldState === null) {
            ticket = (0, core_1.freshCompilationTicket)(program, this.options, strategy, programDriver, perfRecorder, 
            /* enableTemplateTypeChecker */ false, 
            /* usePoisonedData */ false);
        }
        else {
            strategy.toNextBuildStrategy().getIncrementalState(oldProgram);
            ticket = (0, core_1.incrementalFromStateTicket)(oldProgram, oldState, program, this.options, strategy, programDriver, modifiedResourceFiles, perfRecorder, false, false);
        }
        this._compiler = core_1.NgCompiler.fromTicket(ticket, this.host);
        return {
            ignoreForDiagnostics: this._compiler.ignoreForDiagnostics,
            ignoreForEmit: this._compiler.ignoreForEmit,
        };
    }
    getDiagnostics(file) {
        if (file === undefined) {
            return this.compiler.getDiagnostics();
        }
        return this.compiler.getDiagnosticsForFile(file, api_1.OptimizeFor.WholeProgram);
    }
    getOptionDiagnostics() {
        return this.compiler.getOptionDiagnostics();
    }
    getNextProgram() {
        return this.compiler.getCurrentProgram();
    }
    createTransformers() {
        // The plugin consumer doesn't know about our perf tracing system, so we consider the emit phase
        // as beginning now.
        this.compiler.perfRecorder.phase(perf_1.PerfPhase.TypeScriptEmit);
        return this.compiler.prepareEmit().transformers;
    }
}
exports.NgTscPlugin = NgTscPlugin;
