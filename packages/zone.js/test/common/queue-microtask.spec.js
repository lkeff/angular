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
describe('queueMicrotask', (0, test_util_1.ifEnvSupports)('queueMicrotask', function () {
    it('callback in the queueMicrotask should be scheduled as microTask in the zone', (done) => {
        const logs = [];
        Zone.current
            .fork({
            name: 'queueMicrotask',
            onScheduleTask: (delegate, curr, target, task) => {
                logs.push(task.type);
                logs.push(task.source);
                return delegate.scheduleTask(target, task);
            },
        })
            .run(() => {
            queueMicrotask(() => {
                expect(logs).toEqual(['microTask', 'queueMicrotask']);
                expect(Zone.current.name).toEqual('queueMicrotask');
                done();
            });
        });
    });
}));
