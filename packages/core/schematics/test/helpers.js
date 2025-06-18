"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dedent = void 0;
const dedent_1 = require("../utils/tsurge/testing/dedent");
/**
 * Template string function that can be used to dedent the resulting
 * string literal. The smallest common indentation will be omitted.
 * Additionally, whitespace in empty lines is removed.
 */
exports.dedent = dedent_1.dedent;
