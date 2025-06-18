"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFactoryDef = getFactoryDef;
const stringify_1 = require("../util/stringify");
const fields_1 = require("./fields");
function getFactoryDef(type, throwNotFound) {
    const hasFactoryDef = type.hasOwnProperty(fields_1.NG_FACTORY_DEF);
    if (!hasFactoryDef && throwNotFound === true && ngDevMode) {
        throw new Error(`Type ${(0, stringify_1.stringify)(type)} does not have 'ɵfac' property.`);
    }
    return hasFactoryDef ? type[fields_1.NG_FACTORY_DEF] : null;
}
