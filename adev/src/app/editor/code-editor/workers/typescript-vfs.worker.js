"use strict";
/*!
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
/// <reference lib="webworker" />
const typescript_1 = __importDefault(require("typescript"));
const vfs_1 = require("@typescript/vfs");
const rxjs_1 = require("rxjs");
const compiler_opts_1 = require("./utils/compiler-opts");
const ts_constants_1 = require("./utils/ts-constants");
const environment_1 = require("./utils/environment");
/**
 * Web worker uses TypeScript Virtual File System library to enrich code editor functionality i.e. :
 *  - provide autocomplete suggestions
 *  - display errors
 *  - display tooltip with types and documentation
 */
const eventManager = new rxjs_1.Subject();
let languageService;
let env;
let defaultFilesMap = new Map();
let compilerOpts;
let cachedTypingFiles = [];
// Create virtual environment for code editor files.
function createVfsEnv(request) {
    var _a;
    if (env) {
        env.languageService.dispose();
    }
    // merge code editor ts files with default TypeScript libs
    const tutorialFilesMap = (_a = request.data) !== null && _a !== void 0 ? _a : new Map();
    const fileSystemMap = new Map();
    [...tutorialFilesMap, ...defaultFilesMap].forEach(([key, value]) => {
        fileSystemMap.set((0, environment_1.normalizeFileName)(key), (0, environment_1.normalizeFileContent)(value));
    });
    const system = (0, vfs_1.createSystem)(fileSystemMap);
    const entryFiles = Array.from(tutorialFilesMap.keys());
    env = (0, vfs_1.createVirtualTypeScriptEnvironment)(system, entryFiles, typescript_1.default, compilerOpts);
    languageService = env.languageService;
    if (cachedTypingFiles.length > 0)
        defineTypes({ action: "define-types-request" /* TsVfsWorkerActions.DEFINE_TYPES_REQUEST */, data: cachedTypingFiles });
    return { action: "create-vfs-env-response" /* TsVfsWorkerActions.CREATE_VFS_ENV_RESPONSE */ };
}
function updateVfsEnv(request) {
    var _a;
    if (!(env === null || env === void 0 ? void 0 : env.sys))
        return;
    (_a = request.data) === null || _a === void 0 ? void 0 : _a.forEach((value, key) => {
        (0, environment_1.updateOrCreateFile)(env, key, value);
    });
}
// Update content of the file in virtual environment.
function codeChanged(request) {
    if (!request.data || !env)
        return;
    (0, environment_1.updateFile)(env, request.data.file, request.data.code);
    // run diagnostics when code changed
    postMessage(runDiagnostics({
        action: "diagnostics-request" /* TsVfsWorkerActions.DIAGNOSTICS_REQUEST */,
        data: { file: request.data.file },
    }));
}
// Get autocomplete proposal for given position of the file.
function getAutocompleteProposals(request) {
    if (!env) {
        return {
            action: "autocomplete-response" /* TsVfsWorkerActions.AUTOCOMPLETE_RESPONSE */,
            data: [],
        };
    }
    (0, environment_1.updateFile)(env, request.data.file, request.data.content);
    const completions = languageService.getCompletionsAtPosition(request.data.file, request.data.position, ts_constants_1.USER_PREFERENCES, ts_constants_1.FORMAT_CODE_SETTINGS);
    const completionsWithImportSuggestions = completions === null || completions === void 0 ? void 0 : completions.entries.map((entry) => {
        if (entry.source) {
            const entryDetails = languageService.getCompletionEntryDetails(request.data.file, request.data.position, entry.name, ts_constants_1.FORMAT_CODE_SETTINGS, entry.source, ts_constants_1.USER_PREFERENCES, entry.data);
            if (entryDetails === null || entryDetails === void 0 ? void 0 : entryDetails.codeActions) {
                return Object.assign(Object.assign({}, entry), { codeActions: entryDetails === null || entryDetails === void 0 ? void 0 : entryDetails.codeActions });
            }
        }
        return entry;
    });
    return {
        action: "autocomplete-response" /* TsVfsWorkerActions.AUTOCOMPLETE_RESPONSE */,
        data: completionsWithImportSuggestions,
    };
}
// Run diagnostics after file update.
function runDiagnostics(request) {
    var _a, _b, _c;
    if (!(env === null || env === void 0 ? void 0 : env.sys) || !(0, environment_1.fileExists)(env, request.data.file)) {
        return { action: "diagnostics-response" /* TsVfsWorkerActions.DIAGNOSTICS_RESPONSE */, data: [] };
    }
    const syntacticDiagnostics = (_a = languageService === null || languageService === void 0 ? void 0 : languageService.getSyntacticDiagnostics(request.data.file)) !== null && _a !== void 0 ? _a : [];
    const semanticDiagnostic = (_b = languageService === null || languageService === void 0 ? void 0 : languageService.getSemanticDiagnostics(request.data.file)) !== null && _b !== void 0 ? _b : [];
    const suggestionDiagnostics = (_c = languageService === null || languageService === void 0 ? void 0 : languageService.getSuggestionDiagnostics(request.data.file)) !== null && _c !== void 0 ? _c : [];
    const result = [...syntacticDiagnostics, ...semanticDiagnostic, ...suggestionDiagnostics].map((diagnostic) => {
        var _a, _b, _c;
        const lineAndCharacter = diagnostic.file && diagnostic.start
            ? (_a = diagnostic.file) === null || _a === void 0 ? void 0 : _a.getLineAndCharacterOfPosition(diagnostic.start)
            : null;
        const from = diagnostic.start;
        const to = ((_b = diagnostic.start) !== null && _b !== void 0 ? _b : 0) + ((_c = diagnostic.length) !== null && _c !== void 0 ? _c : 0);
        return Object.assign({ from,
            to, message: typescript_1.default.flattenDiagnosticMessageText(diagnostic.messageText, '\n'), source: diagnostic.source, code: diagnostic.code, severity: ['warning', 'error', 'info'][diagnostic.category] }, (lineAndCharacter && {
            lineNumber: lineAndCharacter.line + 1,
            characterPosition: lineAndCharacter.character,
        }));
    });
    return { action: "diagnostics-response" /* TsVfsWorkerActions.DIAGNOSTICS_RESPONSE */, data: result };
}
function defineTypes(request) {
    var _a, _b;
    if (!(env === null || env === void 0 ? void 0 : env.sys) || !((_a = request.data) === null || _a === void 0 ? void 0 : _a.length))
        return;
    for (const { path, content } of request.data) {
        (0, environment_1.updateOrCreateFile)(env, path, content);
    }
    cachedTypingFiles = (_b = request.data) !== null && _b !== void 0 ? _b : [];
}
function displayTooltip(request) {
    var _a, _b, _c;
    if (!languageService) {
        return {
            action: "display-tooltip-response" /* TsVfsWorkerActions.DISPLAY_TOOLTIP_RESPONSE */,
            data: {
                tags: null,
                displayParts: null,
                documentation: null,
            },
        };
    }
    const result = languageService.getQuickInfoAtPosition(request.data.file, request.data.position);
    if (!result) {
        return {
            action: "display-tooltip-response" /* TsVfsWorkerActions.DISPLAY_TOOLTIP_RESPONSE */,
            data: {
                tags: null,
                displayParts: null,
                documentation: null,
            },
        };
    }
    return {
        action: "display-tooltip-response" /* TsVfsWorkerActions.DISPLAY_TOOLTIP_RESPONSE */,
        data: {
            tags: (_a = result.tags) !== null && _a !== void 0 ? _a : null,
            displayParts: (_b = result.displayParts) !== null && _b !== void 0 ? _b : null,
            documentation: (_c = result.documentation) !== null && _c !== void 0 ? _c : null,
        },
    };
}
// Strategy defines what function needs to be triggered for given request.
const triggerActionStrategy = {
    ["create-vfs-env-request" /* TsVfsWorkerActions.CREATE_VFS_ENV_REQUEST */]: (request) => createVfsEnv(request),
    ["update-vfs-env-request" /* TsVfsWorkerActions.UPDATE_VFS_ENV_REQUEST */]: (request) => updateVfsEnv(request),
    ["code-changed" /* TsVfsWorkerActions.CODE_CHANGED */]: (request) => codeChanged(request),
    ["autocomplete-request" /* TsVfsWorkerActions.AUTOCOMPLETE_REQUEST */]: (request) => getAutocompleteProposals(request),
    ["diagnostics-request" /* TsVfsWorkerActions.DIAGNOSTICS_REQUEST */]: (request) => runDiagnostics(request),
    ["define-types-request" /* TsVfsWorkerActions.DEFINE_TYPES_REQUEST */]: (request) => defineTypes(request),
    ["display-tooltip-request" /* TsVfsWorkerActions.DISPLAY_TOOLTIP_REQUEST */]: (request) => displayTooltip(request),
};
const bootstrapWorker = () => __awaiter(void 0, void 0, void 0, function* () {
    const sendResponse = (message) => {
        postMessage(message);
    };
    compilerOpts = (0, compiler_opts_1.getCompilerOpts)(typescript_1.default);
    defaultFilesMap = yield (0, vfs_1.createDefaultMapFromCDN)(compilerOpts, typescript_1.default.version, false, typescript_1.default);
    sendResponse({ action: "default-fs-ready" /* TsVfsWorkerActions.INIT_DEFAULT_FILE_SYSTEM_MAP */ });
    eventManager.subscribe((request) => {
        const response = triggerActionStrategy[request.action](request);
        if (response) {
            sendResponse(response);
        }
    });
});
addEventListener('message', ({ data }) => {
    eventManager.next(data);
});
// Initialize worker, create on init TypeScript Virtual Environment and setup listeners for action i.e. run diagnostics, autocomplete etc.
Promise.resolve(bootstrapWorker());
