"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass4__checkInheritanceOfInputs = pass4__checkInheritanceOfInputs;
const assert_1 = __importDefault(require("assert"));
const check_inheritance_1 = require("./problematic_patterns/check_inheritance");
/**
 * Phase that propagates incompatibilities to derived classes or
 * base classes. For example, consider:
 *
 * ```ts
 * class Base {
 *   bla = true;
 * }
 *
 * class Derived extends Base {
 *   @Input() bla = false;
 * }
 * ```
 *
 * Whenever we migrate `Derived`, the inheritance would fail
 * and result in a build breakage because `Base#bla` is not an Angular input.
 *
 * The logic here detects such cases and marks `bla` as incompatible. If `Derived`
 * would then have other derived classes as well, it would propagate the status.
 */
function pass4__checkInheritanceOfInputs(inheritanceGraph, metaRegistry, knownInputs) {
    (0, check_inheritance_1.checkInheritanceOfKnownFields)(inheritanceGraph, metaRegistry, knownInputs, {
        isClassWithKnownFields: (clazz) => knownInputs.isInputContainingClass(clazz),
        getFieldsForClass: (clazz) => {
            const directiveInfo = knownInputs.getDirectiveInfoForClass(clazz);
            (0, assert_1.default)(directiveInfo !== undefined, 'Expected directive info to exist for input.');
            return Array.from(directiveInfo.inputFields.values()).map((i) => i.descriptor);
        },
    });
}
