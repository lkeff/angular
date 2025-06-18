"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ɵɵtemplateRefExtractor = ɵɵtemplateRefExtractor;
const template_ref_1 = require("../linker/template_ref");
/**
 * Retrieves `TemplateRef` instance from `Injector` when a local reference is placed on the
 * `<ng-template>` element.
 *
 * @codeGenApi
 */
function ɵɵtemplateRefExtractor(tNode, lView) {
    return (0, template_ref_1.createTemplateRef)(tNode, lView);
}
