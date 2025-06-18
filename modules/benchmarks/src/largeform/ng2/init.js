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
const copies = (0, util_1.getIntParameter)('copies');
function init(moduleRef) {
    let app;
    let appRef;
    function destroyDom() {
        app.setCopies(0);
        appRef.tick();
    }
    function createDom() {
        app.setCopies(copies);
        appRef.tick();
    }
    function noop() { }
    const injector = moduleRef.injector;
    appRef = injector.get(core_1.ApplicationRef);
    app = appRef.components[0].instance;
    (0, util_1.bindAction)('#destroyDom', destroyDom);
    (0, util_1.bindAction)('#createDom', createDom);
    (0, util_1.bindAction)('#createDomProfile', (0, util_1.profile)(createDom, destroyDom, 'create'));
}
