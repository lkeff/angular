#!/usr/bin/env node
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
const localize_1 = require("@angular/compiler-cli/private/localize");
const tinyglobby_1 = require("tinyglobby");
const yargs_1 = __importDefault(require("yargs"));
const format_options_1 = require("./translation_files/format_options");
const index_1 = require("./index");
process.title = 'Angular Localization Message Extractor (localize-extract)';
const args = process.argv.slice(2);
const options = (0, yargs_1.default)(args)
    .option('l', {
    alias: 'locale',
    describe: 'The locale of the source being processed',
    default: 'en',
    type: 'string',
})
    .option('r', {
    alias: 'root',
    default: '.',
    describe: 'The root path for other paths provided in these options.\n' +
        'This should either be absolute or relative to the current working directory.',
    type: 'string',
})
    .option('s', {
    alias: 'source',
    required: true,
    describe: 'A glob pattern indicating what files to search for translations, e.g. `./dist/**/*.js`.\n' +
        'This should be relative to the root path.',
    type: 'string',
})
    .option('f', {
    alias: 'format',
    required: true,
    choices: [
        'xmb',
        'xlf',
        'xlif',
        'xliff',
        'xlf2',
        'xlif2',
        'xliff2',
        'json',
        'legacy-migrate',
        'arb',
    ],
    describe: 'The format of the translation file.',
    type: 'string',
})
    .option('formatOptions', {
    describe: 'Additional options to pass to the translation file serializer, in the form of JSON formatted key-value string pairs:\n' +
        'For example: `--formatOptions {"xml:space":"preserve"}.\n' +
        'The meaning of the options is specific to the format being serialized.',
    type: 'string',
})
    .option('o', {
    alias: 'outputPath',
    required: true,
    describe: 'A path to where the translation file will be written. This should be relative to the root path.',
    type: 'string',
})
    .option('loglevel', {
    describe: 'The lowest severity logging message that should be output.',
    choices: ['debug', 'info', 'warn', 'error'],
    type: 'string',
})
    .option('useSourceMaps', {
    type: 'boolean',
    default: true,
    describe: 'Whether to generate source information in the output files by following source-map mappings found in the source files',
})
    .option('useLegacyIds', {
    type: 'boolean',
    default: true,
    describe: 'Whether to use the legacy id format for messages that were extracted from Angular templates.',
})
    .option('d', {
    alias: 'duplicateMessageHandling',
    describe: 'How to handle messages with the same id but different text.',
    choices: ['error', 'warning', 'ignore'],
    default: 'warning',
    type: 'string',
})
    .strict()
    .help()
    .parseSync();
const fileSystem = new localize_1.NodeJSFileSystem();
(0, localize_1.setFileSystem)(fileSystem);
const rootPath = options.r;
const sourceFilePaths = (0, tinyglobby_1.globSync)(options.s, { cwd: rootPath });
const logLevel = options.loglevel;
const logger = new localize_1.ConsoleLogger(logLevel ? localize_1.LogLevel[logLevel] : localize_1.LogLevel.warn);
const duplicateMessageHandling = options.d;
const formatOptions = (0, format_options_1.parseFormatOptions)(options.formatOptions);
const format = options.f;
(0, index_1.extractTranslations)({
    rootPath,
    sourceFilePaths,
    sourceLocale: options.l,
    format,
    outputPath: options.o,
    logger,
    useSourceMaps: options.useSourceMaps,
    useLegacyIds: format === 'legacy-migrate' || options.useLegacyIds,
    duplicateMessageHandling,
    formatOptions,
    fileSystem,
});
