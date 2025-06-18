"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoApplicationOperations = void 0;
const ng_devtools_1 = require("ng-devtools");
class DemoApplicationOperations extends ng_devtools_1.ApplicationOperations {
    viewSource(position) {
        console.warn('viewSource() is not implemented because the demo app runs in an Iframe');
        throw new Error('Not implemented in demo app.');
    }
    selectDomElement(position) {
        console.warn('selectDomElement() is not implemented because the demo app runs in an Iframe');
        throw new Error('Not implemented in demo app.');
    }
    inspect(directivePosition, keyPath) {
        console.warn('inspect() is not implemented because the demo app runs in an Iframe');
        return;
    }
}
exports.DemoApplicationOperations = DemoApplicationOperations;
