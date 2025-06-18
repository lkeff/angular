"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.Version = void 0;
/**
 * @description Represents the version of Angular
 *
 * @publicApi
 */
class Version {
    constructor(full) {
        this.full = full;
        const parts = full.split('.');
        this.major = parts[0];
        this.minor = parts[1];
        this.patch = parts.slice(2).join('.');
    }
}
exports.Version = Version;
/**
 * @publicApi
 */
exports.VERSION = new Version('0.0.0-PLACEHOLDER');
