"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlParser = void 0;
const parser_1 = require("./parser");
const xml_tags_1 = require("./xml_tags");
class XmlParser extends parser_1.Parser {
    constructor() {
        super(xml_tags_1.getXmlTagDefinition);
    }
    parse(source, url, options = {}) {
        // Blocks and let declarations aren't supported in an XML context.
        return super.parse(source, url, Object.assign(Object.assign({}, options), { tokenizeBlocks: false, tokenizeLet: false, selectorlessEnabled: false }));
    }
}
exports.XmlParser = XmlParser;
