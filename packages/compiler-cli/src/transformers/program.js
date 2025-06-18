"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProgram = createProgram;
const program_1 = require("../ngtsc/program");
function createProgram({ rootNames, options, host, oldProgram, }) {
    return new program_1.NgtscProgram(rootNames, options, host, oldProgram);
}
