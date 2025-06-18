"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAngularDecorators = getAngularDecorators;
const decorators_1 = require("./typescript/decorators");
/**
 * Gets all decorators which are imported from an Angular package (e.g. "@angular/core")
 * from a list of decorators.
 */
function getAngularDecorators(typeChecker, decorators) {
    return decorators
        .map((node) => ({ node, importData: (0, decorators_1.getCallDecoratorImport)(typeChecker, node) }))
        .filter(({ importData }) => importData && importData.importModule.startsWith('@angular/'))
        .map(({ node, importData }) => ({
        node: node,
        name: importData.name,
        moduleName: importData.importModule,
        importNode: importData.node,
    }));
}
