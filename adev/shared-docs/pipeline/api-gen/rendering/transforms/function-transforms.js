"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionRenderable = getFunctionRenderable;
exports.getFunctionMetadataRenderable = getFunctionMetadataRenderable;
const code_transforms_1 = require("./code-transforms");
const jsdoc_transforms_1 = require("./jsdoc-transforms");
const module_name_1 = require("./module-name");
const params_transforms_1 = require("./params-transforms");
const repo_1 = require("./repo");
/** Given an unprocessed function entry, get the fully renderable function entry. */
function getFunctionRenderable(entry, moduleName, repo) {
    return (0, jsdoc_transforms_1.setEntryFlags)((0, code_transforms_1.addRenderableCodeToc)((0, jsdoc_transforms_1.addHtmlAdditionalLinks)((0, jsdoc_transforms_1.addHtmlUsageNotes)((0, jsdoc_transforms_1.setEntryFlags)((0, jsdoc_transforms_1.addHtmlJsDocTagComments)((0, jsdoc_transforms_1.addHtmlDescription)((0, repo_1.addRepo)((0, module_name_1.addModuleName)(entry, moduleName), repo))))))));
}
function getFunctionMetadataRenderable(entry, moduleName, repo) {
    return (0, jsdoc_transforms_1.addHtmlAdditionalLinks)((0, params_transforms_1.addRenderableFunctionParams)((0, jsdoc_transforms_1.addHtmlUsageNotes)((0, jsdoc_transforms_1.setEntryFlags)((0, jsdoc_transforms_1.addHtmlJsDocTagComments)((0, jsdoc_transforms_1.addHtmlDescription)((0, repo_1.addRepo)((0, module_name_1.addModuleName)(entry, moduleName), repo)))))));
}
