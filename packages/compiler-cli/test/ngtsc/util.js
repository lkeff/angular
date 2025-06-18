"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClass = getClass;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const reflection_1 = require("../../src/ngtsc/reflection");
function getClass(sf, name) {
    for (const stmt of sf.statements) {
        if ((0, reflection_1.isNamedClassDeclaration)(stmt) && stmt.name.text === name) {
            return stmt;
        }
    }
    throw new Error(`Class ${name} not found in file: ${sf.fileName}: ${sf.text}`);
}
