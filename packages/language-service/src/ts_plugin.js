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
exports.create = create;
exports.getExternalFiles = getExternalFiles;
exports.initialize = initialize;
const typescript_1 = __importDefault(require("typescript"));
const api_1 = require("../api");
const language_service_1 = require("./language_service");
const utils_1 = require("./utils");
function create(info) {
    const { project, languageService, config } = info;
    const tsLS = (0, api_1.isNgLanguageService)(languageService)
        ? languageService.getTypescriptLanguageService()
        : languageService;
    const angularOnly = (config === null || config === void 0 ? void 0 : config.angularOnly) === true;
    const ngLS = new language_service_1.LanguageService(project, tsLS, config);
    function getSyntacticDiagnostics(fileName) {
        if (!angularOnly && (0, utils_1.isTypeScriptFile)(fileName)) {
            return tsLS.getSyntacticDiagnostics(fileName);
        }
        // Template files do not currently produce separate syntactic diagnostics and
        // are instead produced during the semantic diagnostic analysis.
        return [];
    }
    function getSuggestionDiagnostics(fileName) {
        if (!angularOnly && (0, utils_1.isTypeScriptFile)(fileName)) {
            return tsLS.getSuggestionDiagnostics(fileName);
        }
        // Template files do not currently produce separate suggestion diagnostics
        return [];
    }
    function getSemanticDiagnostics(fileName) {
        const diagnostics = [];
        if (!angularOnly && (0, utils_1.isTypeScriptFile)(fileName)) {
            diagnostics.push(...tsLS.getSemanticDiagnostics(fileName));
        }
        diagnostics.push(...ngLS.getSemanticDiagnostics(fileName));
        return diagnostics;
    }
    function getQuickInfoAtPosition(fileName, position) {
        var _a;
        if (angularOnly || !(0, utils_1.isTypeScriptFile)(fileName)) {
            return ngLS.getQuickInfoAtPosition(fileName, position);
        }
        else {
            // If TS could answer the query, then return that result. Otherwise, return from Angular LS.
            return ((_a = tsLS.getQuickInfoAtPosition(fileName, position)) !== null && _a !== void 0 ? _a : ngLS.getQuickInfoAtPosition(fileName, position));
        }
    }
    function getTypeDefinitionAtPosition(fileName, position) {
        var _a;
        if (angularOnly || !(0, utils_1.isTypeScriptFile)(fileName)) {
            return ngLS.getTypeDefinitionAtPosition(fileName, position);
        }
        else {
            // If TS could answer the query, then return that result. Otherwise, return from Angular LS.
            return ((_a = tsLS.getTypeDefinitionAtPosition(fileName, position)) !== null && _a !== void 0 ? _a : ngLS.getTypeDefinitionAtPosition(fileName, position));
        }
    }
    function getDefinitionAndBoundSpan(fileName, position) {
        var _a;
        if (angularOnly || !(0, utils_1.isTypeScriptFile)(fileName)) {
            return ngLS.getDefinitionAndBoundSpan(fileName, position);
        }
        else {
            // If TS could answer the query, then return that result. Otherwise, return from Angular LS.
            return ((_a = tsLS.getDefinitionAndBoundSpan(fileName, position)) !== null && _a !== void 0 ? _a : ngLS.getDefinitionAndBoundSpan(fileName, position));
        }
    }
    function getDefinitionAtPosition(fileName, position) {
        var _a;
        return (_a = getDefinitionAndBoundSpan(fileName, position)) === null || _a === void 0 ? void 0 : _a.definitions;
    }
    function getReferencesAtPosition(fileName, position) {
        return ngLS.getReferencesAtPosition(fileName, position);
    }
    function findRenameLocations(fileName, position) {
        // Most operations combine results from all extensions. However, rename locations are exclusive
        // (results from only one extension are used) so our rename locations are a superset of the TS
        // rename locations. As a result, we do not check the `angularOnly` flag here because we always
        // want to include results at TS locations as well as locations in templates.
        return ngLS.findRenameLocations(fileName, position);
    }
    function getRenameInfo(fileName, position) {
        // See the comment in `findRenameLocations` explaining why we don't check the `angularOnly`
        // flag.
        return ngLS.getRenameInfo(fileName, position);
    }
    function getCompletionsAtPosition(fileName, position, options) {
        var _a;
        if (angularOnly || !(0, utils_1.isTypeScriptFile)(fileName)) {
            return ngLS.getCompletionsAtPosition(fileName, position, options);
        }
        else {
            // If TS could answer the query, then return that result. Otherwise, return from Angular LS.
            return ((_a = tsLS.getCompletionsAtPosition(fileName, position, options)) !== null && _a !== void 0 ? _a : ngLS.getCompletionsAtPosition(fileName, position, options));
        }
    }
    function getCompletionEntryDetails(fileName, position, entryName, formatOptions, source, preferences, data) {
        var _a;
        if (angularOnly || !(0, utils_1.isTypeScriptFile)(fileName)) {
            return ngLS.getCompletionEntryDetails(fileName, position, entryName, formatOptions, preferences, data);
        }
        else {
            // If TS could answer the query, then return that result. Otherwise, return from Angular LS.
            return ((_a = tsLS.getCompletionEntryDetails(fileName, position, entryName, formatOptions, source, preferences, data)) !== null && _a !== void 0 ? _a : ngLS.getCompletionEntryDetails(fileName, position, entryName, formatOptions, preferences, data));
        }
    }
    function getCompletionEntrySymbol(fileName, position, name, source) {
        var _a;
        if (angularOnly || !(0, utils_1.isTypeScriptFile)(fileName)) {
            return ngLS.getCompletionEntrySymbol(fileName, position, name);
        }
        else {
            // If TS could answer the query, then return that result. Otherwise, return from Angular LS.
            return ((_a = tsLS.getCompletionEntrySymbol(fileName, position, name, source)) !== null && _a !== void 0 ? _a : ngLS.getCompletionEntrySymbol(fileName, position, name));
        }
    }
    /**
     * Gets global diagnostics related to the program configuration and compiler options.
     */
    function getCompilerOptionsDiagnostics() {
        const diagnostics = [];
        if (!angularOnly) {
            diagnostics.push(...tsLS.getCompilerOptionsDiagnostics());
        }
        diagnostics.push(...ngLS.getCompilerOptionsDiagnostics());
        return diagnostics;
    }
    function getSignatureHelpItems(fileName, position, options) {
        var _a;
        if (angularOnly || !(0, utils_1.isTypeScriptFile)(fileName)) {
            return ngLS.getSignatureHelpItems(fileName, position, options);
        }
        else {
            return ((_a = tsLS.getSignatureHelpItems(fileName, position, options)) !== null && _a !== void 0 ? _a : ngLS.getSignatureHelpItems(fileName, position, options));
        }
    }
    function getOutliningSpans(fileName) {
        var _a;
        if (angularOnly || !(0, utils_1.isTypeScriptFile)(fileName)) {
            return ngLS.getOutliningSpans(fileName);
        }
        else {
            return (_a = tsLS.getOutliningSpans(fileName)) !== null && _a !== void 0 ? _a : ngLS.getOutliningSpans(fileName);
        }
    }
    function getTcb(fileName, position) {
        return ngLS.getTcb(fileName, position);
    }
    /**
     * Given an external template, finds the associated components that use it as a `templateUrl`.
     */
    function getComponentLocationsForTemplate(fileName) {
        return ngLS.getComponentLocationsForTemplate(fileName);
    }
    /**
     * Given a location inside a component, finds the location of the inline template or the file for
     * the `templateUrl`.
     */
    function getTemplateLocationForComponent(fileName, position) {
        return ngLS.getTemplateLocationForComponent(fileName, position);
    }
    function getApplicableRefactors(fileName, positionOrRange) {
        // We never forward to TS for refactors because those are not handled
        // properly by the LSP server implementation of the extension. The extension
        // will only take care of refactorings from Angular language service.
        // Code actions are tied to their provider, so this is unproblematic and will
        // not hide built-in TypeScript refactorings:
        // https://github.com/microsoft/vscode/blob/ea4d99921cc790d49194e897021faee02a1847f7/src/vs/editor/contrib/codeAction/codeAction.ts#L30-L31
        return ngLS.getPossibleRefactorings(fileName, positionOrRange);
    }
    function applyRefactoring(fileName, positionOrRange, refactorName, reportProgress) {
        return ngLS.applyRefactoring(fileName, positionOrRange, refactorName, reportProgress);
    }
    function getCodeFixesAtPosition(fileName, start, end, errorCodes, formatOptions, preferences) {
        if (angularOnly || !(0, utils_1.isTypeScriptFile)(fileName)) {
            return ngLS.getCodeFixesAtPosition(fileName, start, end, errorCodes, formatOptions, preferences);
        }
        else {
            const tsLsCodeFixes = tsLS.getCodeFixesAtPosition(fileName, start, end, errorCodes, formatOptions, preferences);
            // If TS could answer the query, then return that result. Otherwise, return from Angular LS.
            return tsLsCodeFixes.length > 0
                ? tsLsCodeFixes
                : ngLS.getCodeFixesAtPosition(fileName, start, end, errorCodes, formatOptions, preferences);
        }
    }
    function getCombinedCodeFix(scope, fixId, formatOptions, preferences) {
        if (angularOnly) {
            return ngLS.getCombinedCodeFix(scope, fixId, formatOptions, preferences);
        }
        else {
            const tsLsCombinedCodeFix = tsLS.getCombinedCodeFix(scope, fixId, formatOptions, preferences);
            // If TS could answer the query, then return that result. Otherwise, return from Angular LS.
            return tsLsCombinedCodeFix.changes.length > 0
                ? tsLsCombinedCodeFix
                : ngLS.getCombinedCodeFix(scope, fixId, formatOptions, preferences);
        }
    }
    function getTypescriptLanguageService() {
        return tsLS;
    }
    return Object.assign(Object.assign({}, tsLS), { getSyntacticDiagnostics,
        getSemanticDiagnostics,
        getSuggestionDiagnostics,
        getTypeDefinitionAtPosition,
        getQuickInfoAtPosition,
        getDefinitionAtPosition,
        getDefinitionAndBoundSpan,
        getReferencesAtPosition,
        findRenameLocations,
        getRenameInfo,
        getCompletionsAtPosition,
        getCompletionEntryDetails,
        getCompletionEntrySymbol,
        getTcb,
        getCompilerOptionsDiagnostics,
        getComponentLocationsForTemplate,
        getSignatureHelpItems,
        getOutliningSpans,
        getTemplateLocationForComponent, hasCodeFixesForErrorCode: ngLS.hasCodeFixesForErrorCode.bind(ngLS), getCodeFixesAtPosition,
        getCombinedCodeFix,
        getTypescriptLanguageService,
        getApplicableRefactors,
        applyRefactoring });
}
function getExternalFiles(project) {
    if (!project.hasRoots()) {
        return []; // project has not been initialized
    }
    const typecheckFiles = [];
    const resourceFiles = [];
    for (const scriptInfo of project.getScriptInfos()) {
        if (scriptInfo.scriptKind === typescript_1.default.ScriptKind.External) {
            // script info for typecheck file is marked as external, see
            // getOrCreateTypeCheckScriptInfo() in
            // packages/language-service/src/language_service.ts
            typecheckFiles.push(scriptInfo.fileName);
        }
        if (scriptInfo.scriptKind === typescript_1.default.ScriptKind.Unknown) {
            // script info for resource file is marked as unknown.
            // Including these as external files is necessary because otherwise they will get removed from
            // the project when `updateNonInferredProjectFiles` is called as part of the
            // `updateProjectIfDirty` cycle.
            // https://sourcegraph.com/github.com/microsoft/TypeScript@c300fea3250abd7f75920d95a58d9e742ac730ee/-/blob/src/server/editorServices.ts?L2363
            resourceFiles.push(scriptInfo.fileName);
        }
    }
    return [...typecheckFiles, ...resourceFiles];
}
/** Implementation of a ts.server.PluginModuleFactory */
function initialize(mod) {
    return {
        create,
        getExternalFiles,
    };
}
