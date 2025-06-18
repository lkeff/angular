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
const wtfMock = global.wtfMock;
describe('XMLHttpRequest', function () {
    let testZone;
    beforeEach(() => {
        testZone = Zone.current.fork({ name: 'test' });
    });
    it('should intercept XHRs and treat them as MacroTasks', function (done) {
        let req;
        let onStable;
        const testZoneWithWtf = Zone.current.fork(Zone['wtfZoneSpec']).fork({
            name: 'TestZone',
            onHasTask: (delegate, curr, target, hasTask) => {
                if (!hasTask.macroTask) {
                    onStable && onStable();
                }
            },
        });
        testZoneWithWtf.run(() => {
            req = new XMLHttpRequest();
            const logs = [];
            req.onload = () => {
                logs.push('onload');
            };
            onStable = function () {
                expect(wtfMock.log[wtfMock.log.length - 2]).toEqual('> Zone:invokeTask:XMLHttpRequest.send("<root>::ProxyZone::WTF::TestZone")');
                expect(wtfMock.log[wtfMock.log.length - 1]).toEqual('< Zone:invokeTask:XMLHttpRequest.send');
                if ((0, test_util_1.supportPatchXHROnProperty)()) {
                    expect(wtfMock.log[wtfMock.log.length - 3]).toMatch(/\< Zone\:invokeTask.*addEventListener\:load/);
                    expect(wtfMock.log[wtfMock.log.length - 4]).toMatch(/\> Zone\:invokeTask.*addEventListener\:load/);
                }
                // if browser can patch onload
                if (req[(0, test_util_1.zoneSymbol)('loadfalse')]) {
                    expect(logs).toEqual(['onload']);
                }
                onStable = null;
                done();
            };
            req.open('get', '/', true);
            req.send();
            const lastScheduled = wtfMock.log[wtfMock.log.length - 1];
            expect(lastScheduled).toMatch('# Zone:schedule:macroTask:XMLHttpRequest.send');
        }, null, undefined, 'unit-test');
    });
    it('should not trigger Zone callback of internal onreadystatechange', function (done) {
        const scheduleSpy = jasmine.createSpy('schedule');
        const xhrZone = Zone.current.fork({
            name: 'xhr',
            onScheduleTask: (delegate, currentZone, targetZone, task) => {
                if (task.type === 'eventTask') {
                    scheduleSpy(task.source);
                }
                return delegate.scheduleTask(targetZone, task);
            },
        });
        xhrZone.run(() => {
            const req = new XMLHttpRequest();
            req.onload = function () {
                expect(Zone.current.name).toEqual('xhr');
                if ((0, test_util_1.supportPatchXHROnProperty)()) {
                    expect(scheduleSpy).toHaveBeenCalled();
                }
                done();
            };
            req.open('get', '/', true);
            req.send();
        });
    });
    it('should work with onreadystatechange', function (done) {
        let req;
        testZone.run(function () {
            req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                // Make sure that the wrapCallback will only be called once
                req.onreadystatechange = null;
                expect(Zone.current).toBe(testZone);
                done();
            };
            req.open('get', '/', true);
        });
        req.send();
    });
    it('should run onload listeners before internal readystatechange', function (done) {
        const logs = [];
        const xhrZone = Zone.current.fork({
            name: 'xhr',
            onInvokeTask: (delegate, curr, target, task, applyThis, applyArgs) => {
                logs.push('invokeTask ' + task.source);
                return delegate.invokeTask(target, task, applyThis, applyArgs);
            },
        });
        xhrZone.run(function () {
            const req = new XMLHttpRequest();
            req.onload = function () {
                logs.push('onload');
                window[Zone.__symbol__('setTimeout')](() => {
                    expect(logs).toEqual([
                        'invokeTask XMLHttpRequest.addEventListener:load',
                        'onload',
                        'invokeTask XMLHttpRequest.send',
                    ]);
                    done();
                });
            };
            req.open('get', '/', true);
            req.send();
        });
    });
    it('should invoke xhr task even onload listener throw error', function (done) {
        const oriWindowError = window.onerror;
        const logs = [];
        window.onerror = function (err) {
            logs.push(err);
        };
        try {
            const xhrZone = Zone.current.fork({
                name: 'xhr',
                onInvokeTask: (delegate, curr, target, task, applyThis, applyArgs) => {
                    logs.push('invokeTask ' + task.source);
                    return delegate.invokeTask(target, task, applyThis, applyArgs);
                },
                onHasTask: (delegate, curr, target, hasTaskState) => {
                    if (hasTaskState.change === 'macroTask') {
                        logs.push('hasTask ' + hasTaskState.macroTask);
                    }
                    return delegate.hasTask(target, hasTaskState);
                },
            });
            xhrZone.run(function () {
                const req = new XMLHttpRequest();
                req.onload = function () {
                    logs.push('onload');
                    throw new Error('test');
                };
                const unhandledRejection = (e) => {
                    fail('should not be here');
                };
                window.addEventListener('unhandledrejection', unhandledRejection);
                req.addEventListener('load', () => {
                    logs.push('onload1');
                    window[Zone.__symbol__('setTimeout')](() => {
                        expect(logs).toEqual([
                            'hasTask true',
                            'invokeTask XMLHttpRequest.addEventListener:load',
                            'onload',
                            'invokeTask XMLHttpRequest.addEventListener:load',
                            'onload1',
                            'invokeTask XMLHttpRequest.send',
                            'hasTask false',
                            'Uncaught Error: test',
                        ]);
                        window.removeEventListener('unhandledrejection', unhandledRejection);
                        window.onerror = oriWindowError;
                        done();
                    });
                });
                req.open('get', '/', true);
                req.send();
            });
        }
        catch (e) {
            window.onerror = oriWindowError;
        }
    });
    it('should return null when access ontimeout first time without error', function () {
        let req = new XMLHttpRequest();
        expect(req.ontimeout).toBe(null);
    });
    const supportsOnProgress = function () {
        return 'onprogress' in new XMLHttpRequest();
    };
    supportsOnProgress.message = 'XMLHttpRequest.onprogress';
    describe('onprogress', (0, test_util_1.ifEnvSupports)(supportsOnProgress, function () {
        it('should work with onprogress', function (done) {
            let req;
            testZone.run(function () {
                req = new XMLHttpRequest();
                req.onprogress = function () {
                    // Make sure that the wrapCallback will only be called once
                    req.onprogress = null;
                    expect(Zone.current).toBe(testZone);
                    done();
                };
                req.open('get', '/', true);
            });
            req.send();
        });
        it('should allow canceling of an XMLHttpRequest', function (done) {
            const spy = jasmine.createSpy('spy');
            let req;
            let pending = false;
            const trackingTestZone = Zone.current.fork({
                name: 'tracking test zone',
                onHasTask: (delegate, current, target, hasTaskState) => {
                    if (hasTaskState.change == 'macroTask') {
                        pending = hasTaskState.macroTask;
                    }
                    delegate.hasTask(target, hasTaskState);
                },
            });
            trackingTestZone.run(function () {
                req = new XMLHttpRequest();
                req.onreadystatechange = function () {
                    if (req.readyState === XMLHttpRequest.DONE) {
                        if (req.status !== 0) {
                            spy();
                        }
                    }
                };
                req.open('get', '/', true);
                req.send();
                req.abort();
            });
            setTimeout(function () {
                expect(spy).not.toHaveBeenCalled();
                expect(pending).toEqual(false);
                done();
            }, 0);
        });
        it('should allow aborting an XMLHttpRequest after its completed', function (done) {
            let req;
            testZone.run(function () {
                req = new XMLHttpRequest();
                req.onreadystatechange = function () {
                    if (req.readyState === XMLHttpRequest.DONE) {
                        if (req.status !== 0) {
                            setTimeout(function () {
                                req.abort();
                                done();
                            }, 0);
                        }
                    }
                };
                req.open('get', '/', true);
                req.send();
            });
        });
    }));
    it('should preserve other setters', function () {
        const req = new XMLHttpRequest();
        req.open('get', '/', true);
        req.send();
        try {
            req.responseType = 'document';
            expect(req.responseType).toBe('document');
        }
        catch (e) {
            // Android browser: using this setter throws, this should be preserved
            expect(e.message).toBe('INVALID_STATE_ERR: DOM Exception 11');
        }
    });
    it('should work with synchronous XMLHttpRequest', function () {
        const log = [];
        Zone.current
            .fork({
            name: 'sync-xhr-test',
            onHasTask: function (delegate, current, target, hasTaskState) {
                log.push(hasTaskState);
                delegate.hasTask(target, hasTaskState);
            },
        })
            .run(() => {
            const req = new XMLHttpRequest();
            req.open('get', '/', false);
            req.send();
        });
        expect(log).toEqual([]);
    });
    it('should preserve static constants', function () {
        expect(XMLHttpRequest.UNSENT).toEqual(0);
        expect(XMLHttpRequest.OPENED).toEqual(1);
        expect(XMLHttpRequest.HEADERS_RECEIVED).toEqual(2);
        expect(XMLHttpRequest.LOADING).toEqual(3);
        expect(XMLHttpRequest.DONE).toEqual(4);
    });
    it('should work properly when send request multiple times on single xmlRequest instance', function (done) {
        testZone.run(function () {
            const req = new XMLHttpRequest();
            req.open('get', '/', true);
            req.send();
            req.onload = function () {
                req.onload = null;
                req.open('get', '/', true);
                req.onload = function () {
                    done();
                };
                expect(() => {
                    req.send();
                }).not.toThrow();
            };
        });
    });
    it('should keep taskcount correctly when abort was called multiple times before request is done', function (done) {
        testZone.run(function () {
            const req = new XMLHttpRequest();
            req.open('get', '/', true);
            req.send();
            let count = 0;
            const listener = function (ev) {
                if (req.readyState >= 2) {
                    const isInitial = count++ === 0;
                    expect(() => {
                        // this triggers a synchronous dispatch of the state change event.
                        req.abort();
                    }).not.toThrow();
                    req.removeEventListener('readystatechange', listener);
                    if (isInitial) {
                        done();
                    }
                }
            };
            req.addEventListener('readystatechange', listener);
        });
    });
    it('should close xhr request if error happened when connect', function (done) {
        const logs = [];
        Zone.current
            .fork({
            name: 'xhr',
            onHasTask: (delegate, curr, target, taskState) => {
                if (taskState.change === 'macroTask') {
                    logs.push(taskState.macroTask);
                }
                return delegate.hasTask(target, taskState);
            },
        })
            .run(function () {
            const req = new XMLHttpRequest();
            req.open('get', 'http://notexists.url', true);
            req.send();
            req.addEventListener('error', () => {
                expect(logs).toEqual([true, false]);
                done();
            });
        });
    });
    it('should trigger readystatechange if xhr request trigger cors error', (done) => {
        const req = new XMLHttpRequest();
        let err = null;
        try {
            req.open('get', 'file:///test', true);
        }
        catch (err) {
            // in IE, open will throw Access is denied error
            done();
            return;
        }
        req.addEventListener('readystatechange', function (ev) {
            if (req.readyState === 4) {
                const xhrScheduled = req[(0, test_util_1.zoneSymbol)('xhrScheduled')];
                const task = req[(0, test_util_1.zoneSymbol)('xhrTask')];
                if (xhrScheduled === false) {
                    expect(task.state).toEqual('scheduling');
                    setTimeout(() => {
                        if (err) {
                            expect(task.state).toEqual('unknown');
                        }
                        else {
                            expect(task.state).toEqual('notScheduled');
                        }
                        done();
                    });
                }
                else {
                    expect(task.state).toEqual('scheduled');
                    done();
                }
            }
        });
        try {
            req.send();
        }
        catch (error) {
            err = error;
        }
    });
    it('should invoke task if xhr request trigger cors error', (done) => {
        const logs = [];
        const zone = Zone.current.fork({
            name: 'xhr',
            onHasTask: (delegate, curr, target, hasTask) => {
                logs.push(JSON.stringify(hasTask));
            },
        });
        const req = new XMLHttpRequest();
        try {
            req.open('get', 'file:///test', true);
        }
        catch (err) {
            // in IE, open will throw Access is denied error
            done();
            return;
        }
        zone.run(() => {
            let isError = false;
            let timerId = null;
            try {
                timerId = window[(0, test_util_1.zoneSymbol)('setTimeout')](() => {
                    expect(logs).toEqual([
                        `{"microTask":false,"macroTask":true,"eventTask":false,"change":"macroTask"}`,
                        `{"microTask":false,"macroTask":false,"eventTask":false,"change":"macroTask"}`,
                    ]);
                    done();
                }, 500);
                req.send();
            }
            catch (error) {
                isError = true;
                window[(0, test_util_1.zoneSymbol)('clearTimeout')](timerId);
                done();
            }
        });
    });
    it('should not throw error when get XMLHttpRequest.prototype.onreadystatechange the first time', function () {
        const func = function () {
            testZone.run(function () {
                const req = new XMLHttpRequest();
                req.onreadystatechange;
            });
        };
        expect(func).not.toThrow();
    });
    it('should be in the zone when use XMLHttpRequest.addEventListener', function (done) {
        testZone.run(function () {
            // sometimes this case will cause timeout
            // so we set it longer
            const interval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
            const req = new XMLHttpRequest();
            req.open('get', '/', true);
            req.addEventListener('readystatechange', function () {
                if (req.readyState === 4) {
                    // expect(Zone.current.name).toEqual('test');
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = interval;
                    done();
                }
            });
            req.send();
        });
    });
    it('should return origin listener when call xhr.onreadystatechange', (0, test_util_1.ifEnvSupportsWithDone)(test_util_1.supportPatchXHROnProperty, function (done) {
        testZone.run(function () {
            // sometimes this case will cause timeout
            // so we set it longer
            const req = new XMLHttpRequest();
            req.open('get', '/', true);
            const interval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
            const listener = (req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    jasmine.DEFAULT_TIMEOUT_INTERVAL = interval;
                    done();
                }
            });
            expect(req.onreadystatechange).toBe(listener);
            req.onreadystatechange = function () {
                return listener.call(this);
            };
            req.send();
        });
    }));
});
