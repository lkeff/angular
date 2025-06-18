"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwUnrecoverableStateError = exports.SwCriticalError = void 0;
exports.errorToString = errorToString;
class SwCriticalError extends Error {
    constructor() {
        super(...arguments);
        this.isCritical = true;
    }
}
exports.SwCriticalError = SwCriticalError;
function errorToString(error) {
    if (error instanceof Error) {
        return `${error.message}\n${error.stack}`;
    }
    else {
        return `${error}`;
    }
}
class SwUnrecoverableStateError extends SwCriticalError {
    constructor() {
        super(...arguments);
        this.isUnrecoverableState = true;
    }
}
exports.SwUnrecoverableStateError = SwUnrecoverableStateError;
