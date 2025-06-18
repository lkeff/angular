"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedSignalSignatureTest = void 0;
/**
 * @fileoverview
 * This file contains various signal `input()` patterns and ensures
 * the resulting types match our expectations (via comments asserting the `.d.ts`).
 */
const core_1 = require("@angular/core");
const source = (0, core_1.signal)(0);
class LinkedSignalSignatureTest {
    constructor() {
        /** number */
        this.simple = (0, core_1.linkedSignal)(() => 0);
        /** number */
        this.simpleWithCompatibleEqual = (0, core_1.linkedSignal)(source, {
            equal: numberEqual,
        });
        /** number */
        this.simpleWithIncompatibleEqual = (0, core_1.linkedSignal)(source, {
            // @ts-expect-error assignability error
            equal: stringEqual,
        });
        /** number */
        this.advanced = (0, core_1.linkedSignal)({ source, computation: (s) => s * 2 });
        /** string */
        this.advancedWithCompatibleEqual = (0, core_1.linkedSignal)({
            source,
            computation: (s) => String(s),
            equal: (a, b) => true,
        });
        /** unknown */
        /**
         * An incompatible `equal` function results in an overload resolution failure, causing the type `unknown` to be
         * inferred. This test aims to capture this limitation and may be revisited if this were to become supported.
         */
        this.advancedWithIncompatibleEqual = 
        // @ts-expect-error overload resolution error
        (0, core_1.linkedSignal)({
            source,
            // @ts-expect-error implicit any error
            computation: (s) => String(s),
            equal: numberEqual,
        });
        /** unknown */
        /**
         * Due to the cyclic nature of `previous`'s type and the computation's return type, TypeScript isn't able to infer
         * generic type arguments. This test aims to capture this limitation and may be revisited if this were to become
         * supported.
         *
         * @see https://github.com/microsoft/TypeScript/issues/49618
         * @see https://github.com/angular/angular/issues/60423
         */
        this.advancedWithPreviousImplicitGenerics = (0, core_1.linkedSignal)({
            source,
            computation: (s, previous) => String(s),
        });
        /** string */
        this.advancedWithPreviousExplicitGenerics = (0, core_1.linkedSignal)({
            source,
            computation: (s, previous) => String(s),
        });
    }
}
exports.LinkedSignalSignatureTest = LinkedSignalSignatureTest;
