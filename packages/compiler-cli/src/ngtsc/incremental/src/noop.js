"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOOP_INCREMENTAL_BUILD = void 0;
exports.NOOP_INCREMENTAL_BUILD = {
    priorAnalysisFor: () => null,
    priorTypeCheckingResultsFor: () => null,
    recordSuccessfulTypeCheck: () => { },
};
