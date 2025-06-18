"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵinjectAttribute = ɵɵinjectAttribute;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const di_1 = require("../di");
const state_1 = require("../state");
/**
 * Facade for the attribute injection from DI.
 *
 * @codeGenApi
 */
function ɵɵinjectAttribute(attrNameToInject) {
    return (0, di_1.injectAttributeImpl)((0, state_1.getCurrentTNode)(), attrNameToInject);
}
