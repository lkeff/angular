"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.findExportedNameOfNode = findExportedNameOfNode;
const typescript_1 = require("../../util/src/typescript");
/**
 * Find the name, if any, by which a node is exported from a given file.
 */
function findExportedNameOfNode(target, file, reflector) {
    const exports = reflector.getExportsOfModule(file);
    if (exports === null) {
        return null;
    }
    const declaredName = (0, typescript_1.isNamedDeclaration)(target) ? target.name.text : null;
    // Look for the export which declares the node.
    let foundExportName = null;
    for (const [exportName, declaration] of exports) {
        if (declaration.node !== target) {
            continue;
        }
        if (exportName === declaredName) {
            // A non-alias export exists which is always preferred, so use that one.
            return exportName;
        }
        foundExportName = exportName;
    }
    return foundExportName;
}
