"use strict";
// tslint:disable
Object.defineProperty(exports, "__esModule", { value: true });
function assertValidLoadingInput(dir) {
    if (dir.withUndefinedInput && dir.narrowableMultipleTimes) {
        throw new Error(``);
    }
    const validInputs = ['auto', 'eager', 'lazy'];
    if (typeof dir.withUndefinedInput === 'string' && !validInputs.includes(dir.withUndefinedInput)) {
        throw new Error();
    }
}
