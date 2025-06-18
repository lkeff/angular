"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsoluteSourceSpan = exports.IdentifierKind = void 0;
/**
 * Describes the kind of identifier found in a template.
 */
var IdentifierKind;
(function (IdentifierKind) {
    IdentifierKind[IdentifierKind["Property"] = 0] = "Property";
    IdentifierKind[IdentifierKind["Method"] = 1] = "Method";
    IdentifierKind[IdentifierKind["Element"] = 2] = "Element";
    IdentifierKind[IdentifierKind["Template"] = 3] = "Template";
    IdentifierKind[IdentifierKind["Attribute"] = 4] = "Attribute";
    IdentifierKind[IdentifierKind["Reference"] = 5] = "Reference";
    IdentifierKind[IdentifierKind["Variable"] = 6] = "Variable";
    IdentifierKind[IdentifierKind["LetDeclaration"] = 7] = "LetDeclaration";
    IdentifierKind[IdentifierKind["Component"] = 8] = "Component";
    IdentifierKind[IdentifierKind["Directive"] = 9] = "Directive";
})(IdentifierKind || (exports.IdentifierKind = IdentifierKind = {}));
/**
 * Describes the absolute byte offsets of a text anchor in a source code.
 */
class AbsoluteSourceSpan {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}
exports.AbsoluteSourceSpan = AbsoluteSourceSpan;
