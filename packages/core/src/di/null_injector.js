"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullInjector = void 0;
const di_1 = require("@angular/core/primitives/di");
const stringify_1 = require("../util/stringify");
const injector_compatibility_1 = require("./injector_compatibility");
class NullInjector {
    get(token, notFoundValue = injector_compatibility_1.THROW_IF_NOT_FOUND) {
        if (notFoundValue === injector_compatibility_1.THROW_IF_NOT_FOUND) {
            const error = new di_1.NotFoundError(`NullInjectorError: No provider for ${(0, stringify_1.stringify)(token)}!`);
            throw error;
        }
        return notFoundValue;
    }
}
exports.NullInjector = NullInjector;
