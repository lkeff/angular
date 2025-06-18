"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDirectiveOrComponent = isDirectiveOrComponent;
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
function isDirectiveOrComponent(node, reflector) {
    const decorators = reflector.getDecoratorsOfDeclaration(node);
    if (decorators === null) {
        return false;
    }
    return ((0, annotations_1.getAngularDecorators)(decorators, ['Directive', 'Component'], /* isCore */ false).length > 0);
}
