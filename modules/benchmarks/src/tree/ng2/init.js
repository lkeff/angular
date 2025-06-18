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
    let tree;
    let appRef;
    let detectChangesRuns = 0;
    function destroyDom() {
        tree.data = util_2.emptyTree;
        appRef.tick();
    }
    function createDom() {
        tree.data = (0, util_2.buildTree)();
        appRef.tick();
    }
    function detectChanges() {
        for (let i = 0; i < 10; i++) {
            appRef.tick();
        }
        detectChangesRuns += 10;
        numberOfChecksEl.textContent = `${detectChangesRuns}`;
    }
    function noop() { }
    const injector = moduleRef.injector;
    appRef = injector.get(core_1.ApplicationRef);
    const numberOfChecksEl = document.getElementById('numberOfChecks');
    tree = appRef.components[0].instance;
    (0, util_2.initTreeUtils)();
    (0, util_1.bindAction)('#destroyDom', destroyDom);
    (0, util_1.bindAction)('#createDom', createDom);
    (0, util_1.bindAction)('#detectChanges', detectChanges);
    (0, util_1.bindAction)('#detectChangesProfile', (0, util_1.profile)(detectChanges, noop, 'detectChanges'));
    (0, util_1.bindAction)('#updateDomProfile', (0, util_1.profile)(createDom, noop, 'update'));
    (0, util_1.bindAction)('#createDomProfile', (0, util_1.profile)(createDom, destroyDom, 'create'));
}
