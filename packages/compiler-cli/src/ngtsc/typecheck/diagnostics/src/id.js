"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeCheckId = getTypeCheckId;
const TYPE_CHECK_ID_MAP = Symbol('TypeCheckId');
function getTypeCheckId(clazz) {
    const sf = clazz.getSourceFile();
    if (sf[TYPE_CHECK_ID_MAP] === undefined) {
        sf[TYPE_CHECK_ID_MAP] = new Map();
    }
    if (sf[TYPE_CHECK_ID_MAP].get(clazz) === undefined) {
        sf[TYPE_CHECK_ID_MAP].set(clazz, `tcb${sf[TYPE_CHECK_ID_MAP].size + 1}`);
    }
    return sf[TYPE_CHECK_ID_MAP].get(clazz);
}
