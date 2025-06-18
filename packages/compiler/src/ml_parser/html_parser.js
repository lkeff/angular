"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlParser = void 0;
const html_tags_1 = require("./html_tags");
const parser_1 = require("./parser");
class HtmlParser extends parser_1.Parser {
    constructor() {
        super(html_tags_1.getHtmlTagDefinition);
    }
    parse(source, url, options) {
        return super.parse(source, url, options);
    }
}
exports.HtmlParser = HtmlParser;
