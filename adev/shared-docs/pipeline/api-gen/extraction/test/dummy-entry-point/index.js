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
class Version {
    constructor(sha = '') {
        this.sha = sha;
    }
}
exports.Version = Version;
exports.VERSION = new Version('123abc');
