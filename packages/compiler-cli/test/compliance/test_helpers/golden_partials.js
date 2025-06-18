"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderGoldenPartial = renderGoldenPartial;
exports.parseGoldenPartial = parseGoldenPartial;
const headerStart = '/****************************************************************************************************\n' +
    ' * PARTIAL FILE: ';
const headerEnd = '\n ****************************************************************************************************/\n';
/**
 * Render the partially compiled files into a single golden partial output string.
 *
 * @param files The partially compiled files to be rendered.
 */
function renderGoldenPartial(files) {
    return files.map((file) => `${headerStart + file.path + headerEnd}${file.content}`).join('\n');
}
/**
 * Parse the `partialContent` into a set of partially compiled files.
 *
 * The `partialContent` is a single string that can contains multiple files.
 * Each file is delimited by a header comment that also contains its original path.
 *
 * @param partialContent The partial content to parse.
 */
function parseGoldenPartial(partialContent) {
    const files = [];
    const partials = partialContent.split(headerStart);
    for (const partial of partials) {
        const [path, content] = partial.split(headerEnd);
        if (path) {
            files.push({ path, content });
        }
    }
    return files;
}
