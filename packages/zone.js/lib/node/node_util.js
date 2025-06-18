"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchNodeUtil = patchNodeUtil;
const utils_1 = require("../common/utils");
function patchNodeUtil(Zone) {
    Zone.__load_patch('node_util', (global, Zone, api) => {
        api.patchOnProperties = utils_1.patchOnProperties;
        api.patchMethod = utils_1.patchMethod;
        api.bindArguments = utils_1.bindArguments;
        api.patchMacroTask = utils_1.patchMacroTask;
        (0, utils_1.setShouldCopySymbolProperties)(true);
    });
}
