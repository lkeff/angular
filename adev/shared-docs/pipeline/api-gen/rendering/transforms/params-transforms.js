"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRenderableFunctionParams = addRenderableFunctionParams;
const jsdoc_transforms_1 = require("./jsdoc-transforms");
const module_name_1 = require("./module-name");
function addRenderableFunctionParams(entry) {
    const params = entry.params.map((param) => (0, jsdoc_transforms_1.addHtmlDescription)((0, module_name_1.addModuleName)(param, entry.moduleName)));
    return Object.assign(Object.assign({}, entry), { params });
}
