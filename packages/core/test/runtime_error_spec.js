"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../src/errors");
describe('RuntimeError utils', () => {
    it('should correctly format an error without an error message', () => {
        const error = new errors_1.RuntimeError(-301 /* RuntimeErrorCode.EXPORT_NOT_FOUND */, '');
        expect(error.toString()).toBe('Error: NG0301. Find more at https://angular.dev/errors/NG0301');
    });
    it('should correctly format an error without an error message not adev guide', () => {
        const error = new errors_1.RuntimeError(305 /* RuntimeErrorCode.TEMPLATE_STRUCTURE_ERROR */, '');
        expect(error.toString()).toBe('Error: NG0305');
    });
    it('should correctly format an error with an error message but without an adev guide', () => {
        const error = new errors_1.RuntimeError(305 /* RuntimeErrorCode.TEMPLATE_STRUCTURE_ERROR */, 'Some error message');
        expect(error.toString()).toBe('Error: NG0305: Some error message');
    });
    it('should correctly format an error with both an error message and an adev guide', () => {
        const error = new errors_1.RuntimeError(-301 /* RuntimeErrorCode.EXPORT_NOT_FOUND */, 'Some error message');
        expect(error.toString()).toBe('Error: NG0301: Some error message. Find more at https://angular.dev/errors/NG0301');
    });
    ['.', ',', ';', '!', '?'].forEach((character) => it(`should not add a period between the error message and the adev guide suffix if the message ends with '${character}'`, () => {
        const errorMessage = `Pipe not found${character}`;
        const error = new errors_1.RuntimeError(-302 /* RuntimeErrorCode.PIPE_NOT_FOUND */, errorMessage);
        expect(error.toString()).toBe(`Error: NG0302: Pipe not found${character} Find more at https://angular.dev/errors/NG0302`);
    }));
});
