"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.attemptRetrieveInputFromSymbol = attemptRetrieveInputFromSymbol;
const input_node_1 = require("../input_detection/input_node");
const input_id_1 = require("../utils/input_id");
/**
 * Attempts to resolve the known `@Input` metadata for the given
 * type checking symbol. Returns `null` if it's not for an input.
 */
function attemptRetrieveInputFromSymbol(programInfo, memberSymbol, knownInputs) {
    var _a;
    // Even for declared classes from `.d.ts`, the value declaration
    // should exist and point to the property declaration.
    if (memberSymbol.valueDeclaration !== undefined &&
        (0, input_node_1.isInputContainerNode)(memberSymbol.valueDeclaration)) {
        const member = memberSymbol.valueDeclaration;
        // If the member itself is an input that is being migrated, we
        // do not need to check, as overriding would be fine then— like before.
        const memberInputDescr = (0, input_node_1.isInputContainerNode)(member)
            ? (0, input_id_1.getInputDescriptor)(programInfo, member)
            : null;
        return memberInputDescr !== null ? ((_a = knownInputs.get(memberInputDescr)) !== null && _a !== void 0 ? _a : null) : null;
    }
    return null;
}
