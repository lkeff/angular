"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeferBlockFixture = void 0;
const core_1 = require("../../src/core");
/**
 * Represents an individual defer block for testing purposes.
 *
 * @publicApi
 */
class DeferBlockFixture {
    /** @nodoc */
    constructor(block, componentFixture) {
        this.block = block;
        this.componentFixture = componentFixture;
    }
    /**
     * Renders the specified state of the defer fixture.
     * @param state the defer state to render
     */
    render(state) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hasStateTemplate(state, this.block)) {
                const stateAsString = getDeferBlockStateNameFromEnum(state);
                throw new Error(`Tried to render this defer block in the \`${stateAsString}\` state, ` +
                    `but there was no @${stateAsString.toLowerCase()} block defined in a template.`);
            }
            if (state === core_1.ɵDeferBlockState.Complete) {
                yield (0, core_1.ɵtriggerResourceLoading)(this.block.tDetails, this.block.lView, this.block.tNode);
            }
            // If the `render` method is used explicitly - skip timer-based scheduling for
            // `@placeholder` and `@loading` blocks and render them immediately.
            const skipTimerScheduling = true;
            (0, core_1.ɵrenderDeferBlockState)(state, this.block.tNode, this.block.lContainer, skipTimerScheduling);
            this.componentFixture.detectChanges();
        });
    }
    /**
     * Retrieves all nested child defer block fixtures
     * in a given defer block.
     */
    getDeferBlocks() {
        const deferBlocks = [];
        // An LContainer that represents a defer block has at most 1 view, which is
        // located right after an LContainer header. Get a hold of that view and inspect
        // it for nested defer blocks.
        const deferBlockFixtures = [];
        if (this.block.lContainer.length >= core_1.ɵCONTAINER_HEADER_OFFSET) {
            const lView = this.block.lContainer[core_1.ɵCONTAINER_HEADER_OFFSET];
            (0, core_1.ɵgetDeferBlocks)(lView, deferBlocks);
            for (const block of deferBlocks) {
                deferBlockFixtures.push(new DeferBlockFixture(block, this.componentFixture));
            }
        }
        return Promise.resolve(deferBlockFixtures);
    }
}
exports.DeferBlockFixture = DeferBlockFixture;
function hasStateTemplate(state, block) {
    switch (state) {
        case core_1.ɵDeferBlockState.Placeholder:
            return block.tDetails.placeholderTmplIndex !== null;
        case core_1.ɵDeferBlockState.Loading:
            return block.tDetails.loadingTmplIndex !== null;
        case core_1.ɵDeferBlockState.Error:
            return block.tDetails.errorTmplIndex !== null;
        case core_1.ɵDeferBlockState.Complete:
            return true;
        default:
            return false;
    }
}
function getDeferBlockStateNameFromEnum(state) {
    switch (state) {
        case core_1.ɵDeferBlockState.Placeholder:
            return 'Placeholder';
        case core_1.ɵDeferBlockState.Loading:
            return 'Loading';
        case core_1.ɵDeferBlockState.Error:
            return 'Error';
        default:
            return 'Main';
    }
}
