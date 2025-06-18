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
function init(moduleRef) {
    const injector = moduleRef.injector;
    const appRef = injector.get(core_1.ApplicationRef);
    const componentRef = appRef.components[0];
    const component = componentRef.instance;
    const componentHostEl = componentRef.location.nativeElement;
    const select = document.querySelector('#scenario-select');
    const empty = [];
    const items = [];
    function create(tplRefIdx) {
        component.tplRefIdx = tplRefIdx;
        component.data = items;
        appRef.tick();
    }
    function destroy() {
        component.data = empty;
        appRef.tick();
    }
    function update() {
        component.exp = component.exp === 'bar' ? 'baz' : 'bar';
        appRef.tick();
    }
    function detectChanges() {
        appRef.tick();
    }
    function modifyExternally() {
        const buttonEls = componentHostEl.querySelectorAll('button');
        buttonEls.forEach((buttonEl) => {
            const cl = buttonEl.classList;
            if (cl.contains('external')) {
                cl.remove('external');
            }
            else {
                cl.add('external');
            }
        });
    }
    for (let i = 0; i < 2000; i++) {
        items.push(i);
    }
    (0, util_1.bindAction)('#create', () => create(select.selectedIndex));
    (0, util_1.bindAction)('#update', update);
    (0, util_1.bindAction)('#detect_changes', detectChanges);
    (0, util_1.bindAction)('#destroy', destroy);
    (0, util_1.bindAction)('#profile_update', (0, util_1.profile)(() => {
        for (let i = 0; i < 10; i++) {
            update();
        }
    }, () => { }, 'update and detect changes'));
    (0, util_1.bindAction)('#profile_detect_changes', (0, util_1.profile)(() => {
        for (let i = 0; i < 10; i++) {
            detectChanges();
        }
    }, () => { }, 'noop detect changes'));
    (0, util_1.bindAction)('#modify', modifyExternally);
}
