"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
const marked_1 = require("marked");
const link_1 = require("./tranformations/link");
const table_1 = require("./tranformations/table");
const list_1 = require("./tranformations/list");
const image_1 = require("./tranformations/image");
const text_1 = require("./tranformations/text");
const heading_1 = require("./tranformations/heading");
/**
 * Custom renderer for marked that will be used to transform markdown files to HTML
 * files that can be used in the Angular docs.
 */
class Renderer extends marked_1.Renderer {
    constructor() {
        super(...arguments);
        this.link = link_1.linkRender;
        this.table = table_1.tableRender;
        this.list = list_1.listRender;
        this.image = image_1.imageRender;
        this.text = text_1.textRender;
        this.heading = heading_1.headingRender;
    }
}
exports.Renderer = Renderer;
