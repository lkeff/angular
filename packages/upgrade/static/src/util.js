"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgAdapterInjector = void 0;
const core_1 = require("@angular/core");
class NgAdapterInjector {
    constructor(modInjector) {
        this.modInjector = modInjector;
    }
    // When Angular locate a service in the component injector tree, the not found value is set to
    // `NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR`. In such a case we should not walk up to the module
    // injector.
    // AngularJS only supports a single tree and should always check the module injector.
    get(token, notFoundValue) {
        if (notFoundValue === core_1.ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR) {
            return notFoundValue;
        }
        return this.modInjector.get(token, notFoundValue);
    }
}
exports.NgAdapterInjector = NgAdapterInjector;
