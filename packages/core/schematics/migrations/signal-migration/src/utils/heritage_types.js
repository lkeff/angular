"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInheritedTypes = getInheritedTypes;
/** Gets all types that are inherited (implemented or extended). */
function getInheritedTypes(node, checker) {
    if (node.heritageClauses === undefined) {
        return [];
    }
    const heritageTypes = [];
    for (const heritageClause of node.heritageClauses) {
        for (const typeNode of heritageClause.types) {
            heritageTypes.push(checker.getTypeFromTypeNode(typeNode));
        }
    }
    return heritageTypes;
}
