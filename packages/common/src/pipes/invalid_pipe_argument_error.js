"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidPipeArgumentError = invalidPipeArgumentError;
const core_1 = require("@angular/core");
function invalidPipeArgumentError(type, value) {
    return new core_1.ɵRuntimeError(2100 /* RuntimeErrorCode.INVALID_PIPE_ARGUMENT */, ngDevMode && `InvalidPipeArgument: '${value}' for pipe '${(0, core_1.ɵstringify)(type)}'`);
}
