"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceKind = void 0;
exports.isTsReference = isTsReference;
exports.isTemplateReference = isTemplateReference;
exports.isHostBindingReference = isHostBindingReference;
exports.isTsClassTypeReference = isTsClassTypeReference;
/** Possible types of references to known fields detected. */
var ReferenceKind;
(function (ReferenceKind) {
    ReferenceKind[ReferenceKind["InTemplate"] = 0] = "InTemplate";
    ReferenceKind[ReferenceKind["InHostBinding"] = 1] = "InHostBinding";
    ReferenceKind[ReferenceKind["TsReference"] = 2] = "TsReference";
    ReferenceKind[ReferenceKind["TsClassTypeReference"] = 3] = "TsClassTypeReference";
})(ReferenceKind || (exports.ReferenceKind = ReferenceKind = {}));
/** Whether the given reference is a TypeScript reference. */
function isTsReference(ref) {
    return ref.kind === ReferenceKind.TsReference;
}
/** Whether the given reference is a template reference. */
function isTemplateReference(ref) {
    return ref.kind === ReferenceKind.InTemplate;
}
/** Whether the given reference is a host binding reference. */
function isHostBindingReference(ref) {
    return ref.kind === ReferenceKind.InHostBinding;
}
/**
 * Whether the given reference is a TypeScript `ts.Type` reference
 * to a class containing known fields.
 */
function isTsClassTypeReference(ref) {
    return ref.kind === ReferenceKind.TsClassTypeReference;
}
