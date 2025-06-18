"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attribute = void 0;
const di_attr_1 = require("../render3/instructions/di_attr");
const decorators_1 = require("../util/decorators");
/**
 * Attribute decorator and metadata.
 *
 * @Annotation
 * @publicApi
 */
exports.Attribute = (0, decorators_1.makeParamDecorator)('Attribute', (attributeName) => ({
    attributeName,
    __NG_ELEMENT_ID__: () => (0, di_attr_1.ɵɵinjectAttribute)(attributeName),
}));
