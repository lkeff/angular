"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
const core_1 = require("@angular/core");
const util_1 = require("../../util");
const util_2 = require("../util");
function init(moduleRef) {
    let table;
    let appRef;
    function destroyDom() {
        table.data = util_2.emptyTable;
        appRef.tick();
    }
    function createDom() {
        table.data = (0, util_2.buildTable)();
        appRef.tick();
    }
    function noop() { }
    const injector = moduleRef.injector;
    appRef = injector.get(core_1.ApplicationRef);
    table = appRef.components[0].instance;
    (0, util_2.initTableUtils)();
    (0, util_1.bindAction)('#destroyDom', destroyDom);
    (0, util_1.bindAction)('#createDom', createDom);
    (0, util_1.bindAction)('#updateDomProfile', (0, util_1.profile)(createDom, noop, 'update'));
    (0, util_1.bindAction)('#createDomProfile', (0, util_1.profile)(createDom, destroyDom, 'create'));
}
