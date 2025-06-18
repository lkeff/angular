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
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalPositionFor = originalPositionFor;
exports.extractSourceMap = extractSourceMap;
const source_map_1 = require("source-map");
function originalPositionFor(sourceMap, genPosition) {
    return __awaiter(this, void 0, void 0, function* () {
        // Note: The `SourceMap` type from the compiler is different to `RawSourceMap`
        // from the `source-map` package, but the method we rely on works as expected.
        const smc = yield new source_map_1.SourceMapConsumer(sourceMap);
        // Note: We don't return the original object as it also contains a `name` property
        // which is always null and we don't want to include that in our assertions...
        const { line, column, source } = smc.originalPositionFor(genPosition);
        return { line, column, source };
    });
}
function extractSourceMap(source) {
    let idx = source.lastIndexOf('\n//#');
    if (idx == -1)
        return null;
    const smComment = source.slice(idx).split('\n', 2)[1].trim();
    const smB64 = smComment.split('sourceMappingURL=data:application/json;base64,')[1];
    return smB64 ? JSON.parse(Buffer.from(smB64, 'base64').toString()) : null;
}
