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
exports.LanguageService = void 0;
const compiler_cli_1 = require("@angular/compiler-cli");
const diagnostics_1 = require("@angular/compiler-cli/src/ngtsc/diagnostics");
const file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
const perf_1 = require("@angular/compiler-cli/src/ngtsc/perf");
const reflection_1 = require("@angular/compiler-cli/src/ngtsc/reflection");
const api_1 = require("@angular/compiler-cli/src/ngtsc/typecheck/api");
const typescript_1 = __importDefault(require("typescript"));
const adapters_1 = require("./adapters");
const codefixes_1 = require("./codefixes");
const compiler_factory_1 = require("./compiler_factory");
const completions_1 = require("./completions");
const definitions_1 = require("./definitions");
const outlining_spans_1 = require("./outlining_spans");
const quick_info_1 = require("./quick_info");
const references_and_rename_1 = require("./references_and_rename");
const references_and_rename_utils_1 = require("./references_and_rename_utils");
const signature_help_1 = require("./signature_help");
const template_target_1 = require("./template_target");
const ts_utils_1 = require("./utils/ts_utils");
const utils_1 = require("./utils");
const refactoring_1 = require("./refactorings/refactoring");
// Whether the language service should suppress the below for google3.
const enableG3Suppression = false;
// The Copybara config that syncs the language service into g3 will be patched to
// always suppress any diagnostics in this list.
// See `angular2/copy.bara.sky` for more information.
const suppressDiagnosticsInG3 = [
    parseInt(`-99${diagnostics_1.ErrorCode.COMPONENT_RESOURCE_NOT_FOUND}`),
    parseInt(`-99${diagnostics_1.ErrorCode.INLINE_TCB_REQUIRED}`),
];
class LanguageService {
    constructor(project, tsLS, config) {
        this.project = project;
        this.tsLS = tsLS;
        this.config = config;
        this.activeRefactorings = new Map();
        if (project.projectKind === typescript_1.default.server.ProjectKind.Configured) {
            const parseConfigHost = new adapters_1.LSParseConfigHost(project.projectService.host);
            this.options = parseNgCompilerOptions(project, parseConfigHost, config);
            this.watchConfigFile(project, parseConfigHost);
        }
        else {
            this.options = project.getCompilerOptions();
        }
        logCompilerOptions(project, this.options);
        const programDriver = createProgramDriver(project);
        const adapter = new adapters_1.LanguageServiceAdapter(project);
        this.compilerFactory = new compiler_factory_1.CompilerFactory(adapter, programDriver, this.options);
        this.codeFixes = new codefixes_1.CodeFixes(tsLS, codefixes_1.ALL_CODE_FIXES_METAS);
    }
    getCompilerOptions() {
        return this.options;
    }
    getSemanticDiagnostics(fileName) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsDiagnostics, (compiler) => {
            let diagnostics = [];
            if ((0, utils_1.isTypeScriptFile)(fileName)) {
                const program = compiler.getCurrentProgram();
                const sourceFile = program.getSourceFile(fileName);
                if (sourceFile) {
                    let ngDiagnostics = compiler.getDiagnosticsForFile(sourceFile, api_1.OptimizeFor.SingleFile);
                    // There are several kinds of diagnostics returned by `NgCompiler` for a source file:
                    //
                    // 1. Angular-related non-template diagnostics from decorated classes within that
                    // file.
                    // 2. Template diagnostics for components with direct inline templates (a string
                    // literal).
                    // 3. Template diagnostics for components with indirect inline templates (templates
                    // computed
                    //    by expression).
                    // 4. Template diagnostics for components with external templates.
                    //
                    // When showing diagnostics for a TS source file, we want to only include kinds 1 and
                    // 2 - those diagnostics which are reported at a location within the TS file itself.
                    // Diagnostics for external templates will be shown when editing that template file
                    // (the `else` block) below.
                    //
                    // Currently, indirect inline template diagnostics (kind 3) are not shown at all by
                    // the Language Service, because there is no sensible location in the user's code for
                    // them. Such templates are an edge case, though, and should not be common.
                    //
                    // TODO(alxhub): figure out a good user experience for indirect template diagnostics
                    // and show them from within the Language Service.
                    diagnostics.push(...ngDiagnostics.filter((diag) => diag.file !== undefined && diag.file.fileName === sourceFile.fileName));
                }
            }
            else {
                const components = compiler.getComponentsWithTemplateFile(fileName);
                for (const component of components) {
                    if (typescript_1.default.isClassDeclaration(component)) {
                        diagnostics.push(...compiler.getDiagnosticsForComponent(component));
                    }
                }
            }
            if (this.config.suppressAngularDiagnosticCodes) {
                diagnostics = diagnostics.filter((diag) => !this.config.suppressAngularDiagnosticCodes.includes(diag.code));
            }
            if (enableG3Suppression) {
                diagnostics = diagnostics.filter((diag) => !suppressDiagnosticsInG3.includes(diag.code));
            }
            return diagnostics;
        });
    }
    getDefinitionAndBoundSpan(fileName, position) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsDefinition, (compiler) => {
            if (!isInAngularContext(compiler.getCurrentProgram(), fileName, position)) {
                return undefined;
            }
            return new definitions_1.DefinitionBuilder(this.tsLS, compiler).getDefinitionAndBoundSpan(fileName, position);
        });
    }
    getTypeDefinitionAtPosition(fileName, position) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsDefinition, (compiler) => {
            if (!isInTypeCheckContext(compiler.getCurrentProgram(), fileName, position)) {
                return undefined;
            }
            return new definitions_1.DefinitionBuilder(this.tsLS, compiler).getTypeDefinitionsAtPosition(fileName, position);
        });
    }
    getQuickInfoAtPosition(fileName, position) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsQuickInfo, (compiler) => {
            return this.getQuickInfoAtPositionImpl(fileName, position, compiler);
        });
    }
    getQuickInfoAtPositionImpl(fileName, position, compiler) {
        if (!isInTypeCheckContext(compiler.getCurrentProgram(), fileName, position)) {
            return undefined;
        }
        const typeCheckInfo = (0, utils_1.getTypeCheckInfoAtPosition)(fileName, position, compiler);
        if (typeCheckInfo === undefined) {
            return undefined;
        }
        const positionDetails = (0, template_target_1.getTargetAtPosition)(typeCheckInfo.nodes, position);
        if (positionDetails === null) {
            return undefined;
        }
        // Because we can only show 1 quick info, just use the bound attribute if the target is a two
        // way binding. We may consider concatenating additional display parts from the other target
        // nodes or representing the two way binding in some other manner in the future.
        const node = positionDetails.context.kind === template_target_1.TargetNodeKind.TwoWayBindingContext
            ? positionDetails.context.nodes[0]
            : positionDetails.context.node;
        return new quick_info_1.QuickInfoBuilder(this.tsLS, compiler, typeCheckInfo.declaration, node, positionDetails).get();
    }
    getReferencesAtPosition(fileName, position) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsReferencesAndRenames, (compiler) => {
            const results = new references_and_rename_1.ReferencesBuilder(this.tsLS, compiler).getReferencesAtPosition(fileName, position);
            return results === undefined ? undefined : getUniqueLocations(results);
        });
    }
    getRenameInfo(fileName, position) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsReferencesAndRenames, (compiler) => {
            var _a, _b, _c;
            const renameInfo = new references_and_rename_1.RenameBuilder(this.tsLS, compiler).getRenameInfo((0, file_system_1.absoluteFrom)(fileName), position);
            if (!renameInfo.canRename) {
                return renameInfo;
            }
            const quickInfo = (_a = this.getQuickInfoAtPositionImpl(fileName, position, compiler)) !== null && _a !== void 0 ? _a : this.tsLS.getQuickInfoAtPosition(fileName, position);
            const kind = (_b = quickInfo === null || quickInfo === void 0 ? void 0 : quickInfo.kind) !== null && _b !== void 0 ? _b : typescript_1.default.ScriptElementKind.unknown;
            const kindModifiers = (_c = quickInfo === null || quickInfo === void 0 ? void 0 : quickInfo.kindModifiers) !== null && _c !== void 0 ? _c : typescript_1.default.ScriptElementKind.unknown;
            return Object.assign(Object.assign({}, renameInfo), { kind, kindModifiers });
        });
    }
    findRenameLocations(fileName, position) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsReferencesAndRenames, (compiler) => {
            const results = new references_and_rename_1.RenameBuilder(this.tsLS, compiler).findRenameLocations(fileName, position);
            return results === null ? undefined : getUniqueLocations(results);
        });
    }
    getCompletionBuilder(fileName, position, compiler) {
        const typeCheckInfo = (0, utils_1.getTypeCheckInfoAtPosition)(fileName, position, compiler);
        if (typeCheckInfo === undefined) {
            return null;
        }
        const positionDetails = (0, template_target_1.getTargetAtPosition)(typeCheckInfo.nodes, position);
        if (positionDetails === null) {
            return null;
        }
        // For two-way bindings, we actually only need to be concerned with the bound attribute because
        // the bindings in the template are written with the attribute name, not the event name.
        const node = positionDetails.context.kind === template_target_1.TargetNodeKind.TwoWayBindingContext
            ? positionDetails.context.nodes[0]
            : positionDetails.context.node;
        return new completions_1.CompletionBuilder(this.tsLS, compiler, typeCheckInfo.declaration, node, positionDetails);
    }
    getCompletionsAtPosition(fileName, position, options) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsCompletions, (compiler) => {
            return this.getCompletionsAtPositionImpl(fileName, position, options, compiler);
        });
    }
    getCompletionsAtPositionImpl(fileName, position, options, compiler) {
        if (!isInTypeCheckContext(compiler.getCurrentProgram(), fileName, position)) {
            return undefined;
        }
        const builder = this.getCompletionBuilder(fileName, position, compiler);
        if (builder === null) {
            return undefined;
        }
        return builder.getCompletionsAtPosition(options);
    }
    getCompletionEntryDetails(fileName, position, entryName, formatOptions, preferences, data) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsCompletions, (compiler) => {
            if (!isInTypeCheckContext(compiler.getCurrentProgram(), fileName, position)) {
                return undefined;
            }
            const builder = this.getCompletionBuilder(fileName, position, compiler);
            if (builder === null) {
                return undefined;
            }
            return builder.getCompletionEntryDetails(entryName, formatOptions, preferences, data);
        });
    }
    getSignatureHelpItems(fileName, position, options) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsSignatureHelp, (compiler) => {
            if (!isInTypeCheckContext(compiler.getCurrentProgram(), fileName, position)) {
                return undefined;
            }
            return (0, signature_help_1.getSignatureHelp)(compiler, this.tsLS, fileName, position, options);
        });
    }
    getOutliningSpans(fileName) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.OutliningSpans, (compiler) => {
            return (0, outlining_spans_1.getOutliningSpans)(compiler, fileName);
        });
    }
    getCompletionEntrySymbol(fileName, position, entryName) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsCompletions, (compiler) => {
            if (!isInTypeCheckContext(compiler.getCurrentProgram(), fileName, position)) {
                return undefined;
            }
            const builder = this.getCompletionBuilder(fileName, position, compiler);
            if (builder === null) {
                return undefined;
            }
            const result = builder.getCompletionEntrySymbol(entryName);
            return result;
        });
    }
    /**
     * Performance helper that can help make quick decisions for
     * the VSCode language server to decide whether a code fix exists
     * for the given error code.
     *
     * Related context: https://github.com/angular/vscode-ng-language-service/pull/2050#discussion_r1673079263
     */
    hasCodeFixesForErrorCode(errorCode) {
        return this.codeFixes.hasFixForCode(errorCode);
    }
    getCodeFixesAtPosition(fileName, start, end, errorCodes, formatOptions, preferences) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsCodeFixes, (compiler) => {
            var _a;
            // Fast exit if we know no code fix can exist for the given range/and error codes.
            if (errorCodes.every((code) => !this.hasCodeFixesForErrorCode(code))) {
                return [];
            }
            const diags = this.getSemanticDiagnostics(fileName);
            if (diags.length === 0) {
                return [];
            }
            return this.codeFixes.getCodeFixesAtPosition(fileName, (_a = (0, utils_1.getTypeCheckInfoAtPosition)(fileName, start, compiler)) !== null && _a !== void 0 ? _a : null, compiler, start, end, errorCodes, diags, formatOptions, preferences);
        });
    }
    getCombinedCodeFix(scope, fixId, formatOptions, preferences) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsCodeFixesAll, (compiler) => {
            const diags = this.getSemanticDiagnostics(scope.fileName);
            if (diags.length === 0) {
                return { changes: [] };
            }
            return this.codeFixes.getAllCodeActions(compiler, diags, scope, fixId, formatOptions, preferences);
        });
    }
    getComponentLocationsForTemplate(fileName) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsComponentLocations, (compiler) => {
            const components = compiler.getComponentsWithTemplateFile(fileName);
            const componentDeclarationLocations = Array.from(components.values()).map((c) => {
                let contextSpan = undefined;
                let textSpan;
                if ((0, reflection_1.isNamedClassDeclaration)(c)) {
                    textSpan = typescript_1.default.createTextSpanFromBounds(c.name.getStart(), c.name.getEnd());
                    contextSpan = typescript_1.default.createTextSpanFromBounds(c.getStart(), c.getEnd());
                }
                else {
                    textSpan = typescript_1.default.createTextSpanFromBounds(c.getStart(), c.getEnd());
                }
                return {
                    fileName: c.getSourceFile().fileName,
                    textSpan,
                    contextSpan,
                };
            });
            return componentDeclarationLocations;
        });
    }
    getTemplateLocationForComponent(fileName, position) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsComponentLocations, (compiler) => {
            var _a;
            const nearestNode = findTightestNodeAtPosition(compiler.getCurrentProgram(), fileName, position);
            if (nearestNode === undefined) {
                return undefined;
            }
            const classDeclaration = (0, ts_utils_1.getParentClassDeclaration)(nearestNode);
            if (classDeclaration === undefined) {
                return undefined;
            }
            const template = ((_a = compiler.getDirectiveResources(classDeclaration)) === null || _a === void 0 ? void 0 : _a.template) || null;
            if (template === null) {
                return undefined;
            }
            let templateFileName;
            let span;
            if (template.path !== null) {
                span = typescript_1.default.createTextSpanFromBounds(0, 0);
                templateFileName = template.path;
            }
            else {
                span = typescript_1.default.createTextSpanFromBounds(template.node.getStart(), template.node.getEnd());
                templateFileName = template.node.getSourceFile().fileName;
            }
            return { fileName: templateFileName, textSpan: span, contextSpan: span };
        });
    }
    getTcb(fileName, position) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsTcb, (compiler) => {
            const typeCheckInfo = (0, utils_1.getTypeCheckInfoAtPosition)(fileName, position, compiler);
            if (typeCheckInfo === undefined) {
                return undefined;
            }
            const selectionNodesInfo = (0, template_target_1.getTcbNodesOfTemplateAtPosition)(typeCheckInfo, position, compiler);
            if (selectionNodesInfo === null) {
                return undefined;
            }
            const sf = selectionNodesInfo.componentTcbNode.getSourceFile();
            const selections = selectionNodesInfo.nodes.map((n) => {
                return {
                    start: n.getStart(sf),
                    length: n.getEnd() - n.getStart(sf),
                };
            });
            return {
                fileName: sf.fileName,
                content: sf.getFullText(),
                selections,
            };
        });
    }
    getPossibleRefactorings(fileName, positionOrRange) {
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LSComputeApplicableRefactorings, (compiler) => {
            return refactoring_1.allRefactorings
                .filter((r) => r.isApplicable(compiler, fileName, positionOrRange))
                .map((r) => ({ name: r.id, description: r.description, actions: [] }));
        });
    }
    /**
     * Computes edits for applying the specified refactoring.
     *
     * VSCode explicitly split code actions into two stages:
     *
     *  - 1) what actions are active?
     *  - 2) what are the edits? <- if the user presses the button
     *
     * The latter stage may take longer to compute complex edits, perform
     * analysis. This stage is currently implemented via our non-LSP standard
     * `applyRefactoring` method. We implemented it in a way to support asynchronous
     * computation, so that it can easily integrate with migrations that aren't
     * synchronous/or compute edits in parallel.
     */
    applyRefactoring(fileName, positionOrRange, refactorName, reportProgress) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchingRefactoring = refactoring_1.allRefactorings.find((r) => r.id === refactorName);
            if (matchingRefactoring === undefined) {
                return undefined;
            }
            return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LSApplyRefactoring, (compiler) => {
                if (!this.activeRefactorings.has(refactorName)) {
                    this.activeRefactorings.set(refactorName, new matchingRefactoring(this.project));
                }
                const activeRefactoring = this.activeRefactorings.get(refactorName);
                return activeRefactoring.computeEditsForFix(compiler, this.options, fileName, positionOrRange, reportProgress);
            });
        });
    }
    /**
     * Provides an instance of the `NgCompiler` and traces perf results. Perf results are logged only
     * if the log level is verbose or higher. This method is intended to be called once per public
     * method call.
     *
     * Here is an example of the log output.
     *
     * Perf 245  [16:16:39.353] LanguageService#getQuickInfoAtPosition(): {"events":{},"phases":{
     * "Unaccounted":379,"TtcSymbol":4},"memory":{}}
     *
     * Passing name of caller instead of using `arguments.caller` because 'caller', 'callee', and
     * 'arguments' properties may not be accessed in strict mode.
     *
     * @param phase the `PerfPhase` to execute the `p` callback in
     * @param p callback to be run synchronously with an instance of the `NgCompiler` as argument
     * @return the result of running the `p` callback
     */
    withCompilerAndPerfTracing(phase, p) {
        const compiler = this.compilerFactory.getOrCreate();
        const result = compiler.perfRecorder.inPhase(phase, () => p(compiler));
        const logger = this.project.projectService.logger;
        if (logger.hasLevel(typescript_1.default.server.LogLevel.verbose)) {
            logger.perftrc(`LanguageService#${perf_1.PerfPhase[phase]}: ${JSON.stringify(compiler.perfRecorder.finalize())}`);
        }
        return result;
    }
    getCompilerOptionsDiagnostics() {
        const project = this.project;
        if (!(project instanceof typescript_1.default.server.ConfiguredProject)) {
            return [];
        }
        return this.withCompilerAndPerfTracing(perf_1.PerfPhase.LsDiagnostics, (compiler) => {
            const diagnostics = [];
            const configSourceFile = typescript_1.default.readJsonConfigFile(project.getConfigFilePath(), (path) => project.readFile(path));
            if (!this.options.strictTemplates && !this.options.fullTemplateTypeCheck) {
                diagnostics.push({
                    messageText: 'Some language features are not available. ' +
                        'To access all features, enable `strictTemplates` in `angularCompilerOptions`.',
                    category: typescript_1.default.DiagnosticCategory.Suggestion,
                    code: (0, diagnostics_1.ngErrorCode)(diagnostics_1.ErrorCode.SUGGEST_STRICT_TEMPLATES),
                    file: configSourceFile,
                    start: undefined,
                    length: undefined,
                });
            }
            diagnostics.push(...compiler.getOptionDiagnostics());
            return diagnostics;
        });
    }
    watchConfigFile(project, parseConfigHost) {
        // TODO: Check the case when the project is disposed. An InferredProject
        // could be disposed when a tsconfig.json is added to the workspace,
        // in which case it becomes a ConfiguredProject (or vice-versa).
        // We need to make sure that the FileWatcher is closed.
        if (!(project instanceof typescript_1.default.server.ConfiguredProject)) {
            return;
        }
        const { host } = project.projectService;
        host.watchFile(project.getConfigFilePath(), (fileName, eventKind) => {
            project.log(`Config file changed: ${fileName}`);
            if (eventKind === typescript_1.default.FileWatcherEventKind.Changed) {
                this.options = parseNgCompilerOptions(project, parseConfigHost, this.config);
                logCompilerOptions(project, this.options);
            }
        });
    }
}
exports.LanguageService = LanguageService;
function logCompilerOptions(project, options) {
    const { logger } = project.projectService;
    const projectName = project.getProjectName();
    logger.info(`Angular compiler options for ${projectName}: ` + JSON.stringify(options, null, 2));
}
function parseNgCompilerOptions(project, host, config) {
    if (!(project instanceof typescript_1.default.server.ConfiguredProject)) {
        return {};
    }
    const { options, errors } = (0, compiler_cli_1.readConfiguration)(project.getConfigFilePath(), 
    /* existingOptions */ undefined, host);
    if (errors.length > 0) {
        project.setProjectErrors(errors);
    }
    // Projects loaded into the Language Service often include test files which are not part of the
    // app's main compilation unit, and these test files often include inline NgModules that declare
    // components from the app. These declarations conflict with the main declarations of such
    // components in the app's NgModules. This conflict is not normally present during regular
    // compilation because the app and the tests are part of separate compilation units.
    //
    // As a temporary mitigation of this problem, we instruct the compiler to ignore classes which
    // are not exported. In many cases, this ensures the test NgModules are ignored by the compiler
    // and only the real component declaration is used.
    options.compileNonExportedClasses = false;
    // If `forceStrictTemplates` is true, always enable `strictTemplates`
    // regardless of its value in tsconfig.json.
    if (config['forceStrictTemplates'] === true) {
        options.strictTemplates = true;
    }
    if (config['enableBlockSyntax'] === false) {
        options['_enableBlockSyntax'] = false;
    }
    if (config['enableLetSyntax'] === false) {
        options['_enableLetSyntax'] = false;
    }
    if (config['enableSelectorless'] === true) {
        options['_enableSelectorless'] = true;
    }
    options['_angularCoreVersion'] = config['angularCoreVersion'];
    return options;
}
function createProgramDriver(project) {
    return {
        supportsInlineOperations: false,
        getProgram() {
            const program = project.getLanguageService().getProgram();
            if (!program) {
                throw new Error('Language service does not have a program!');
            }
            return program;
        },
        updateFiles(contents) {
            for (const [fileName, { newText }] of contents) {
                const scriptInfo = getOrCreateTypeCheckScriptInfo(project, fileName);
                const snapshot = scriptInfo.getSnapshot();
                const length = snapshot.getLength();
                scriptInfo.editContent(0, length, newText);
            }
        },
        getSourceFileVersion(sf) {
            return project.getScriptVersion(sf.fileName);
        },
    };
}
function getOrCreateTypeCheckScriptInfo(project, tcf) {
    // First check if there is already a ScriptInfo for the tcf
    const { projectService } = project;
    let scriptInfo = projectService.getScriptInfo(tcf);
    if (!scriptInfo) {
        // ScriptInfo needs to be opened by client to be able to set its user-defined
        // content. We must also provide file content, otherwise the service will
        // attempt to fetch the content from disk and fail.
        scriptInfo = projectService.getOrCreateScriptInfoForNormalizedPath(typescript_1.default.server.toNormalizedPath(tcf), true, // openedByClient
        '', // fileContent
        // script info added by plugins should be marked as external, see
        // https://github.com/microsoft/TypeScript/blob/b217f22e798c781f55d17da72ed099a9dee5c650/src/compiler/program.ts#L1897-L1899
        typescript_1.default.ScriptKind.External);
        if (!scriptInfo) {
            throw new Error(`Failed to create script info for ${tcf}`);
        }
    }
    // Add ScriptInfo to project if it's missing. A ScriptInfo needs to be part of
    // the project so that it becomes part of the program.
    if (!project.containsScriptInfo(scriptInfo)) {
        project.addRoot(scriptInfo);
    }
    return scriptInfo;
}
function isInTypeCheckContext(program, fileName, position) {
    if (!(0, utils_1.isTypeScriptFile)(fileName)) {
        // If we aren't in a TS file, we must be in an HTML file, which we treat as template context
        return true;
    }
    const node = findTightestNodeAtPosition(program, fileName, position);
    if (node === undefined) {
        return false;
    }
    const assignment = (0, ts_utils_1.getPropertyAssignmentFromValue)(node, 'template');
    if (assignment !== null) {
        return (0, ts_utils_1.getClassDeclFromDecoratorProp)(assignment) !== null;
    }
    return isHostBindingExpression(node);
}
function isHostBindingExpression(node) {
    if (!typescript_1.default.isStringLiteralLike(node)) {
        return false;
    }
    const assignment = closestAncestorNode(node, typescript_1.default.isPropertyAssignment);
    if (assignment === null || assignment.initializer !== node) {
        return false;
    }
    const literal = closestAncestorNode(assignment, typescript_1.default.isObjectLiteralExpression);
    if (literal === null) {
        return false;
    }
    const parentAssignment = (0, ts_utils_1.getPropertyAssignmentFromValue)(literal, 'host');
    if (parentAssignment === null || parentAssignment.initializer !== literal) {
        return false;
    }
    return (0, ts_utils_1.getClassDeclFromDecoratorProp)(parentAssignment) !== null;
}
function closestAncestorNode(start, predicate) {
    let current = start.parent;
    while (current) {
        if (predicate(current)) {
            return current;
        }
        else {
            current = current.parent;
        }
    }
    return null;
}
function isInAngularContext(program, fileName, position) {
    var _a, _b, _c;
    if (!(0, utils_1.isTypeScriptFile)(fileName)) {
        return true;
    }
    const node = findTightestNodeAtPosition(program, fileName, position);
    if (node === undefined) {
        return false;
    }
    if (isHostBindingExpression(node)) {
        return true;
    }
    const assignment = (_c = (_b = (_a = (0, ts_utils_1.getPropertyAssignmentFromValue)(node, 'template')) !== null && _a !== void 0 ? _a : (0, ts_utils_1.getPropertyAssignmentFromValue)(node, 'templateUrl')) !== null && _b !== void 0 ? _b : 
    // `node.parent` is used because the string is a child of an array element and we want to get
    // the property name
    (0, ts_utils_1.getPropertyAssignmentFromValue)(node.parent, 'styleUrls')) !== null && _c !== void 0 ? _c : (0, ts_utils_1.getPropertyAssignmentFromValue)(node, 'styleUrl');
    return assignment !== null && (0, ts_utils_1.getClassDeclFromDecoratorProp)(assignment) !== null;
}
function findTightestNodeAtPosition(program, fileName, position) {
    const sourceFile = program.getSourceFile(fileName);
    if (sourceFile === undefined) {
        return undefined;
    }
    return (0, ts_utils_1.findTightestNode)(sourceFile, position);
}
function getUniqueLocations(locations) {
    const uniqueLocations = new Map();
    for (const location of locations) {
        uniqueLocations.set((0, references_and_rename_utils_1.createLocationKey)(location), location);
    }
    return Array.from(uniqueLocations.values());
}
