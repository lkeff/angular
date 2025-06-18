"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayifyProps = void 0;
const arrayifyProps = (props, parent = null) => Object.entries(props)
    .map(([name, val]) => ({ name, descriptor: val, parent }))
    .sort((a, b) => {
    const parsedA = parseInt(a.name, 10);
    const parsedB = parseInt(b.name, 10);
    if (isNaN(parsedA) || isNaN(parsedB)) {
        return a.name > b.name ? 1 : -1;
    }
    return parsedA - parsedB;
});
exports.arrayifyProps = arrayifyProps;
