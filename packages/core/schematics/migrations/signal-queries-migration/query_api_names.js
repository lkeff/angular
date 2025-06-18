"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryFunctionNameToDecorator = queryFunctionNameToDecorator;
/** Converts an initializer query API name to its decorator-equivalent. */
function queryFunctionNameToDecorator(name) {
    if (name === 'viewChild') {
        return 'ViewChild';
    }
    else if (name === 'viewChildren') {
        return 'ViewChildren';
    }
    else if (name === 'contentChild') {
        return 'ContentChild';
    }
    else if (name === 'contentChildren') {
        return 'ContentChildren';
    }
    throw new Error(`Unexpected query function name: ${name}`);
}
