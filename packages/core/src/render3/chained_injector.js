"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainedInjector = void 0;
const provider_flags_1 = require("../view/provider_flags");
/**
 * Injector that looks up a value using a specific injector, before falling back to the module
 * injector. Used primarily when creating components or embedded views dynamically.
 */
class ChainedInjector {
    constructor(injector, parentInjector) {
        this.injector = injector;
        this.parentInjector = parentInjector;
    }
    get(token, notFoundValue, options) {
        const value = this.injector.get(token, provider_flags_1.NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, options);
        if (value !== provider_flags_1.NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ||
            notFoundValue === provider_flags_1.NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
            // Return the value from the root element injector when
            // - it provides it
            //   (value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
            // - the module injector should not be checked
            //   (notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR)
            return value;
        }
        return this.parentInjector.get(token, notFoundValue, options);
    }
}
exports.ChainedInjector = ChainedInjector;
