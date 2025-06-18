"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashManifest = hashManifest;
const sha1_1 = require("./sha1");
function hashManifest(manifest) {
    return (0, sha1_1.sha1)(JSON.stringify(manifest));
}
