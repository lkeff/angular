"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAngularPrivateName = isAngularPrivateName;
/** Gets whether a symbol's name indicates it is an Angular-private API. */
function isAngularPrivateName(name) {
    var _a;
    const firstChar = (_a = name[0]) !== null && _a !== void 0 ? _a : '';
    return firstChar === 'ɵ' || firstChar === '_';
}
