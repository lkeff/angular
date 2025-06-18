"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtmlGracefully = parseHtmlGracefully;
/**
 * Parses the given HTML content using the Angular compiler. In case the parsing
 * fails, null is being returned.
 */
function parseHtmlGracefully(htmlContent, filePath, compilerModule) {
    try {
        return compilerModule.parseTemplate(htmlContent, filePath).nodes;
    }
    catch (_a) {
        // Do nothing if the template couldn't be parsed. We don't want to throw any
        // exception if a template is syntactically not valid. e.g. template could be
        // using preprocessor syntax.
        return null;
    }
}
