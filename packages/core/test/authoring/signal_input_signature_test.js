"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSignatureTest = void 0;
/**
 * @fileoverview
 * This file contains various signal `input()` patterns and ensures
 * the resulting types match our expectations (via comments asserting the `.d.ts`).
 */
const core_1 = require("../../src/core");
class InputSignatureTest {
    constructor() {
        /** string | undefined */
        this.noInitialValueExplicitRead = (0, core_1.input)();
        /** boolean */
        this.initialValueBooleanNoType = (0, core_1.input)(false);
        /** string */
        this.initialValueStringNoType = (0, core_1.input)('bla');
        /** number */
        this.initialValueNumberNoType = (0, core_1.input)(0);
        /** string[] */
        this.initialValueObjectNoType = (0, core_1.input)([]);
        /** number */
        this.initialValueEmptyOptions = (0, core_1.input)(1, {});
        /** @internal */
        // @ts-expect-error Transform is needed
        this.__explicitWriteTWithoutTransformForbidden = (0, core_1.input)('bla__');
        /** number, string | number */
        this.noInitialValueWithTransform = core_1.input.required({ transform: (_v) => 0 });
        /** number, string | number  */
        this.initialValueWithTransform = (0, core_1.input)(0, { transform: (_v) => 0 });
        /** boolean | undefined, string | boolean  */
        this.undefinedInitialValueWithTransform = (0, core_1.input)(undefined, {
            transform: (_v) => true,
        });
        /** {works: boolean;}, string | boolean  */
        this.complexTransformWithInitialValue = (0, core_1.input)({ works: true }, {
            transform: (_v) => ({ works: !!_v }),
        });
        /** RegExp */
        this.nonPrimitiveInitialValue = (0, core_1.input)(/default regex/);
        /** string, string | null */
        this.requiredExplicitReadAndWriteButNoTransform = core_1.input.required({
            transform: (_v) => '',
        });
        /** string, string | null */
        this.withInitialValueExplicitReadAndWrite = (0, core_1.input)('', { transform: (bla) => '' });
        /** string | undefined */
        this.withNoInitialValue = (0, core_1.input)();
        /** undefined */
        this.initialValueUndefinedWithoutOptions = (0, core_1.input)(undefined);
        /** undefined */
        this.initialValueUndefinedWithOptions = (0, core_1.input)(undefined, {});
        /** @internal */
        this.__shouldErrorIfInitialValueUndefinedExplicitReadWithoutOptions = (0, core_1.input)(
        // @ts-expect-error
        undefined);
        /** string | undefined, unknown */
        this.initialValueUndefinedWithUntypedTransform = (0, core_1.input)(undefined, { transform: (bla) => '' });
        /** string | undefined, string */
        this.initialValueUndefinedWithTypedTransform = (0, core_1.input)(undefined, { transform: (bla) => '' });
        /** string | undefined, string */
        this.initialValueUndefinedExplicitReadWithTransform = (0, core_1.input)(undefined, {
            transform: (bla) => '',
        });
        /** string */
        this.requiredNoInitialValue = core_1.input.required();
        /** string | undefined */
        this.requiredNoInitialValueExplicitUndefined = core_1.input.required();
        /** string, string | boolean */
        this.requiredWithTransform = core_1.input.required({
            transform: (v) => '',
        });
        /** @internal */
        this.__requiredWithTransformButNoWriteT = core_1.input.required({
            // @ts-expect-error
            transform: (v) => '',
        });
        /** string, string | boolean */
        this.requiredWithTransformInferenceNoExplicitGeneric = core_1.input.required({
            transform: (v) => '',
        });
        // Unknown as `WriteT` is acceptable because the user explicitly opted into handling
        // the transform- so they will need to work with the `unknown` values.
        /** string, unknown */
        this.requiredTransformButNoTypes = core_1.input.required({ transform: (v) => '' });
        /** unknown */
        this.noInitialValueNoType = (0, core_1.input)();
        /** string */
        this.requiredNoInitialValueNoType = core_1.input.required();
        /** @internal */
        this.__shouldErrorIfInitialValueWithRequired = core_1.input.required({
            // @ts-expect-error
            initialValue: 0,
        });
    }
}
exports.InputSignatureTest = InputSignatureTest;
