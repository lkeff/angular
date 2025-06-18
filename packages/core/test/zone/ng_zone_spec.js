"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
const testing_internal_1 = require("../../testing/src/testing_internal");
const callback_scheduler_1 = require("../../src/util/callback_scheduler");
const global_1 = require("../../src/util/global");
const ng_zone_1 = require("../../src/zone/ng_zone");
const resultTimer = 1000;
// Schedules a macrotask (using a timer)
function macroTask(fn, timer = 1) {
    // adds longer timers for passing tests in IE and Edge
    setTimeout(fn, 1);
}
let _log;
let _errors;
let _traces;
let _zone;
const resolvedPromise = Promise.resolve(null);
function logOnError() {
    _zone.onError.subscribe({
        next: (error) => {
            // Error handler should run outside of the Angular zone.
            core_1.NgZone.assertNotInAngularZone();
            _errors.push(error);
            _traces.push(error.stack);
        },
    });
}
function logOnUnstable() {
    _zone.onUnstable.subscribe({ next: _log.fn('onUnstable') });
}
function logOnMicrotaskEmpty() {
    _zone.onMicrotaskEmpty.subscribe({ next: _log.fn('onMicrotaskEmpty') });
}
function logOnStable() {
    _zone.onStable.subscribe({ next: _log.fn('onStable') });
}
function runNgZoneNoLog(fn) {
    const length = _log.logItems.length;
    try {
        return _zone.run(fn);
    }
    finally {
        // delete anything which may have gotten logged.
        _log.logItems.length = length;
    }
}
describe('NgZone', () => {
    function createZone(enableLongStackTrace) {
        return new core_1.NgZone({ enableLongStackTrace: enableLongStackTrace });
    }
    beforeEach(() => {
        _log = new testing_internal_1.Log();
        _errors = [];
        _traces = [];
    });
    describe('long stack trace', () => {
        beforeEach(() => {
            _zone = createZone(true);
            logOnUnstable();
            logOnMicrotaskEmpty();
            logOnStable();
            logOnError();
        });
        commonTests();
        it('should produce long stack traces', (done) => {
            macroTask(() => {
                let resolve;
                const promise = new Promise((res) => {
                    resolve = res;
                });
                _zone.run(() => {
                    setTimeout(() => {
                        setTimeout(() => {
                            resolve(null);
                            throw new Error('ccc');
                        }, 0);
                    }, 0);
                });
                promise.then((_) => {
                    expect(_traces.length).toBe(1);
                    expect(_traces[0].length).toBeGreaterThan(1);
                    done();
                });
            });
        });
        it('should produce long stack traces (when using microtasks)', (done) => {
            macroTask(() => {
                let resolve;
                const promise = new Promise((res) => {
                    resolve = res;
                });
                _zone.run(() => {
                    queueMicrotask(() => {
                        queueMicrotask(() => {
                            resolve(null);
                            throw new Error('ddd');
                        });
                    });
                });
                promise.then((_) => {
                    expect(_traces.length).toBe(1);
                    expect(_traces[0].length).toBeGreaterThan(1);
                    done();
                });
            });
        });
    });
    describe('short stack trace', () => {
        beforeEach(() => {
            _zone = createZone(false);
            logOnUnstable();
            logOnMicrotaskEmpty();
            logOnStable();
            logOnError();
        });
        commonTests();
        it('should disable long stack traces', (done) => {
            macroTask(() => {
                let resolve;
                const promise = new Promise((res) => {
                    resolve = res;
                });
                _zone.run(() => {
                    setTimeout(() => {
                        setTimeout(() => {
                            resolve(null);
                            throw new Error('ccc');
                        }, 0);
                    }, 0);
                });
                promise.then((_) => {
                    expect(_traces.length).toBe(1);
                    if (_traces[0] != null) {
                        // some browsers don't have stack traces.
                        expect(_traces[0].indexOf('---')).toEqual(-1);
                    }
                    done();
                });
            });
        });
    });
});
describe('NoopNgZone', () => {
    const ngZone = new ng_zone_1.NoopNgZone();
    it('should run', () => {
        let runs = false;
        ngZone.run(() => {
            ngZone.runGuarded(() => {
                ngZone.runOutsideAngular(() => {
                    runs = true;
                });
            });
        });
        expect(runs).toBe(true);
    });
    it('should run with this context and arguments', () => {
        let runs = false;
        let applyThisArray = [];
        let applyArgsArray = [];
        const testContext = {};
        const testArgs = ['args'];
        ngZone.run(function (arg) {
            applyThisArray.push(this);
            applyArgsArray.push([arg]);
            ngZone.runGuarded(function (argGuarded) {
                applyThisArray.push(this);
                applyArgsArray.push([argGuarded]);
                ngZone.runOutsideAngular(function (argOutsideAngular) {
                    applyThisArray.push(this);
                    applyArgsArray.push([argOutsideAngular]);
                    runs = true;
                });
            }, this, [arg]);
        }, testContext, testArgs);
        expect(runs).toBe(true);
        expect(applyThisArray.length).toBe(3);
        expect(applyArgsArray.length).toBe(3);
        expect(applyThisArray[0]).toBe(testContext);
        expect(applyThisArray[1]).toBe(testContext);
        expect(applyThisArray[2]).not.toBe(testContext);
        expect(applyArgsArray[0]).toEqual(testArgs);
        expect(applyArgsArray[1]).toEqual(testArgs);
        expect(applyArgsArray[2]).toEqual([undefined]);
    });
    it('should have EventEmitter instances', () => {
        expect(ngZone.onError instanceof core_1.EventEmitter).toBe(true);
        expect(ngZone.onStable instanceof core_1.EventEmitter).toBe(true);
        expect(ngZone.onUnstable instanceof core_1.EventEmitter).toBe(true);
        expect(ngZone.onMicrotaskEmpty instanceof core_1.EventEmitter).toBe(true);
    });
});
function commonTests() {
    describe('hasPendingMicrotasks', () => {
        it('should be false', () => {
            expect(_zone.hasPendingMicrotasks).toBe(false);
        });
        it('should be true', () => {
            runNgZoneNoLog(() => {
                queueMicrotask(() => { });
            });
            expect(_zone.hasPendingMicrotasks).toBe(true);
        });
    });
    describe('hasPendingTimers', () => {
        it('should be false', () => {
            expect(_zone.hasPendingMacrotasks).toBe(false);
        });
        it('should be true', () => {
            runNgZoneNoLog(() => {
                setTimeout(() => { }, 0);
            });
            expect(_zone.hasPendingMacrotasks).toBe(true);
        });
    });
    describe('hasPendingAsyncTasks', () => {
        it('should be false', () => {
            expect(_zone.hasPendingMicrotasks).toBe(false);
        });
        it('should be true when microtask is scheduled', () => {
            runNgZoneNoLog(() => {
                queueMicrotask(() => { });
            });
            expect(_zone.hasPendingMicrotasks).toBe(true);
        });
        it('should be true when timer is scheduled', () => {
            runNgZoneNoLog(() => {
                setTimeout(() => { }, 0);
            });
            expect(_zone.hasPendingMacrotasks).toBe(true);
        });
    });
    describe('isInInnerZone', () => {
        it('should return whether the code executes in the inner zone', () => {
            expect(core_1.NgZone.isInAngularZone()).toEqual(false);
            runNgZoneNoLog(() => {
                expect(core_1.NgZone.isInAngularZone()).toEqual(true);
            });
        });
    });
    describe('run', () => {
        it('should return the body return value from run', (done) => {
            macroTask(() => {
                expect(_zone.run(() => 6)).toEqual(6);
            });
            macroTask(() => {
                done();
            });
        });
        it('should return the body return value from runTask', (done) => {
            macroTask(() => {
                expect(_zone.runTask(() => 6)).toEqual(6);
            });
            macroTask(() => {
                done();
            });
        });
        it('should call onUnstable and onMicrotaskEmpty', (done) => {
            runNgZoneNoLog(() => macroTask(_log.fn('run')));
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; run; onMicrotaskEmpty; onStable');
                done();
            });
        });
        it('should call onStable once at the end of event', (done) => {
            // The test is set up in a way that causes the zone loop to run onMicrotaskEmpty twice
            // then verified that onStable is only called once at the end
            runNgZoneNoLog(() => macroTask(_log.fn('run')));
            let times = 0;
            _zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    times++;
                    _log.add(`onMicrotaskEmpty ${times}`);
                    if (times < 2) {
                        // Scheduling a microtask causes a second digest
                        runNgZoneNoLog(() => {
                            queueMicrotask(() => { });
                        });
                    }
                },
            });
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; run; onMicrotaskEmpty; onMicrotaskEmpty 1; ' +
                    'onMicrotaskEmpty; onMicrotaskEmpty 2; onStable');
                done();
            }, resultTimer);
        });
        it('should call standalone onStable', (done) => {
            runNgZoneNoLog(() => macroTask(_log.fn('run')));
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; run; onMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
        xit('should run subscriber listeners in the subscription zone (outside)', (done) => {
            // Each subscriber fires a microtask outside the Angular zone. The test
            // then verifies that those microtasks do not cause additional digests.
            let turnStart = false;
            _zone.onUnstable.subscribe({
                next: () => {
                    if (turnStart)
                        throw 'Should not call this more than once';
                    _log.add('onUnstable');
                    queueMicrotask(() => { });
                    turnStart = true;
                },
            });
            let turnDone = false;
            _zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    if (turnDone)
                        throw 'Should not call this more than once';
                    _log.add('onMicrotaskEmpty');
                    queueMicrotask(() => { });
                    turnDone = true;
                },
            });
            let eventDone = false;
            _zone.onStable.subscribe({
                next: () => {
                    if (eventDone)
                        throw 'Should not call this more than once';
                    _log.add('onStable');
                    queueMicrotask(() => { });
                    eventDone = true;
                },
            });
            macroTask(() => {
                _zone.run(_log.fn('run'));
            });
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; run; onMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
        it('should run subscriber listeners in the subscription zone (inside)', (done) => {
            runNgZoneNoLog(() => macroTask(_log.fn('run')));
            // the only practical use-case to run a callback inside the zone is
            // change detection after "onMicrotaskEmpty". That's the only case tested.
            let turnDone = false;
            _zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    _log.add('onMyMicrotaskEmpty');
                    if (turnDone)
                        return;
                    _zone.run(() => {
                        queueMicrotask(() => { });
                    });
                    turnDone = true;
                },
            });
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; run; onMicrotaskEmpty; onMyMicrotaskEmpty; ' +
                    'onMicrotaskEmpty; onMyMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
        it('should run async tasks scheduled inside onStable outside Angular zone', (done) => {
            runNgZoneNoLog(() => macroTask(_log.fn('run')));
            _zone.onStable.subscribe({
                next: () => {
                    core_1.NgZone.assertNotInAngularZone();
                    _log.add('onMyTaskDone');
                },
            });
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; run; onMicrotaskEmpty; onStable; onMyTaskDone');
                done();
            });
        });
        it('should call onUnstable once before a turn and onMicrotaskEmpty once after the turn', (done) => {
            runNgZoneNoLog(() => {
                macroTask(() => {
                    _log.add('run start');
                    queueMicrotask(_log.fn('async'));
                    _log.add('run end');
                });
            });
            macroTask(() => {
                // The microtask (async) is executed after the macrotask (run)
                expect(_log.result()).toEqual('onUnstable; run start; run end; async; onMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
        it('should not run onUnstable and onMicrotaskEmpty for nested Zone.run', (done) => {
            runNgZoneNoLog(() => {
                macroTask(() => {
                    _log.add('start run');
                    _zone.run(() => {
                        _log.add('nested run');
                        queueMicrotask(_log.fn('nested run microtask'));
                    });
                    _log.add('end run');
                });
            });
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; start run; nested run; end run; nested run microtask; onMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
        it('should not run onUnstable and onMicrotaskEmpty for nested Zone.run invoked from onMicrotaskEmpty', (done) => {
            runNgZoneNoLog(() => macroTask(_log.fn('start run')));
            _zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    _log.add('onMicrotaskEmpty:started');
                    _zone.run(() => _log.add('nested run'));
                    _log.add('onMicrotaskEmpty:finished');
                },
            });
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; start run; onMicrotaskEmpty; onMicrotaskEmpty:started; nested run; onMicrotaskEmpty:finished; onStable');
                done();
            }, resultTimer);
        });
        it('should call onUnstable and onMicrotaskEmpty before and after each top-level run', (done) => {
            runNgZoneNoLog(() => macroTask(_log.fn('run1')));
            runNgZoneNoLog(() => macroTask(_log.fn('run2')));
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; run1; onMicrotaskEmpty; onStable; onUnstable; run2; onMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
        it('should call onUnstable and onMicrotaskEmpty before and after each turn', (done) => {
            let aResolve;
            let aPromise;
            let bResolve;
            let bPromise;
            runNgZoneNoLog(() => {
                macroTask(() => {
                    aPromise = new Promise((res) => {
                        aResolve = res;
                    });
                    bPromise = new Promise((res) => {
                        bResolve = res;
                    });
                    _log.add('run start');
                    aPromise.then(_log.fn('a then'));
                    bPromise.then(_log.fn('b then'));
                });
            });
            runNgZoneNoLog(() => {
                macroTask(() => {
                    aResolve('a');
                    bResolve('b');
                });
            });
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; run start; onMicrotaskEmpty; onStable; onUnstable; a then; b then; onMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
        it('should run a function outside of the angular zone', (done) => {
            macroTask(() => {
                _zone.runOutsideAngular(_log.fn('run'));
            });
            macroTask(() => {
                expect(_log.result()).toEqual('run');
                done();
            });
        });
        it('should call onUnstable and onMicrotaskEmpty when an inner microtask is scheduled from outside angular', (done) => {
            let resolve;
            let promise;
            macroTask(() => {
                core_1.NgZone.assertNotInAngularZone();
                promise = new Promise((res) => {
                    resolve = res;
                });
            });
            runNgZoneNoLog(() => {
                macroTask(() => {
                    core_1.NgZone.assertInAngularZone();
                    promise.then(_log.fn('executedMicrotask'));
                });
            });
            macroTask(() => {
                core_1.NgZone.assertNotInAngularZone();
                _log.add('scheduling a microtask');
                resolve(null);
            });
            macroTask(() => {
                expect(_log.result()).toEqual(
                // First VM turn => setup Promise then
                'onUnstable; onMicrotaskEmpty; onStable; ' +
                    // Second VM turn (outside of angular)
                    'scheduling a microtask; onUnstable; ' +
                    // Third VM Turn => execute the microtask (inside angular)
                    // No onUnstable;  because we don't own the task which started the turn.
                    'executedMicrotask; onMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
        it('should call onUnstable only before executing a microtask scheduled in onMicrotaskEmpty ' +
            'and not onMicrotaskEmpty after executing the task', (done) => {
            runNgZoneNoLog(() => macroTask(_log.fn('run')));
            let ran = false;
            _zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    _log.add('onMicrotaskEmpty(begin)');
                    if (!ran) {
                        _zone.run(() => {
                            queueMicrotask(() => {
                                ran = true;
                                _log.add('executedMicrotask');
                            });
                        });
                    }
                    _log.add('onMicrotaskEmpty(end)');
                },
            });
            macroTask(() => {
                expect(_log.result()).toEqual(
                // First VM turn => 'run' macrotask
                'onUnstable; run; onMicrotaskEmpty; onMicrotaskEmpty(begin); onMicrotaskEmpty(end); ' +
                    // Second microtaskDrain Turn => microtask enqueued from onMicrotaskEmpty
                    'executedMicrotask; onMicrotaskEmpty; onMicrotaskEmpty(begin); onMicrotaskEmpty(end); onStable');
                done();
            }, resultTimer);
        });
        it('should call onUnstable and onMicrotaskEmpty for a queueMicrotask in onMicrotaskEmpty triggered by ' +
            'a queueMicrotask in run', (done) => {
            runNgZoneNoLog(() => {
                macroTask(() => {
                    _log.add('queueMicrotask');
                    queueMicrotask(_log.fn('run(executeMicrotask)'));
                });
            });
            let ran = false;
            _zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    _log.add('onMicrotaskEmpty(begin)');
                    if (!ran) {
                        _log.add('onMicrotaskEmpty(queueMicrotask)');
                        _zone.run(() => {
                            queueMicrotask(() => {
                                ran = true;
                                _log.add('onMicrotaskEmpty(executeMicrotask)');
                            });
                        });
                    }
                    _log.add('onMicrotaskEmpty(end)');
                },
            });
            macroTask(() => {
                expect(_log.result()).toEqual(
                // First VM Turn => a macrotask + the microtask it enqueues
                'onUnstable; queueMicrotask; run(executeMicrotask); onMicrotaskEmpty; onMicrotaskEmpty(begin); onMicrotaskEmpty(queueMicrotask); onMicrotaskEmpty(end); ' +
                    // Second VM Turn => the microtask enqueued from onMicrotaskEmpty
                    'onMicrotaskEmpty(executeMicrotask); onMicrotaskEmpty; onMicrotaskEmpty(begin); onMicrotaskEmpty(end); onStable');
                done();
            }, resultTimer);
        });
        it('should execute promises scheduled in onUnstable before promises scheduled in run', (done) => {
            runNgZoneNoLog(() => {
                macroTask(() => {
                    _log.add('run start');
                    resolvedPromise
                        .then((_) => {
                        _log.add('promise then');
                        resolvedPromise.then(_log.fn('promise foo'));
                        return Promise.resolve(null);
                    })
                        .then(_log.fn('promise bar'));
                    _log.add('run end');
                });
            });
            let donePromiseRan = false;
            let startPromiseRan = false;
            _zone.onUnstable.subscribe({
                next: () => {
                    _log.add('onUnstable(begin)');
                    if (!startPromiseRan) {
                        _log.add('onUnstable(schedulePromise)');
                        _zone.run(() => {
                            queueMicrotask(_log.fn('onUnstable(executePromise)'));
                        });
                        startPromiseRan = true;
                    }
                    _log.add('onUnstable(end)');
                },
            });
            _zone.onMicrotaskEmpty.subscribe({
                next: () => {
                    _log.add('onMicrotaskEmpty(begin)');
                    if (!donePromiseRan) {
                        _log.add('onMicrotaskEmpty(schedulePromise)');
                        _zone.run(() => {
                            queueMicrotask(_log.fn('onMicrotaskEmpty(executePromise)'));
                        });
                        donePromiseRan = true;
                    }
                    _log.add('onMicrotaskEmpty(end)');
                },
            });
            macroTask(() => {
                expect(_log.result()).toEqual(
                // First VM turn: enqueue a microtask in onUnstable
                'onUnstable; onUnstable(begin); onUnstable(schedulePromise); onUnstable(end); ' +
                    // First VM turn: execute the macrotask which enqueues microtasks
                    'run start; run end; ' +
                    // First VM turn: execute enqueued microtasks
                    'onUnstable(executePromise); promise then; promise foo; promise bar; onMicrotaskEmpty; ' +
                    // First VM turn: onTurnEnd, enqueue a microtask
                    'onMicrotaskEmpty(begin); onMicrotaskEmpty(schedulePromise); onMicrotaskEmpty(end); ' +
                    // Second VM turn: execute the microtask from onTurnEnd
                    'onMicrotaskEmpty(executePromise); onMicrotaskEmpty; onMicrotaskEmpty(begin); onMicrotaskEmpty(end); onStable');
                done();
            }, resultTimer);
        });
        it('should call onUnstable and onMicrotaskEmpty before and after each turn, respectively', (done) => {
            let aResolve;
            let aPromise;
            let bResolve;
            let bPromise;
            runNgZoneNoLog(() => {
                macroTask(() => {
                    aPromise = new Promise((res) => {
                        aResolve = res;
                    });
                    bPromise = new Promise((res) => {
                        bResolve = res;
                    });
                    aPromise.then(_log.fn('a then'));
                    bPromise.then(_log.fn('b then'));
                    _log.add('run start');
                });
            });
            runNgZoneNoLog(() => {
                macroTask(() => {
                    aResolve(null);
                }, 10);
            });
            runNgZoneNoLog(() => {
                macroTask(() => {
                    bResolve(null);
                }, 20);
            });
            macroTask(() => {
                expect(_log.result()).toEqual(
                // First VM turn
                'onUnstable; run start; onMicrotaskEmpty; onStable; ' +
                    // Second VM turn
                    'onUnstable; a then; onMicrotaskEmpty; onStable; ' +
                    // Third VM turn
                    'onUnstable; b then; onMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
        it('should call onUnstable and onMicrotaskEmpty before and after (respectively) all turns in a chain', (done) => {
            runNgZoneNoLog(() => {
                macroTask(() => {
                    _log.add('run start');
                    queueMicrotask(() => {
                        _log.add('async1');
                        queueMicrotask(_log.fn('async2'));
                    });
                    _log.add('run end');
                });
            });
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; run start; run end; async1; async2; onMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
        it('should call onUnstable and onMicrotaskEmpty for promises created outside of run body', (done) => {
            let promise;
            runNgZoneNoLog(() => {
                macroTask(() => {
                    _zone.runOutsideAngular(() => {
                        promise = Promise.resolve(4).then((x) => Promise.resolve(x));
                    });
                    promise.then(_log.fn('promise then'));
                    _log.add('zone run');
                });
            });
            macroTask(() => {
                expect(_log.result()).toEqual('onUnstable; zone run; onMicrotaskEmpty; onStable; ' +
                    'onUnstable; promise then; onMicrotaskEmpty; onStable');
                done();
            }, resultTimer);
        });
    });
    describe('exceptions', () => {
        it('should call the on error callback when it is invoked via zone.runGuarded', (done) => {
            macroTask(() => {
                const exception = new Error('sync');
                _zone.runGuarded(() => {
                    throw exception;
                });
                expect(_errors.length).toBe(1);
                expect(_errors[0]).toBe(exception);
                done();
            });
        });
        it('should not call the on error callback but rethrow when it is invoked via zone.run', (done) => {
            macroTask(() => {
                const exception = new Error('sync');
                expect(() => _zone.run(() => {
                    throw exception;
                })).toThrowError('sync');
                expect(_errors.length).toBe(0);
                done();
            });
        });
        it('should call onError for errors from microtasks', (done) => {
            const exception = new Error('async');
            macroTask(() => {
                _zone.run(() => {
                    queueMicrotask(() => {
                        throw exception;
                    });
                });
            });
            macroTask(() => {
                expect(_errors.length).toBe(1);
                expect(_errors[0]).toEqual(exception);
                done();
            }, resultTimer);
        });
    });
    describe('bugs', () => {
        describe('#10503', () => {
            let ngZone;
            beforeEach((0, testing_1.inject)([core_1.NgZone], (_ngZone) => {
                // Create a zone outside the fakeAsync.
                ngZone = _ngZone;
            }));
            it('should fakeAsync even if the NgZone was created outside.', (0, testing_1.fakeAsync)(() => {
                let result = null;
                // try to escape the current fakeAsync zone by using NgZone which was created outside.
                ngZone.run(() => {
                    Promise.resolve('works').then((v) => (result = v));
                    (0, testing_1.flushMicrotasks)();
                });
                expect(result).toEqual('works');
            }));
            describe('async', () => {
                let asyncResult;
                const waitLongerThenTestFrameworkAsyncTimeout = 5;
                beforeEach(() => {
                    asyncResult = null;
                });
                it('should async even if the NgZone was created outside.', (0, testing_1.waitForAsync)(() => {
                    // try to escape the current async zone by using NgZone which was created outside.
                    ngZone.run(() => {
                        setTimeout(() => {
                            Promise.resolve('works').then((v) => (asyncResult = v));
                        }, waitLongerThenTestFrameworkAsyncTimeout);
                    });
                }));
                afterEach(() => {
                    expect(asyncResult).toEqual('works');
                });
            });
        });
        it('coalescing can work with fakeAsync', (0, testing_1.fakeAsync)(() => {
            if (!isBrowser) {
                return;
            }
            let OuterComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          <div class="clickable" (click)="clicked = true"></div>
          {{clicked ? 'clicked' : '' }}
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OuterComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "OuterComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OuterComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OuterComponent = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, core_1.provideZoneChangeDetection)({ eventCoalescing: true, scheduleInRootZone: false }),
                ],
            });
            const fixture = testing_1.TestBed.createComponent(OuterComponent);
            fixture.autoDetectChanges();
            document.querySelector('.clickable').dispatchEvent(new MouseEvent('click'));
            (0, testing_1.flush)();
            expect(fixture.nativeElement.innerText).toContain('clicked');
        }));
    });
    describe('coalescing', () => {
        it('should execute callback when a view transition is waiting for the callback to complete', () => __awaiter(this, void 0, void 0, function* () {
            if (!document.startViewTransition) {
                return;
            }
            const startTime = performance.now();
            // When there is a pending view transition, `requestAnimationFrame` is blocked
            // because the browser is waiting to take a screenshot. This test ensures that
            // the scheduler does not block completion of the transition for too long.
            // This test would fail if the scheduling function _only_ used `rAF`
            // but works if there is another mechanism as well (i.e. race with setTimeout).
            // https://github.com/angular/angular/issues/54544
            const transition = document.startViewTransition(() => {
                return new Promise((resolve) => {
                    (0, callback_scheduler_1.scheduleCallbackWithRafRace)(() => {
                        resolve();
                    });
                });
            });
            yield transition.finished;
            expect(performance.now() - startTime).toBeLessThan(2000);
        }));
        describe('shouldCoalesceRunChangeDetection = false, shouldCoalesceEventChangeDetection = false', () => {
            let notCoalesceZone;
            let logs = [];
            beforeEach(() => {
                notCoalesceZone = new core_1.NgZone({});
                logs = [];
                notCoalesceZone.onMicrotaskEmpty.subscribe(() => {
                    logs.push('microTask empty');
                });
            });
            it('should run sync', () => {
                notCoalesceZone.run(() => { });
                expect(logs).toEqual(['microTask empty']);
            });
            it('should emit onMicroTaskEmpty multiple times within the same event loop for multiple ngZone.run', () => {
                notCoalesceZone.run(() => { });
                notCoalesceZone.run(() => { });
                expect(logs).toEqual(['microTask empty', 'microTask empty']);
            });
            it('should emit onMicroTaskEmpty multiple times within the same event loop for multiple tasks', () => {
                const tasks = [];
                notCoalesceZone.run(() => {
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask1');
                    }, undefined, () => { }));
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask2');
                    }, undefined, () => { }));
                    tasks.push(Zone.current.scheduleMacroTask('myMacro', () => {
                        logs.push('macroTask');
                    }, undefined, () => { }));
                });
                tasks.forEach((t) => t.invoke());
                expect(logs).toEqual([
                    'microTask empty',
                    'eventTask1',
                    'microTask empty',
                    'eventTask2',
                    'microTask empty',
                    'macroTask',
                    'microTask empty',
                ]);
            });
        });
        describe('shouldCoalesceEventChangeDetection = true, shouldCoalesceRunChangeDetection = false', () => {
            let nativeSetTimeout = global_1.global[Zone.__symbol__('setTimeout')];
            let patchedImmediate;
            let coalesceZone;
            let logs = [];
            beforeEach(() => {
                patchedImmediate = global_1.global.setImmediate;
                global_1.global.setImmediate = global_1.global[Zone.__symbol__('setImmediate')];
                coalesceZone = new core_1.NgZone({ shouldCoalesceEventChangeDetection: true });
                logs = [];
                coalesceZone.onMicrotaskEmpty.subscribe(() => {
                    logs.push('microTask empty');
                });
            });
            afterEach(() => {
                global_1.global.setImmediate = patchedImmediate;
            });
            it('should run in requestAnimationFrame async', (done) => {
                let task = undefined;
                coalesceZone.run(() => {
                    task = Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('myEvent');
                    }, undefined, () => { });
                });
                task.invoke();
                expect(logs).toEqual(['microTask empty', 'myEvent']);
                (0, callback_scheduler_1.scheduleCallbackWithRafRace)(() => {
                    expect(logs).toEqual(['microTask empty', 'myEvent', 'microTask empty']);
                    done();
                });
            });
            it('should only emit onMicroTaskEmpty once within the same event loop for multiple event tasks', (done) => {
                const tasks = [];
                coalesceZone.run(() => {
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask1');
                    }, undefined, () => { }));
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask2');
                    }, undefined, () => { }));
                });
                tasks.forEach((t) => t.invoke());
                expect(logs).toEqual(['microTask empty', 'eventTask1', 'eventTask2']);
                (0, callback_scheduler_1.scheduleCallbackWithRafRace)(() => {
                    expect(logs).toEqual(['microTask empty', 'eventTask1', 'eventTask2', 'microTask empty']);
                    done();
                });
            });
            it('should only emit onMicroTaskEmpty once within the same event loop for ngZone.run in onMicrotaskEmpty subscription', (done) => {
                const tasks = [];
                coalesceZone.onMicrotaskEmpty.subscribe(() => {
                    coalesceZone.run(() => { });
                });
                coalesceZone.run(() => {
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask1');
                    }, undefined, () => { }));
                });
                coalesceZone.run(() => {
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask2');
                    }, undefined, () => { }));
                });
                tasks.forEach((t) => t.invoke());
                expect(logs).toEqual(['microTask empty', 'microTask empty', 'eventTask1', 'eventTask2']);
                nativeSetTimeout(() => {
                    expect(logs).toEqual([
                        'microTask empty',
                        'microTask empty',
                        'eventTask1',
                        'eventTask2',
                        'microTask empty',
                    ]);
                    done();
                }, 100);
            });
            it('should emit onMicroTaskEmpty once within the same event loop for not only event tasks, but event tasks are before other tasks', (done) => {
                const tasks = [];
                coalesceZone.run(() => {
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask1');
                    }, undefined, () => { }));
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask2');
                    }, undefined, () => { }));
                    tasks.push(Zone.current.scheduleMacroTask('myMacro', () => {
                        logs.push('macroTask');
                    }, undefined, () => { }));
                });
                tasks.forEach((t) => t.invoke());
                expect(logs).toEqual(['microTask empty', 'eventTask1', 'eventTask2', 'macroTask']);
                (0, callback_scheduler_1.scheduleCallbackWithRafRace)(() => {
                    expect(logs).toEqual([
                        'microTask empty',
                        'eventTask1',
                        'eventTask2',
                        'macroTask',
                        'microTask empty',
                    ]);
                    done();
                });
            });
            it('should emit multiple onMicroTaskEmpty within the same event loop for not only event tasks, but event tasks are after other tasks', (done) => {
                const tasks = [];
                coalesceZone.run(() => {
                    tasks.push(Zone.current.scheduleMacroTask('myMacro', () => {
                        logs.push('macroTask');
                    }, undefined, () => { }));
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask1');
                    }, undefined, () => { }));
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask2');
                    }, undefined, () => { }));
                });
                tasks.forEach((t) => t.invoke());
                expect(logs).toEqual([
                    'microTask empty',
                    'macroTask',
                    'microTask empty',
                    'eventTask1',
                    'eventTask2',
                ]);
                (0, callback_scheduler_1.scheduleCallbackWithRafRace)(() => {
                    expect(logs).toEqual([
                        'microTask empty',
                        'macroTask',
                        'microTask empty',
                        'eventTask1',
                        'eventTask2',
                        'microTask empty',
                    ]);
                    done();
                });
            });
        });
        describe('shouldCoalesceRunChangeDetection = true', () => {
            let nativeSetTimeout = global_1.global[Zone.__symbol__('setTimeout')];
            let patchedImmediate;
            let coalesceZone;
            let logs = [];
            beforeEach(() => {
                patchedImmediate = global_1.global.setImmediate;
                global_1.global.setImmediate = global_1.global[Zone.__symbol__('setImmediate')];
                coalesceZone = new core_1.NgZone({ shouldCoalesceRunChangeDetection: true });
                logs = [];
                coalesceZone.onMicrotaskEmpty.subscribe(() => {
                    logs.push('microTask empty');
                });
            });
            afterEach(() => {
                global_1.global.setImmediate = patchedImmediate;
            });
            it('should run in requestAnimationFrame async', (done) => {
                coalesceZone.run(() => { });
                expect(logs).toEqual([]);
                (0, callback_scheduler_1.scheduleCallbackWithRafRace)(() => {
                    expect(logs).toEqual(['microTask empty']);
                    done();
                });
            });
            it('should only emit onMicroTaskEmpty once within the same event loop for multiple ngZone.run', (done) => {
                coalesceZone.run(() => { });
                coalesceZone.run(() => { });
                expect(logs).toEqual([]);
                (0, callback_scheduler_1.scheduleCallbackWithRafRace)(() => {
                    expect(logs).toEqual(['microTask empty']);
                    done();
                });
            });
            it('should only emit onMicroTaskEmpty once within the same event loop for ngZone.run in onMicrotaskEmpty subscription', (done) => {
                coalesceZone.onMicrotaskEmpty.subscribe(() => {
                    coalesceZone.run(() => { });
                });
                coalesceZone.run(() => { });
                coalesceZone.run(() => { });
                expect(logs).toEqual([]);
                nativeSetTimeout(() => {
                    expect(logs).toEqual(['microTask empty']);
                    done();
                }, 100);
            });
            it('should only emit onMicroTaskEmpty once within the same event loop for multiple tasks', (done) => {
                const tasks = [];
                coalesceZone.run(() => {
                    tasks.push(Zone.current.scheduleMacroTask('myMacro', () => {
                        logs.push('macroTask');
                    }, undefined, () => { }));
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask1');
                    }, undefined, () => { }));
                    tasks.push(Zone.current.scheduleEventTask('myEvent', () => {
                        logs.push('eventTask2');
                    }, undefined, () => { }));
                    tasks.push(Zone.current.scheduleMacroTask('myMacro', () => {
                        logs.push('macroTask');
                    }, undefined, () => { }));
                });
                tasks.forEach((t) => t.invoke());
                expect(logs).toEqual(['macroTask', 'eventTask1', 'eventTask2', 'macroTask']);
                (0, callback_scheduler_1.scheduleCallbackWithRafRace)(() => {
                    expect(logs).toEqual([
                        'macroTask',
                        'eventTask1',
                        'eventTask2',
                        'macroTask',
                        'microTask empty',
                    ]);
                    done();
                });
            });
            it('does not throw when apply args array has `undefined`', () => __awaiter(this, void 0, void 0, function* () {
                expect(() => {
                    coalesceZone.run(function (arg) { }, undefined, [undefined]);
                }).not.toThrow();
                // wait for the zone to stabilize after the task above. Needed to prevent this from leaking
                // into a follow-up test
                yield (0, rxjs_1.firstValueFrom)(coalesceZone.onMicrotaskEmpty);
            }));
        });
    });
}
