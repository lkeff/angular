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
        this.noInitialValueExplicitRead = (0, core_1.model)();
        /** boolean */
        this.initialValueBooleanNoType = (0, core_1.model)(false);
        /** string */
        this.initialValueStringNoType = (0, core_1.model)('bla');
        /** number */
        this.initialValueNumberNoType = (0, core_1.model)(0);
        /** string[] */
        this.initialValueObjectNoType = (0, core_1.model)([]);
        /** number */
        this.initialValueEmptyOptions = (0, core_1.model)(1, {});
        /** RegExp */
        this.nonPrimitiveInitialValue = (0, core_1.model)(/default regex/);
        /** string | undefined */
        this.withNoInitialValue = (0, core_1.model)();
        /** string */
        this.requiredNoInitialValue = core_1.model.required();
        /** string | undefined */
        this.requiredNoInitialValueExplicitUndefined = core_1.model.required();
        /** unknown */
        this.noInitialValueNoType = (0, core_1.model)();
        /** string */
        this.requiredNoInitialValueNoType = core_1.model.required();
        /** @internal */
        this.__shouldErrorIfInitialValueWithRequired = core_1.model.required({
            // @ts-expect-error
            initialValue: 0,
        });
    }
}
exports.SignalModelSignatureTest = SignalModelSignatureTest;
