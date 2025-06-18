"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputFlags = void 0;
/** Flags describing an input for a directive. */
var InputFlags;
(function (InputFlags) {
    InputFlags[InputFlags["None"] = 0] = "None";
    InputFlags[InputFlags["SignalBased"] = 1] = "SignalBased";
    InputFlags[InputFlags["HasDecoratorInputTransform"] = 2] = "HasDecoratorInputTransform";
})(InputFlags || (exports.InputFlags = InputFlags = {}));
