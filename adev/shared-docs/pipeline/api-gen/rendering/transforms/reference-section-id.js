"use strict";
/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSectionNameToId = void 0;
const convertSectionNameToId = (sectionName) => {
    return sectionName
        .toLowerCase()
        .replace(/\s|\//g, '-') // remove spaces and slashes
        .replace(/[^0-9a-z\-]/g, ''); // only keep letters, digits & dashes
};
exports.convertSectionNameToId = convertSectionNameToId;
