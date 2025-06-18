"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoadedRoutes = getLoadedRoutes;
const core_1 = require("@angular/core");
function getLoadedRoutes(route) {
    return route._loadedRoutes;
}
(0, core_1.ɵpublishExternalGlobalUtil)('ɵgetLoadedRoutes', getLoadedRoutes);
