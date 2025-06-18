"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageExtractor = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const localize_1 = require("@angular/compiler-cli/private/localize");
const core_1 = require("@babel/core");
const es2015_extract_plugin_1 = require("./source_files/es2015_extract_plugin");
const es5_extract_plugin_1 = require("./source_files/es5_extract_plugin");
/**
 * Extracts parsed messages from file contents, by parsing the contents as JavaScript
 * and looking for occurrences of `$localize` in the source code.
 *
 * @publicApi used by CLI
 */
class MessageExtractor {
    constructor(fs, logger, { basePath, useSourceMaps = true, localizeName = '$localize' }) {
        this.fs = fs;
        this.logger = logger;
        this.basePath = basePath;
        this.useSourceMaps = useSourceMaps;
        this.localizeName = localizeName;
        this.loader = new localize_1.SourceFileLoader(this.fs, this.logger, { webpack: basePath });
    }
    extractMessages(filename) {
        const messages = [];
        const sourceCode = this.fs.readFile(this.fs.resolve(this.basePath, filename));
        if (sourceCode.includes(this.localizeName)) {
            // Only bother to parse the file if it contains a reference to `$localize`.
            (0, core_1.transformSync)(sourceCode, {
                sourceRoot: this.basePath,
                filename,
                plugins: [
                    (0, es2015_extract_plugin_1.makeEs2015ExtractPlugin)(this.fs, messages, this.localizeName),
                    (0, es5_extract_plugin_1.makeEs5ExtractPlugin)(this.fs, messages, this.localizeName),
                ],
                code: false,
                ast: false,
            });
            if (this.useSourceMaps && messages.length > 0) {
                this.updateSourceLocations(filename, sourceCode, messages);
            }
        }
        return messages;
    }
    /**
     * Update the location of each message to point to the source-mapped original source location, if
     * available.
     */
    updateSourceLocations(filename, contents, messages) {
        const sourceFile = this.loader.loadSourceFile(this.fs.resolve(this.basePath, filename), contents);
        if (sourceFile === null) {
            return;
        }
        for (const message of messages) {
            if (message.location !== undefined) {
                message.location = this.getOriginalLocation(sourceFile, message.location);
                if (message.messagePartLocations) {
                    message.messagePartLocations = message.messagePartLocations.map((location) => location && this.getOriginalLocation(sourceFile, location));
                }
                if (message.substitutionLocations) {
                    const placeholderNames = Object.keys(message.substitutionLocations);
                    for (const placeholderName of placeholderNames) {
                        const location = message.substitutionLocations[placeholderName];
                        message.substitutionLocations[placeholderName] =
                            location && this.getOriginalLocation(sourceFile, location);
                    }
                }
            }
        }
    }
    /**
     * Find the original location using source-maps if available.
     *
     * @param sourceFile The generated `sourceFile` that contains the `location`.
     * @param location The location within the generated `sourceFile` that needs mapping.
     *
     * @returns A new location that refers to the original source location mapped from the given
     *     `location` in the generated `sourceFile`.
     */
    getOriginalLocation(sourceFile, location) {
        const originalStart = sourceFile.getOriginalLocation(location.start.line, location.start.column);
        if (originalStart === null) {
            return location;
        }
        const originalEnd = sourceFile.getOriginalLocation(location.end.line, location.end.column);
        const start = { line: originalStart.line, column: originalStart.column };
        // We check whether the files are the same, since the returned location can only have a single
        // `file` and it would not make sense to store the end position from a different source file.
        const end = originalEnd !== null && originalEnd.file === originalStart.file
            ? { line: originalEnd.line, column: originalEnd.column }
            : start;
        const originalSourceFile = sourceFile.sources.find((sf) => (sf === null || sf === void 0 ? void 0 : sf.sourcePath) === originalStart.file);
        const startPos = originalSourceFile.startOfLinePositions[start.line] + start.column;
        const endPos = originalSourceFile.startOfLinePositions[end.line] + end.column;
        const text = originalSourceFile.contents.substring(startPos, endPos).trim();
        return { file: originalStart.file, start, end, text };
    }
}
exports.MessageExtractor = MessageExtractor;
