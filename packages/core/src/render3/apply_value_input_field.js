"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyValueToInputField = applyValueToInputField;
function applyValueToInputField(instance, inputSignalNode, privateName, value) {
    if (inputSignalNode !== null) {
        inputSignalNode.applyValueToInputSignal(inputSignalNode, value);
    }
    else {
        instance[privateName] = value;
    }
}
