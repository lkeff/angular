"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectiveInfo = void 0;
/**
 * Class that holds information about a given directive and its input fields.
 */
class DirectiveInfo {
    constructor(clazz) {
        this.clazz = clazz;
        /**
         * Map of inputs detected in the given class.
         * Maps string-based input ids to the detailed input metadata.
         */
        this.inputFields = new Map();
        /** Map of input IDs and their incompatibilities. */
        this.memberIncompatibility = new Map();
        /**
         * Whether the whole class is incompatible.
         *
         * Class incompatibility precedes individual member incompatibility.
         * All members in the class are considered incompatible.
         */
        this.incompatible = null;
    }
    /**
     * Checks whether there are any migrated inputs for the
     * given class.
     *
     * Returns `false` if all inputs are incompatible.
     */
    hasMigratedFields() {
        return Array.from(this.inputFields.values()).some(({ descriptor }) => !this.isInputMemberIncompatible(descriptor));
    }
    /**
     * Whether the given input member is incompatible. If the class is incompatible,
     * then the member is as well.
     */
    isInputMemberIncompatible(input) {
        return this.getInputMemberIncompatibility(input) !== null;
    }
    /** Get incompatibility of the given member, if it's incompatible for migration. */
    getInputMemberIncompatibility(input) {
        var _a, _b;
        return (_b = (_a = this.memberIncompatibility.get(input.key)) !== null && _a !== void 0 ? _a : this.incompatible) !== null && _b !== void 0 ? _b : null;
    }
}
exports.DirectiveInfo = DirectiveInfo;
