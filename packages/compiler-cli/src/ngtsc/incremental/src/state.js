"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncrementalStateKind = void 0;
/**
 * Discriminant of the `IncrementalState` union.
 */
var IncrementalStateKind;
(function (IncrementalStateKind) {
    IncrementalStateKind[IncrementalStateKind["Fresh"] = 0] = "Fresh";
    IncrementalStateKind[IncrementalStateKind["Delta"] = 1] = "Delta";
    IncrementalStateKind[IncrementalStateKind["Analyzed"] = 2] = "Analyzed";
})(IncrementalStateKind || (exports.IncrementalStateKind = IncrementalStateKind = {}));
