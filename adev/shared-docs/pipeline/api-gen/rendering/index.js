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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const categorization_1 = require("./entities/categorization");
const configuration_1 = require("./marked/configuration");
const processing_1 = require("./processing");
const rendering_1 = require("./rendering");
const shiki_1 = require("./shiki/shiki");
const symbol_context_1 = require("./symbol-context");
/** Parse all JSON data source files into an array of collections. */
function parseEntryData(srcs) {
    return srcs.flatMap((jsonDataFilePath) => {
        var _a;
        const fileContent = (0, fs_1.readFileSync)(jsonDataFilePath, { encoding: 'utf8' });
        const fileContentJson = JSON.parse(fileContent);
        if (fileContentJson.entries) {
            return Object.assign(Object.assign({}, fileContentJson), { symbols: new Map((_a = fileContentJson.symbols) !== null && _a !== void 0 ? _a : []) });
        }
        // CLI subcommands should generate a separate file for each subcommand.
        // We are artificially creating a collection for each subcommand here.
        if (fileContentJson.subcommands) {
            const command = fileContentJson;
            return [
                {
                    repo: 'anglar/cli',
                    moduleName: 'unknown',
                    normalizedModuleName: 'unknown',
                    entries: [fileContentJson],
                    symbols: new Map(),
                },
                ...command.subcommands.map((subCommand) => {
                    return {
                        repo: 'angular/cli',
                        moduleName: 'unknown',
                        normalizedModuleName: 'unknown',
                        entries: [Object.assign(Object.assign({}, subCommand), { parentCommand: command })],
                        symbols: new Map(),
                    };
                }),
            ];
        }
        return {
            repo: 'unknown',
            moduleName: 'unknown',
            normalizedModuleName: 'unknown',
            entries: [fileContentJson], // TODO: fix the typing cli entries aren't DocEntry
            symbols: new Map(),
        };
    });
}
/** Gets a normalized filename for a doc entry. */
function getNormalizedFilename(normalizedModuleName, entry) {
    if ((0, categorization_1.isCliEntry)(entry)) {
        return entry.parentCommand
            ? `${entry.parentCommand.name}/${entry.name}.html`
            : `${entry.name}.html`;
    }
    entry = entry;
    // Append entry type as suffix to prevent writing to file that only differs in casing or query string from already written file.
    // This will lead to a race-condition and corrupted files on case-insensitive file systems.
    return `${normalizedModuleName}_${entry.name}_${entry.entryType.toLowerCase()}.html`;
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, configuration_1.configureMarkedGlobally)();
        // Shiki highlighter needs to be setup in an async context
        yield (0, shiki_1.initHighlighter)();
        const [paramFilePath] = process.argv.slice(2);
        const rawParamLines = (0, fs_1.readFileSync)(paramFilePath, { encoding: 'utf8' }).split('\n');
        const [srcs, outputFilenameExecRootRelativePath] = rawParamLines;
        // TODO: Remove when we are using Bazel v6+
        // On RBE, the output directory is not created properly due to a bug.
        // https://github.com/bazelbuild/bazel/commit/4310aeb36c134e5fc61ed5cdfdf683f3e95f19b7.
        if (!(0, fs_1.existsSync)(outputFilenameExecRootRelativePath)) {
            (0, fs_1.mkdirSync)(outputFilenameExecRootRelativePath, { recursive: true });
        }
        // Docs rendering happens in three phases that occur here:
        // 1) Aggregate all the raw extracted doc info.
        // 2) Transform the raw data to a renderable state.
        // 3) Render to HTML.
        // Parse all the extracted data from the source JSON files.
        // Each file represents one "collection" of docs entries corresponding to
        // a particular JS module name.
        const entryCollections = parseEntryData(srcs.split(','));
        for (const collection of entryCollections) {
            const extractedEntries = collection.entries.filter((entry) => (0, categorization_1.isCliEntry)(entry) || !(0, categorization_1.isHiddenEntry)(entry));
            // Setting the symbols are a global context for the rendering templates of this entry
            (0, symbol_context_1.setSymbols)(collection.symbols);
            const renderableEntries = extractedEntries.map((entry) => {
                (0, symbol_context_1.setCurrentSymbol)(entry.name);
                return (0, processing_1.getRenderable)(entry, collection.moduleName, collection.repo);
            });
            const htmlOutputs = renderableEntries.map(rendering_1.renderEntry);
            for (let i = 0; i < htmlOutputs.length; i++) {
                const filename = getNormalizedFilename(collection.normalizedModuleName, extractedEntries[i]);
                const outputPath = path_1.default.join(outputFilenameExecRootRelativePath, filename);
                // in case the output path is nested, ensure the directory exists
                (0, fs_1.mkdirSync)(path_1.default.parse(outputPath).dir, { recursive: true });
                (0, fs_1.writeFileSync)(outputPath, htmlOutputs[i], { encoding: 'utf8' });
            }
        }
    });
}
main();
