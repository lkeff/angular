"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompletionKind = void 0;
/**
 * Discriminant of an autocompletion source (a `Completion`).
 */
var CompletionKind;
(function (CompletionKind) {
    CompletionKind[CompletionKind["Reference"] = 0] = "Reference";
    CompletionKind[CompletionKind["Variable"] = 1] = "Variable";
    CompletionKind[CompletionKind["LetDeclaration"] = 2] = "LetDeclaration";
})(CompletionKind || (exports.CompletionKind = CompletionKind = {}));
