"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDomPropertyOp = createDomPropertyOp;
const enums_1 = require("../enums");
const traits_1 = require("../traits");
const shared_1 = require("./shared");
function createDomPropertyOp(name, expression, isAnimationTrigger, i18nContext, securityContext, sourceSpan) {
    return Object.assign(Object.assign({ kind: enums_1.OpKind.DomProperty, name,
        expression,
        isAnimationTrigger,
        i18nContext,
        securityContext, sanitizer: null, sourceSpan }, traits_1.TRAIT_CONSUMES_VARS), shared_1.NEW_OP);
}
