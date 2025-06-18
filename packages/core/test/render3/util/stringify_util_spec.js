"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const render3_1 = require("../../../src/render3");
const stringify_utils_1 = require("../../../src/render3/util/stringify_utils");
describe('stringify utils', () => {
    describe('stringifyTypeForError util', () => {
        it('should include the file path and line number for component if debug info includes them', () => {
            class Comp {
            }
            Comp.ɵcmp = (0, render3_1.ɵɵdefineComponent)({ type: Comp, decls: 0, vars: 0, template: () => '' });
            (0, render3_1.ɵsetClassDebugInfo)(Comp, {
                className: 'Comp',
                filePath: 'comp.ts',
                lineNumber: 11,
            });
            expect((0, stringify_utils_1.debugStringifyTypeForError)(Comp)).toBe('Comp (at comp.ts:11)');
        });
        it('should include only the class name if debug info does not contain file path', () => {
            class Comp {
            }
            Comp.ɵcmp = (0, render3_1.ɵɵdefineComponent)({ type: Comp, decls: 0, vars: 0, template: () => '' });
            (0, render3_1.ɵsetClassDebugInfo)(Comp, {
                className: 'Comp',
                lineNumber: 11,
            });
            expect((0, stringify_utils_1.debugStringifyTypeForError)(Comp)).toBe('Comp');
        });
        it('should default to showing just the class name for component if debug info is not available', () => {
            class Comp {
            }
            Comp.ɵcmp = (0, render3_1.ɵɵdefineComponent)({ type: Comp, decls: 0, vars: 0, template: () => '' });
            expect((0, stringify_utils_1.debugStringifyTypeForError)(Comp)).toBe('Comp');
        });
    });
});
