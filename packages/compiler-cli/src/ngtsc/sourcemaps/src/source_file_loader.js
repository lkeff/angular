"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileLoader = void 0;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const convert_source_map_1 = __importDefault(require("convert-source-map"));
const content_origin_1 = require("./content_origin");
const source_file_1 = require("./source_file");
const SCHEME_MATCHER = /^([a-z][a-z0-9.-]*):\/\//i;
/**
 * This class can be used to load a source file, its associated source map and any upstream sources.
 *
 * Since a source file might reference (or include) a source map, this class can load those too.
 * Since a source map might reference other source files, these are also loaded as needed.
 *
 * This is done recursively. The result is a "tree" of `SourceFile` objects, each containing
 * mappings to other `SourceFile` objects as necessary.
 */
class SourceFileLoader {
    constructor(fs, logger, 
    /** A map of URL schemes to base paths. The scheme name should be lowercase. */
    schemeMap) {
        this.fs = fs;
        this.logger = logger;
        this.schemeMap = schemeMap;
        this.currentPaths = [];
    }
    loadSourceFile(sourcePath, contents = null, mapAndPath = null) {
        const contentsOrigin = contents !== null ? content_origin_1.ContentOrigin.Provided : content_origin_1.ContentOrigin.FileSystem;
        const sourceMapInfo = mapAndPath && Object.assign({ origin: content_origin_1.ContentOrigin.Provided }, mapAndPath);
        return this.loadSourceFileInternal(sourcePath, contents, contentsOrigin, sourceMapInfo);
    }
    /**
     * The overload used internally to load source files referenced in a source-map.
     *
     * In this case there is no guarantee that it will return a non-null SourceMap.
     *
     * @param sourcePath The path to the source file to load.
     * @param contents The contents of the source file to load, if provided inline. If `null`,
     *     the contents will be read from the file at the `sourcePath`.
     * @param sourceOrigin Describes where the source content came from.
     * @param sourceMapInfo The raw contents and path of the source-map file. If `null` the
     *     source-map will be computed from the contents of the source file, either inline or loaded
     *     from the file-system.
     *
     * @returns a SourceFile if the content for one was provided or was able to be loaded from disk,
     * `null` otherwise.
     */
    loadSourceFileInternal(sourcePath, contents, sourceOrigin, sourceMapInfo) {
        const previousPaths = this.currentPaths.slice();
        try {
            if (contents === null) {
                if (!this.fs.exists(sourcePath)) {
                    return null;
                }
                contents = this.readSourceFile(sourcePath);
            }
            // If not provided try to load the source map based on the source itself
            if (sourceMapInfo === null) {
                sourceMapInfo = this.loadSourceMap(sourcePath, contents, sourceOrigin);
            }
            let sources = [];
            if (sourceMapInfo !== null) {
                const basePath = sourceMapInfo.mapPath || sourcePath;
                sources = this.processSources(basePath, sourceMapInfo);
            }
            return new source_file_1.SourceFile(sourcePath, contents, sourceMapInfo, sources, this.fs);
        }
        catch (e) {
            this.logger.warn(`Unable to fully load ${sourcePath} for source-map flattening: ${e.message}`);
            return null;
        }
        finally {
            // We are finished with this recursion so revert the paths being tracked
            this.currentPaths = previousPaths;
        }
    }
    /**
     * Find the source map associated with the source file whose `sourcePath` and `contents` are
     * provided.
     *
     * Source maps can be inline, as part of a base64 encoded comment, or external as a separate file
     * whose path is indicated in a comment or implied from the name of the source file itself.
     *
     * @param sourcePath the path to the source file.
     * @param sourceContents the contents of the source file.
     * @param sourceOrigin where the content of the source file came from.
     * @returns the parsed contents and path of the source-map, if loading was successful, null
     *     otherwise.
     */
    loadSourceMap(sourcePath, sourceContents, sourceOrigin) {
        // Only consider a source-map comment from the last non-empty line of the file, in case there
        // are embedded source-map comments elsewhere in the file (as can be the case with bundlers like
        // webpack).
        const lastLine = this.getLastNonEmptyLine(sourceContents);
        const inline = convert_source_map_1.default.commentRegex.exec(lastLine);
        if (inline !== null) {
            return {
                map: convert_source_map_1.default.fromComment(inline.pop()).sourcemap,
                mapPath: null,
                origin: content_origin_1.ContentOrigin.Inline,
            };
        }
        if (sourceOrigin === content_origin_1.ContentOrigin.Inline) {
            // The source file was provided inline and its contents did not include an inline source-map.
            // So we don't try to load an external source-map from the file-system, since this can lead to
            // invalid circular dependencies.
            return null;
        }
        const external = convert_source_map_1.default.mapFileCommentRegex.exec(lastLine);
        if (external) {
            try {
                const fileName = external[1] || external[2];
                const externalMapPath = this.fs.resolve(this.fs.dirname(sourcePath), fileName);
                return {
                    map: this.readRawSourceMap(externalMapPath),
                    mapPath: externalMapPath,
                    origin: content_origin_1.ContentOrigin.FileSystem,
                };
            }
            catch (e) {
                this.logger.warn(`Unable to fully load ${sourcePath} for source-map flattening: ${e.message}`);
                return null;
            }
        }
        const impliedMapPath = this.fs.resolve(sourcePath + '.map');
        if (this.fs.exists(impliedMapPath)) {
            return {
                map: this.readRawSourceMap(impliedMapPath),
                mapPath: impliedMapPath,
                origin: content_origin_1.ContentOrigin.FileSystem,
            };
        }
        return null;
    }
    /**
     * Iterate over each of the "sources" for this source file's source map, recursively loading each
     * source file and its associated source map.
     */
    processSources(basePath, { map, origin: sourceMapOrigin }) {
        const sourceRoot = this.fs.resolve(this.fs.dirname(basePath), this.replaceSchemeWithPath(map.sourceRoot || ''));
        return map.sources.map((source, index) => {
            const path = this.fs.resolve(sourceRoot, this.replaceSchemeWithPath(source));
            const content = (map.sourcesContent && map.sourcesContent[index]) || null;
            // The origin of this source file is "inline" if we extracted it from the source-map's
            // `sourcesContent`, except when the source-map itself was "provided" in-memory.
            // An inline source file is treated as if it were from the file-system if the source-map that
            // contains it was provided in-memory. The first call to `loadSourceFile()` is special in that
            // if you "provide" the contents of the source-map in-memory then we don't want to block
            // loading sources from the file-system just because this source-map had an inline source.
            const sourceOrigin = content !== null && sourceMapOrigin !== content_origin_1.ContentOrigin.Provided
                ? content_origin_1.ContentOrigin.Inline
                : content_origin_1.ContentOrigin.FileSystem;
            return this.loadSourceFileInternal(path, content, sourceOrigin, null);
        });
    }
    /**
     * Load the contents of the source file from disk.
     *
     * @param sourcePath The path to the source file.
     */
    readSourceFile(sourcePath) {
        this.trackPath(sourcePath);
        return this.fs.readFile(sourcePath);
    }
    /**
     * Load the source map from the file at `mapPath`, parsing its JSON contents into a `RawSourceMap`
     * object.
     *
     * @param mapPath The path to the source-map file.
     */
    readRawSourceMap(mapPath) {
        this.trackPath(mapPath);
        return JSON.parse(this.fs.readFile(mapPath));
    }
    /**
     * Track source file paths if we have loaded them from disk so that we don't get into an infinite
     * recursion.
     */
    trackPath(path) {
        if (this.currentPaths.includes(path)) {
            throw new Error(`Circular source file mapping dependency: ${this.currentPaths.join(' -> ')} -> ${path}`);
        }
        this.currentPaths.push(path);
    }
    getLastNonEmptyLine(contents) {
        let trailingWhitespaceIndex = contents.length - 1;
        while (trailingWhitespaceIndex > 0 &&
            (contents[trailingWhitespaceIndex] === '\n' || contents[trailingWhitespaceIndex] === '\r')) {
            trailingWhitespaceIndex--;
        }
        let lastRealLineIndex = contents.lastIndexOf('\n', trailingWhitespaceIndex - 1);
        if (lastRealLineIndex === -1) {
            lastRealLineIndex = 0;
        }
        return contents.slice(lastRealLineIndex + 1);
    }
    /**
     * Replace any matched URL schemes with their corresponding path held in the schemeMap.
     *
     * Some build tools replace real file paths with scheme prefixed paths - e.g. `webpack://`.
     * We use the `schemeMap` passed to this class to convert such paths to "real" file paths.
     * In some cases, this is not possible, since the file was actually synthesized by the build tool.
     * But the end result is better than prefixing the sourceRoot in front of the scheme.
     */
    replaceSchemeWithPath(path) {
        return path.replace(SCHEME_MATCHER, (_, scheme) => this.schemeMap[scheme.toLowerCase()] || '');
    }
}
exports.SourceFileLoader = SourceFileLoader;
