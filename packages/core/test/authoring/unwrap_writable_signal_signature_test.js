"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalModelSignatureTest = void 0;
/**
 * @fileoverview
 * This file contains various signal `model()` patterns and ensures
 * the resulting types match our expectations (via comments asserting the `.d.ts`).
 */
const core_1 = require("../../src/core");
class SignalModelSignatureTest {
    constructor() {
        /** string | undefined */
        this.optionalModel = (0, core_1.ɵunwrapWritableSignal)((0, core_1.model)());
        /** string */
        this.requiredModel = (0, core_1.ɵunwrapWritableSignal)(core_1.model.required());
        /** string | number */
        this.writableSignal = (0, core_1.ɵunwrapWritableSignal)((0, core_1.signal)(0));
        /** InputSignal<string | undefined> */
        this.optionalReadonlySignal = (0, core_1.ɵunwrapWritableSignal)((0, core_1.input)());
        /** InputSignal<string> */
        this.requiredReadonlySignal = (0, core_1.ɵunwrapWritableSignal)(core_1.input.required());
        /** number */
        this.primitiveValue = (0, core_1.ɵunwrapWritableSignal)(123);
        /** (value: string | null | undefined) => number */
        this.getterFunction = (0, core_1.ɵunwrapWritableSignal)((value) => value ? parseInt(value) : 0);
    }
}
exports.SignalModelSignatureTest = SignalModelSignatureTest;
