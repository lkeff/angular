"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.recognize = recognize;
const operators_1 = require("rxjs/operators");
const recognize_1 = require("../recognize");
function recognize(injector, configLoader, rootComponentType, config, serializer, paramsInheritanceStrategy) {
    return (0, operators_1.mergeMap)((t) => (0, recognize_1.recognize)(injector, configLoader, rootComponentType, config, t.extractedUrl, serializer, paramsInheritanceStrategy).pipe((0, operators_1.map)(({ state: targetSnapshot, tree: urlAfterRedirects }) => {
        return Object.assign(Object.assign({}, t), { targetSnapshot, urlAfterRedirects });
    })));
}
