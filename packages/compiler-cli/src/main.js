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
exports.main = main;
exports.mainDiagnosticsForTest = mainDiagnosticsForTest;
exports.readNgcCommandLineAndConfiguration = readNgcCommandLineAndConfiguration;
exports.readCommandLineAndConfiguration = readCommandLineAndConfiguration;
exports.watchMode = watchMode;
const typescript_1 = __importDefault(require("typescript"));
const yargs_1 = __importDefault(require("yargs"));
const perform_compile_1 = require("./perform_compile");
const perform_watch_1 = require("./perform_watch");
const api = __importStar(require("./transformers/api"));
function main(args, consoleError = console.error, config, customTransformers, programReuse, modifiedResourceFiles) {
    let { project, rootNames, options, errors: configErrors, watch, emitFlags, } = config || readNgcCommandLineAndConfiguration(args);
    if (configErrors.length) {
        return reportErrorsAndExit(configErrors, /*options*/ undefined, consoleError);
    }
    if (watch) {
        const result = watchMode(project, options, consoleError);
        return reportErrorsAndExit(result.firstCompileResult, options, consoleError);
    }
    let oldProgram;
    if (programReuse !== undefined) {
        oldProgram = programReuse.program;
    }
    const { diagnostics: compileDiags, program } = (0, perform_compile_1.performCompilation)({
        rootNames,
        options,
        emitFlags,
        oldProgram,
        customTransformers,
        modifiedResourceFiles,
    });
    if (programReuse !== undefined) {
        programReuse.program = program;
    }
    return reportErrorsAndExit(compileDiags, options, consoleError);
}
function mainDiagnosticsForTest(args, config, programReuse, modifiedResourceFiles) {
    let { rootNames, options, errors: configErrors, emitFlags, } = config || readNgcCommandLineAndConfiguration(args);
    if (configErrors.length) {
        return {
            exitCode: (0, perform_compile_1.exitCodeFromResult)(configErrors),
            diagnostics: configErrors,
        };
    }
    let oldProgram;
    if (programReuse !== undefined) {
        oldProgram = programReuse.program;
    }
    const { diagnostics: compileDiags, program } = (0, perform_compile_1.performCompilation)({
        rootNames,
        options,
        emitFlags,
        oldProgram,
        modifiedResourceFiles,
    });
    if (programReuse !== undefined) {
        programReuse.program = program;
    }
    return {
        exitCode: (0, perform_compile_1.exitCodeFromResult)(compileDiags),
        diagnostics: compileDiags,
    };
}
function readNgcCommandLineAndConfiguration(args) {
    const options = {};
    const parsedArgs = (0, yargs_1.default)(args)
        .parserConfiguration({ 'strip-aliased': true })
        .option('i18nFile', { type: 'string' })
        .option('i18nFormat', { type: 'string' })
        .option('locale', { type: 'string' })
        .option('missingTranslation', { type: 'string', choices: ['error', 'warning', 'ignore'] })
        .option('outFile', { type: 'string' })
        .option('watch', { type: 'boolean', alias: ['w'] })
        .parseSync();
    if (parsedArgs.i18nFile)
        options.i18nInFile = parsedArgs.i18nFile;
    if (parsedArgs.i18nFormat)
        options.i18nInFormat = parsedArgs.i18nFormat;
    if (parsedArgs.locale)
        options.i18nInLocale = parsedArgs.locale;
    if (parsedArgs.missingTranslation)
        options.i18nInMissingTranslations =
            parsedArgs.missingTranslation;
    const config = readCommandLineAndConfiguration(args, options, [
        'i18nFile',
        'i18nFormat',
        'locale',
        'missingTranslation',
        'watch',
    ]);
    return Object.assign(Object.assign({}, config), { watch: parsedArgs.watch });
}
function readCommandLineAndConfiguration(args, existingOptions = {}, ngCmdLineOptions = []) {
    let cmdConfig = typescript_1.default.parseCommandLine(args);
    const project = cmdConfig.options.project || '.';
    const cmdErrors = cmdConfig.errors.filter((e) => {
        if (typeof e.messageText === 'string') {
            const msg = e.messageText;
            return !ngCmdLineOptions.some((o) => msg.indexOf(o) >= 0);
        }
        return true;
    });
    if (cmdErrors.length) {
        return {
            project,
            rootNames: [],
            options: cmdConfig.options,
            errors: cmdErrors,
            emitFlags: api.EmitFlags.Default,
        };
    }
    const config = (0, perform_compile_1.readConfiguration)(project, cmdConfig.options);
    const options = Object.assign(Object.assign({}, config.options), existingOptions);
    if (options.locale) {
        options.i18nInLocale = options.locale;
    }
    return {
        project,
        rootNames: config.rootNames,
        options,
        errors: config.errors,
        emitFlags: config.emitFlags,
    };
}
function getFormatDiagnosticsHost(options) {
    const basePath = options ? options.basePath : undefined;
    return {
        getCurrentDirectory: () => basePath || typescript_1.default.sys.getCurrentDirectory(),
        // We need to normalize the path separators here because by default, TypeScript
        // compiler hosts use posix canonical paths. In order to print consistent diagnostics,
        // we also normalize the paths.
        getCanonicalFileName: (fileName) => fileName.replace(/\\/g, '/'),
        getNewLine: () => {
            // Manually determine the proper new line string based on the passed compiler
            // options. There is no public TypeScript function that returns the corresponding
            // new line string. see: https://github.com/Microsoft/TypeScript/issues/29581
            if (options && options.newLine !== undefined) {
                return options.newLine === typescript_1.default.NewLineKind.LineFeed ? '\n' : '\r\n';
            }
            return typescript_1.default.sys.newLine;
        },
    };
}
function reportErrorsAndExit(allDiagnostics, options, consoleError = console.error) {
    const errorsAndWarnings = allDiagnostics.filter((d) => d.category !== typescript_1.default.DiagnosticCategory.Message);
    printDiagnostics(errorsAndWarnings, options, consoleError);
    return (0, perform_compile_1.exitCodeFromResult)(allDiagnostics);
}
function watchMode(project, options, consoleError) {
    return (0, perform_watch_1.performWatchCompilation)((0, perform_watch_1.createPerformWatchHost)(project, (diagnostics) => {
        printDiagnostics(diagnostics, options, consoleError);
    }, options, undefined));
}
function printDiagnostics(diagnostics, options, consoleError) {
    if (diagnostics.length === 0) {
        return;
    }
    const formatHost = getFormatDiagnosticsHost(options);
    consoleError((0, perform_compile_1.formatDiagnostics)(diagnostics, formatHost));
}
