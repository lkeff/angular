"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const test_util_1 = require("../test-util");
function workerSupport() {
    const Worker = window['Worker'];
    if (!Worker) {
        return false;
    }
    const desc = Object.getOwnPropertyDescriptor(Worker.prototype, 'onmessage');
    if (!desc || !desc.configurable) {
        return false;
    }
    return true;
}
workerSupport.message = 'Worker Support';
xdescribe('Worker API', (0, test_util_1.ifEnvSupports)(workerSupport, function () {
    it('Worker API should be patched by Zone', (0, test_util_1.asyncTest)((done) => {
        const zone = Zone.current.fork({ name: 'worker' });
        zone.run(() => {
            const worker = new Worker('/base/angular/packages/zone.js/test/assets/worker.js');
            worker.onmessage = function (evt) {
                expect(evt.data).toEqual('worker');
                expect(Zone.current.name).toEqual('worker');
                done();
            };
        });
    }, Zone.root));
}));
