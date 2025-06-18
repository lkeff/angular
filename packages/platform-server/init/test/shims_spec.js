"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const bundled_domino_1 = __importDefault(require("../src/bundled-domino"));
const shims_1 = require("../src/shims");
describe('applyShims()', () => {
    const globalClone = Object.assign({}, global);
    afterEach(() => {
        // Un-patch `global`.
        const currentProps = Object.keys(global);
        for (const prop of currentProps) {
            if (prop === 'crypto') {
                // crypto is a getter and cannot be changed
                continue;
            }
            if (globalClone.hasOwnProperty(prop)) {
                global[prop] = globalClone[prop];
            }
            else {
                delete global[prop];
            }
        }
    });
    it('should load `domino.impl` onto `global`', () => {
        expect(global).not.toEqual(jasmine.objectContaining(bundled_domino_1.default.impl));
        (0, shims_1.applyShims)();
        expect(global).toEqual(jasmine.objectContaining(bundled_domino_1.default.impl));
    });
    it('should define `KeyboardEvent` on `global`', () => {
        expect(global.KeyboardEvent).not.toBe(bundled_domino_1.default.impl.Event);
        (0, shims_1.applyShims)();
        expect(global.KeyboardEvent).toBe(bundled_domino_1.default.impl.Event);
    });
});
