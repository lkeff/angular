"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = exports.MODULE_NAME_PREFIX = exports.API_PREFIX = void 0;
exports.getLinkToModule = getLinkToModule;
exports.API_PREFIX = 'api';
exports.MODULE_NAME_PREFIX = '@angular/';
function getLinkToModule(moduleName, symbol, subSymbol) {
    return `/${exports.API_PREFIX}/${moduleName}/${symbol}${subSymbol ? `#${subSymbol}` : ''}`;
}
const normalizePath = (path) => {
    if (path[0] === '/') {
        return path.substring(1);
    }
    return path;
};
exports.normalizePath = normalizePath;
