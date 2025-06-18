"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerFactory = void 0;
const core_1 = require("@angular/compiler-cli/src/ngtsc/core");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const incremental_1 = require("@angular/compiler-cli/src/ngtsc/incremental");
/**
 * Manages the `NgCompiler` instance which backs the language service, updating or replacing it as
 * needed to produce an up-to-date understanding of the current program.
 *
 * TODO(alxhub): currently the options used for the compiler are specified at `CompilerFactory`
 * construction, and are not changeable. In a real project, users can update `tsconfig.json`. We
 * need to properly handle a change in the compiler options, either by having an API to update the
 * `CompilerFactory` to use new options, or by replacing it entirely.
 */
class CompilerFactory {
    constructor(adapter, programStrategy, options) {
        this.adapter = adapter;
        this.programStrategy = programStrategy;
        this.options = options;
        this.incrementalStrategy = new incremental_1.TrackedIncrementalBuildStrategy();
        this.compiler = null;
    }
    getOrCreate() {
        var _a;
        const program = this.programStrategy.getProgram();
        const modifiedResourceFiles = new Set();
        for (const fileName of (_a = this.adapter.getModifiedResourceFiles()) !== null && _a !== void 0 ? _a : []) {
            modifiedResourceFiles.add((0, file_system_1.resolve)(fileName));
        }
        if (this.compiler !== null && program === this.compiler.getCurrentProgram()) {
            if (modifiedResourceFiles.size > 0) {
                // Only resource files have changed since the last NgCompiler was created.
                const ticket = (0, core_1.resourceChangeTicket)(this.compiler, modifiedResourceFiles);
                this.compiler = core_1.NgCompiler.fromTicket(ticket, this.adapter);
            }
            else {
                // The previous NgCompiler is being reused, but we still want to reset its performance
                // tracker to capture only the operations that are needed to service the current request.
                this.compiler.perfRecorder.reset();
            }
            return this.compiler;
        }
        let ticket;
        if (this.compiler === null) {
            ticket = (0, core_1.freshCompilationTicket)(program, this.options, this.incrementalStrategy, this.programStrategy, 
            /* perfRecorder */ null, true, true);
        }
        else {
            ticket = (0, core_1.incrementalFromCompilerTicket)(this.compiler, program, this.incrementalStrategy, this.programStrategy, modifiedResourceFiles, 
            /* perfRecorder */ null);
        }
        this.compiler = core_1.NgCompiler.fromTicket(ticket, this.adapter);
        return this.compiler;
    }
}
exports.CompilerFactory = CompilerFactory;
