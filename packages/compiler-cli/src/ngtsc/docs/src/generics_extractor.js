"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractGenerics = extractGenerics;
/** Gets a list of all the generic type parameters for a declaration. */
function extractGenerics(declaration) {
    var _a, _b;
    return ((_b = (_a = declaration.typeParameters) === null || _a === void 0 ? void 0 : _a.map((typeParam) => {
        var _a, _b;
        return ({
            name: typeParam.name.getText(),
            constraint: (_a = typeParam.constraint) === null || _a === void 0 ? void 0 : _a.getText(),
            default: (_b = typeParam.default) === null || _b === void 0 ? void 0 : _b.getText(),
        });
    })) !== null && _b !== void 0 ? _b : []);
}
