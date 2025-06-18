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
    const appRef = moduleRef.injector.get(core_1.ApplicationRef);
    const declaration = appRef.components[0].instance;
    (0, util_1.bindAction)('#destroyDom', destroyDom);
    (0, util_1.bindAction)('#createDom', createDom);
    (0, util_1.bindAction)('#markInsertionComponentForCheck', markInsertionComponentForCheck);
    (0, util_1.bindAction)('#detectChanges', detectChanges);
    (0, util_1.bindAction)('#detectChangesProfile', (0, util_1.profile)(detectChanges, noop, 'detectChanges'));
    // helpers
    function destroyDom() {
        declaration.viewCount = 0;
        appRef.tick();
        declaration.templateRefreshCount = 0;
        appRef.tick();
    }
    function createDom() {
        declaration.viewCount = util_2.numViews;
        appRef.tick();
    }
    function markInsertionComponentForCheck() {
        declaration.insertionComponent.changeDetector.markForCheck();
    }
    function detectChanges() {
        appRef.tick();
    }
    function noop() { }
}
