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
describe('MutationObserver', (0, test_util_1.ifEnvSupports)('MutationObserver', function () {
    let elt;
    beforeEach(function () {
        elt = document.createElement('div');
        document.body.appendChild(elt);
    });
    afterEach(function () {
        document.body.removeChild(elt);
    });
    it('should run observers within the zone', function (done) {
        const testZone = Zone.current.fork({ name: 'test' });
        let ob;
        elt = document.createElement('div');
        document.body.appendChild(elt);
        testZone.run(function () {
            ob = new MutationObserver(function () {
                expect(Zone.current).toBe(testZone);
                done();
            });
            ob.observe(elt, { childList: true });
        });
        elt.innerHTML = '<p>hey</p>';
    });
    it('should only dequeue upon disconnect if something is observed', function () {
        let ob;
        let flag = false;
        const elt = document.createElement('div');
        const childZone = Zone.current.fork({
            name: 'test',
            onInvokeTask: function () {
                flag = true;
            },
        });
        childZone.run(function () {
            ob = new MutationObserver(function () { });
        });
        ob.disconnect();
        expect(flag).toBe(false);
    });
}));
describe('WebKitMutationObserver', (0, test_util_1.ifEnvSupports)('WebKitMutationObserver', function () {
    it('should run observers within the zone', function (done) {
        const testZone = Zone.current.fork({ name: 'test' });
        let elt;
        testZone.run(function () {
            elt = document.createElement('div');
            const ob = new global['WebKitMutationObserver'](function () {
                expect(Zone.current).toBe(testZone);
                done();
            });
            ob.observe(elt, { childList: true });
        });
        elt.innerHTML = '<p>hey</p>';
    });
}));
