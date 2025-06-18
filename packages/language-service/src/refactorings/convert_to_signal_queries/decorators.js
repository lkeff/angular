"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDecoratorQueryClassField = isDecoratorQueryClassField;
exports.isDirectiveOrComponentWithQueries = isDirectiveOrComponentWithQueries;
const annotations_1 = require("@angular/compiler-cli/src/ngtsc/annotations");
const decorators_1 = require("../../utils/decorators");
function isDecoratorQueryClassField(node, reflector) {
    const decorators = reflector.getDecoratorsOfDeclaration(node);
    if (decorators === null) {
        return false;
    }
    return ((0, annotations_1.getAngularDecorators)(decorators, ['ViewChild', 'ViewChildren', 'ContentChild', 'ContentChildren'], 
    /* isCore */ false).length > 0);
}
function isDirectiveOrComponentWithQueries(node, reflector) {
    if (!(0, decorators_1.isDirectiveOrComponent)(node, reflector)) {
        return false;
    }
    return node.members.some((m) => isDecoratorQueryClassField(m, reflector));
}
