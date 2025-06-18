"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomAdapter = void 0;
exports.getDOM = getDOM;
exports.setRootDomAdapter = setRootDomAdapter;
let _DOM = null;
function getDOM() {
    return _DOM;
}
function setRootDomAdapter(adapter) {
    _DOM !== null && _DOM !== void 0 ? _DOM : (_DOM = adapter);
}
/**
 * Provides DOM operations in an environment-agnostic way.
 *
 * @security Tread carefully! Interacting with the DOM directly is dangerous and
 * can introduce XSS risks.
 */
class DomAdapter {
}
exports.DomAdapter = DomAdapter;
