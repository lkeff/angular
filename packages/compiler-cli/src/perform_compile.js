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
exports.formatDiagnostics = formatDiagnostics;
exports.calcProjectFileAndBasePath = calcProjectFileAndBasePath;
exports.readConfiguration = readConfiguration;
exports.exitCodeFromResult = exitCodeFromResult;
exports.performCompilation = performCompilation;
exports.defaultGatherDiagnostics = defaultGatherDiagnostics;
const typescript_1 = __importDefault(require("typescript"));
const file_system_1 = require("../src/ngtsc/file_system");
const diagnostics_1 = require("./ngtsc/diagnostics");
const api = __importStar(require("./transformers/api"));
const ng = __importStar(require("./transformers/entry_points"));
const util_1 = require("./transformers/util");
const defaultFormatHost = {
    getCurrentDirectory: () => typescript_1.default.sys.getCurrentDirectory(),
    getCanonicalFileName: (fileName) => fileName,
    getNewLine: () => typescript_1.default.sys.newLine,
};
function formatDiagnostics(diags, host = defaultFormatHost) {
    if (diags && diags.length) {
        return diags
            .map((diagnostic) => (0, diagnostics_1.replaceTsWithNgInErrors)(typescript_1.default.formatDiagnosticsWithColorAndContext([diagnostic], host)))
            .join('');
    }
    else {
        return '';
    }
}
function calcProjectFileAndBasePath(project, host = (0, file_system_1.getFileSystem)()) {
    const absProject = host.resolve(project);
    const projectIsDir = host.lstat(absProject).isDirectory();
    const projectFile = projectIsDir ? host.join(absProject, 'tsconfig.json') : absProject;
    const projectDir = projectIsDir ? absProject : host.dirname(absProject);
    const basePath = host.resolve(projectDir);
    return { projectFile, basePath };
}
function readConfiguration(project, existingOptions, host = (0, file_system_1.getFileSystem)()) {
    var _a;
    try {
        const fs = (0, file_system_1.getFileSystem)();
        const readConfigFile = (configFile) => typescript_1.default.readConfigFile(configFile, (file) => host.readFile(host.resolve(file)));
        const readAngularCompilerOptions = (configFile, parentOptions = {}) => {
            var _a, _b;
            const { config, error } = readConfigFile(configFile);
            if (error) {
                // Errors are handled later on by 'parseJsonConfigFileContent'
                return parentOptions;
            }
            // Note: In Google, `angularCompilerOptions` are stored in `bazelOptions`.
            // This function typically doesn't run for actual Angular compilations, but
            // tooling like Tsurge, or schematics may leverage this helper, so we account
            // for this here.
            const angularCompilerOptions = (_a = config.angularCompilerOptions) !== null && _a !== void 0 ? _a : (_b = config.bazelOptions) === null || _b === void 0 ? void 0 : _b.angularCompilerOptions;
            // we are only interested into merging 'angularCompilerOptions' as
            // other options like 'compilerOptions' are merged by TS
            let existingNgCompilerOptions = Object.assign(Object.assign({}, angularCompilerOptions), parentOptions);
            if (!config.extends) {
                return existingNgCompilerOptions;
            }
            const extendsPaths = typeof config.extends === 'string' ? [config.extends] : config.extends;
            // Call readAngularCompilerOptions recursively to merge NG Compiler options
            // Reverse the array so the overrides happen from right to left.
            return [...extendsPaths].reverse().reduce((prevOptions, extendsPath) => {
                const extendedConfigPath = getExtendedConfigPath(configFile, extendsPath, host, fs);
                return extendedConfigPath === null
                    ? prevOptions
                    : readAngularCompilerOptions(extendedConfigPath, prevOptions);
            }, existingNgCompilerOptions);
        };
        const { projectFile, basePath } = calcProjectFileAndBasePath(project, host);
        const configFileName = host.resolve(host.pwd(), projectFile);
        const { config, error } = readConfigFile(projectFile);
        if (error) {
            return {
                project,
                errors: [error],
                rootNames: [],
                options: {},
                emitFlags: api.EmitFlags.Default,
            };
        }
        const existingCompilerOptions = Object.assign(Object.assign({ genDir: basePath, basePath }, readAngularCompilerOptions(configFileName)), existingOptions);
        const parseConfigHost = createParseConfigHost(host, fs);
        const { options, errors, fileNames: rootNames, projectReferences, } = typescript_1.default.parseJsonConfigFileContent(config, parseConfigHost, basePath, existingCompilerOptions, configFileName);
        let emitFlags = api.EmitFlags.Default;
        if (!(options['skipMetadataEmit'] || options['flatModuleOutFile'])) {
            emitFlags |= api.EmitFlags.Metadata;
        }
        if (options['skipTemplateCodegen']) {
            emitFlags = emitFlags & ~api.EmitFlags.Codegen;
        }
        return { project: projectFile, rootNames, projectReferences, options, errors, emitFlags };
    }
    catch (e) {
        const errors = [
            {
                category: typescript_1.default.DiagnosticCategory.Error,
                messageText: (_a = e.stack) !== null && _a !== void 0 ? _a : e.message,
                file: undefined,
                start: undefined,
                length: undefined,
                source: 'angular',
                code: api.UNKNOWN_ERROR_CODE,
            },
        ];
        return { project: '', errors, rootNames: [], options: {}, emitFlags: api.EmitFlags.Default };
    }
}
function createParseConfigHost(host, fs = (0, file_system_1.getFileSystem)()) {
    return {
        fileExists: host.exists.bind(host),
        readDirectory: (0, file_system_1.createFileSystemTsReadDirectoryFn)(fs),
        readFile: host.readFile.bind(host),
        useCaseSensitiveFileNames: fs.isCaseSensitive(),
    };
}
function getExtendedConfigPath(configFile, extendsValue, host, fs) {
    const result = getExtendedConfigPathWorker(configFile, extendsValue, host, fs);
    if (result !== null) {
        return result;
    }
    // Try to resolve the paths with a json extension append a json extension to the file in case if
    // it is missing and the resolution failed. This is to replicate TypeScript behaviour, see:
    // https://github.com/microsoft/TypeScript/blob/294a5a7d784a5a95a8048ee990400979a6bc3a1c/src/compiler/commandLineParser.ts#L2806
    return getExtendedConfigPathWorker(configFile, `${extendsValue}.json`, host, fs);
}
function getExtendedConfigPathWorker(configFile, extendsValue, host, fs) {
    if (extendsValue.startsWith('.') || fs.isRooted(extendsValue)) {
        const extendedConfigPath = host.resolve(host.dirname(configFile), extendsValue);
        if (host.exists(extendedConfigPath)) {
            return extendedConfigPath;
        }
    }
    else {
        const parseConfigHost = createParseConfigHost(host, fs);
        // Path isn't a rooted or relative path, resolve like a module.
        const { resolvedModule } = typescript_1.default.nodeModuleNameResolver(extendsValue, configFile, { moduleResolution: typescript_1.default.ModuleResolutionKind.Node10, resolveJsonModule: true }, parseConfigHost);
        if (resolvedModule) {
            return (0, file_system_1.absoluteFrom)(resolvedModule.resolvedFileName);
        }
    }
    return null;
}
function exitCodeFromResult(diags) {
    if (!diags)
        return 0;
    if (diags.every((diag) => diag.category !== typescript_1.default.DiagnosticCategory.Error)) {
        // If we have a result and didn't get any errors, we succeeded.
        return 0;
    }
    // Return 2 if any of the errors were unknown.
    return diags.some((d) => d.source === 'angular' && d.code === api.UNKNOWN_ERROR_CODE) ? 2 : 1;
}
function performCompilation({ rootNames, options, host, oldProgram, emitCallback, mergeEmitResultsCallback, gatherDiagnostics = defaultGatherDiagnostics, customTransformers, emitFlags = api.EmitFlags.Default, forceEmit = false, modifiedResourceFiles = null, }) {
    var _a;
    let program;
    let emitResult;
    let allDiagnostics = [];
    try {
        if (!host) {
            host = ng.createCompilerHost({ options });
        }
        if (modifiedResourceFiles) {
            host.getModifiedResourceFiles = () => modifiedResourceFiles;
        }
        program = ng.createProgram({ rootNames, host, options, oldProgram });
        const beforeDiags = Date.now();
        allDiagnostics.push(...gatherDiagnostics(program));
        if (options.diagnostics) {
            const afterDiags = Date.now();
            allDiagnostics.push((0, util_1.createMessageDiagnostic)(`Time for diagnostics: ${afterDiags - beforeDiags}ms.`));
        }
        if (!hasErrors(allDiagnostics)) {
            emitResult = program.emit({
                emitCallback,
                mergeEmitResultsCallback,
                customTransformers,
                emitFlags,
                forceEmit,
            });
            allDiagnostics.push(...emitResult.diagnostics);
            return { diagnostics: allDiagnostics, program, emitResult };
        }
        return { diagnostics: allDiagnostics, program };
    }
    catch (e) {
        // We might have a program with unknown state, discard it.
        program = undefined;
        allDiagnostics.push({
            category: typescript_1.default.DiagnosticCategory.Error,
            messageText: (_a = e.stack) !== null && _a !== void 0 ? _a : e.message,
            code: api.UNKNOWN_ERROR_CODE,
            file: undefined,
            start: undefined,
            length: undefined,
        });
        return { diagnostics: allDiagnostics, program };
    }
}
function defaultGatherDiagnostics(program) {
    const allDiagnostics = [];
    function checkDiagnostics(diags) {
        if (diags) {
            allDiagnostics.push(...diags);
            return !hasErrors(diags);
        }
        return true;
    }
    let checkOtherDiagnostics = true;
    // Check parameter diagnostics
    checkOtherDiagnostics =
        checkOtherDiagnostics &&
            checkDiagnostics([...program.getTsOptionDiagnostics(), ...program.getNgOptionDiagnostics()]);
    // Check syntactic diagnostics
    checkOtherDiagnostics =
        checkOtherDiagnostics && checkDiagnostics(program.getTsSyntacticDiagnostics());
    // Check TypeScript semantic and Angular structure diagnostics
    checkOtherDiagnostics =
        checkOtherDiagnostics &&
            checkDiagnostics([
                ...program.getTsSemanticDiagnostics(),
                ...program.getNgStructuralDiagnostics(),
            ]);
    // Check Angular semantic diagnostics
    checkOtherDiagnostics =
        checkOtherDiagnostics && checkDiagnostics(program.getNgSemanticDiagnostics());
    return allDiagnostics;
}
function hasErrors(diags) {
    return diags.some((d) => d.category === typescript_1.default.DiagnosticCategory.Error);
}
