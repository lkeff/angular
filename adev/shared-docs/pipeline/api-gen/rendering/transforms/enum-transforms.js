"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnumRenderable = getEnumRenderable;
const code_transforms_1 = require("./code-transforms");
const jsdoc_transforms_1 = require("./jsdoc-transforms");
const member_transforms_1 = require("./member-transforms");
const module_name_1 = require("./module-name");
const repo_1 = require("./repo");
/** Given an unprocessed enum entry, get the fully renderable enum entry. */
function getEnumRenderable(classEntry, moduleName, repo) {
    return (0, jsdoc_transforms_1.setEntryFlags)((0, code_transforms_1.addRenderableCodeToc)((0, member_transforms_1.addRenderableMembers)((0, jsdoc_transforms_1.addHtmlAdditionalLinks)((0, jsdoc_transforms_1.addHtmlUsageNotes)((0, jsdoc_transforms_1.addHtmlJsDocTagComments)((0, jsdoc_transforms_1.addHtmlDescription)((0, repo_1.addRepo)((0, module_name_1.addModuleName)(classEntry, moduleName), repo))))))));
}
