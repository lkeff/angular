"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
(0, index_1.main)(process.argv.slice(2))
    .then((exitCode) => (process.exitCode = exitCode))
    .catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
