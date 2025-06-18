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
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const parse_1 = require("./parse");
const highlight_1 = require("./extensions/docs-code/format/highlight");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [paramFilePath] = process.argv.slice(2);
        const rawParamLines = (0, fs_1.readFileSync)(paramFilePath, { encoding: 'utf8' }).split('\n');
        const [srcs, outputFilenameExecRootRelativePath] = rawParamLines;
        // The highlighter needs to be setup asynchronously
        // so we're doing it at the start of the pipeline
        yield (0, highlight_1.initHighlighter)();
        for (const filePath of srcs.split(',')) {
            if (!filePath.endsWith('.md')) {
                throw new Error(`Input file "${filePath}" does not end in a ".md" file extension.`);
            }
            const markdownContent = (0, fs_1.readFileSync)(filePath, { encoding: 'utf8' });
            const htmlOutputContent = yield (0, parse_1.parseMarkdown)(markdownContent, { markdownFilePath: filePath });
            // The expected file name structure is the [name of the file].md.html.
            const htmlFileName = filePath + '.html';
            const htmlOutputPath = path_1.default.join(outputFilenameExecRootRelativePath, htmlFileName);
            (0, fs_1.writeFileSync)(htmlOutputPath, htmlOutputContent, { encoding: 'utf8' });
        }
    });
}
main();
