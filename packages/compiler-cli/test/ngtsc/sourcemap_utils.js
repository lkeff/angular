"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMappedSegments = getMappedSegments;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const source_map_1 = require("source-map");
class TestSourceFile {
    constructor(url, contents) {
        this.url = url;
        this.contents = contents;
        this.lineStarts = this.getLineStarts();
    }
    getSegment(key, start, end) {
        const startLine = start[key + 'Line'];
        const startCol = start[key + 'Column'];
        const endLine = end[key + 'Line'];
        const endCol = end[key + 'Column'];
        return this.contents.substring(this.lineStarts[startLine - 1] + startCol, this.lineStarts[endLine - 1] + endCol);
    }
    getSourceMapFileName(generatedContents) {
        const match = /\/\/# sourceMappingURL=(.+)/.exec(generatedContents);
        if (!match) {
            throw new Error('Generated contents does not contain a sourceMappingURL');
        }
        return match[1];
    }
    getLineStarts() {
        const lineStarts = [0];
        let currentPos = 0;
        const lines = this.contents.split('\n');
        lines.forEach((line) => {
            currentPos += line.length + 1;
            lineStarts.push(currentPos);
        });
        return lineStarts;
    }
}
/**
 * Process a generated file to extract human understandable segment mappings.
 * These mappings are easier to compare in unit tests that the raw SourceMap mappings.
 * @param env the environment that holds the source and generated files.
 * @param generatedFileName The name of the generated file to process.
 * @returns An array of segment mappings for each mapped segment in the given generated file.
 */
function getMappedSegments(env, generatedFileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const generated = new TestSourceFile(generatedFileName, env.getContents(generatedFileName));
        const sourceMapFileName = generated.getSourceMapFileName(generated.contents);
        const sources = new Map();
        const mappings = [];
        const mapContents = env.getContents(sourceMapFileName);
        const sourceMapConsumer = yield new source_map_1.SourceMapConsumer(JSON.parse(mapContents));
        sourceMapConsumer.eachMapping((item) => {
            if (!sources.has(item.source)) {
                sources.set(item.source, new TestSourceFile(item.source, env.getContents(item.source)));
            }
            mappings.push(item);
        });
        const segments = [];
        let currentMapping = mappings.shift();
        while (currentMapping) {
            const nextMapping = mappings.shift();
            if (nextMapping) {
                const source = sources.get(currentMapping.source);
                const segment = {
                    generated: generated.getSegment('generated', currentMapping, nextMapping),
                    source: source.getSegment('original', currentMapping, nextMapping),
                    sourceUrl: source.url,
                };
                if (segment.generated !== segment.source) {
                    segments.push(segment);
                }
            }
            currentMapping = nextMapping;
        }
        return segments;
    });
}
