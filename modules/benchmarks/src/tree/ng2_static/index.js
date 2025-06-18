"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
require("@angular/compiler");
const core_1 = require("@angular/core");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const util_1 = require("../../util");
const util_2 = require("../util");
const tree_1 = require("./tree");
let tree;
let appRef;
function destroyDom() {
    tree.data = util_2.emptyTree;
    appRef.tick();
}
function createDom() {
    tree.data = (0, util_2.buildTree)();
    appRef.tick();
}
function noop() { }
function init() {
    (0, util_2.initTreeUtils)();
    (0, core_1.enableProdMode)();
    const appModule = (0, tree_1.createAppModule)();
    (0, platform_browser_dynamic_1.platformBrowserDynamic)()
        .bootstrapModule(appModule)
        .then((ref) => {
        const injector = ref.injector;
        appRef = injector.get(core_1.ApplicationRef);
        tree = appRef.components[0].instance;
        (0, util_1.bindAction)('#destroyDom', destroyDom);
        (0, util_1.bindAction)('#createDom', createDom);
        (0, util_1.bindAction)('#updateDomProfile', (0, util_1.profile)(createDom, noop, 'update'));
        (0, util_1.bindAction)('#createDomProfile', (0, util_1.profile)(createDom, destroyDom, 'create'));
    });
}
init();
