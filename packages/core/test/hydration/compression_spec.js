"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = require("../../src/hydration/compression");
const interfaces_1 = require("../../src/hydration/interfaces");
describe('compression of node location', () => {
    it('should handle basic cases', () => {
        const fc = interfaces_1.NODE_NAVIGATION_STEP_FIRST_CHILD;
        const ns = interfaces_1.NODE_NAVIGATION_STEP_NEXT_SIBLING;
        const cases = [
            [[interfaces_1.REFERENCE_NODE_HOST, fc, 1], 'hf'],
            [[interfaces_1.REFERENCE_NODE_BODY, fc, 1], 'bf'],
            [[0, fc, 1], '0f'],
            [[15, fc, 1], '15f'],
            [[15, fc, 4], '15f4'],
            [[5, fc, 4, ns, 1, fc, 1], '5f4nf'],
            [[7, ns, 4, fc, 1, ns, 1], '7n4fn'],
        ];
        cases.forEach((_case) => {
            const [origSteps, path] = _case;
            const refNode = origSteps.shift();
            // Transform the short version of instructions (e.g. [fc, 4, ns, 2])
            // to a long version (e.g. [fc, fc, fc, fc, ns, ns]).
            const steps = [];
            let i = 0;
            while (i < origSteps.length) {
                const step = origSteps[i++];
                const repeat = origSteps[i++];
                for (let r = 0; r < repeat; r++) {
                    steps.push(step);
                }
            }
            // Check that one type can be converted to another and vice versa.
            expect((0, compression_1.compressNodeLocation)(String(refNode), steps)).toEqual(path);
            expect((0, compression_1.decompressNodeLocation)(path)).toEqual([refNode, ...origSteps]);
        });
    });
});
