"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const http_1 = __importDefault(require("http"));
describe('http test', () => {
    it('http.request should be patched as eventTask', (done) => {
        const server = http_1.default.createServer((req, res) => {
            res.end();
        });
        server.listen(9999, () => {
            const zoneASpec = {
                name: 'A',
                onScheduleTask: (delegate, currentZone, targetZone, task) => {
                    return delegate.scheduleTask(targetZone, task);
                },
            };
            const zoneA = Zone.current.fork(zoneASpec);
            spyOn(zoneASpec, 'onScheduleTask').and.callThrough();
            zoneA.run(() => {
                const req = http_1.default.request({ hostname: 'localhost', port: '9999', method: 'GET' }, (res) => {
                    expect(Zone.current.name).toEqual('A');
                    expect(zoneASpec.onScheduleTask).toHaveBeenCalled();
                    server.close(() => {
                        done();
                    });
                });
                req.end();
            });
        });
    });
});
