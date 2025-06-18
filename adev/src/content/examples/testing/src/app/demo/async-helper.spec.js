"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
describe('Angular async helper', () => {
    describe('async', () => {
        let actuallyDone = false;
        beforeEach(() => {
            actuallyDone = false;
        });
        afterEach(() => {
            expect(actuallyDone).withContext('actuallyDone should be true').toBe(true);
        });
        it('should run normal test', () => {
            actuallyDone = true;
        });
        it('should run normal async test', (done) => {
            setTimeout(() => {
                actuallyDone = true;
                done();
            }, 0);
        });
        it('should run async test with task', (0, testing_1.waitForAsync)(() => {
            setTimeout(() => {
                actuallyDone = true;
            }, 0);
        }));
        it('should run async test with task', (0, testing_1.waitForAsync)(() => {
            const id = setInterval(() => {
                actuallyDone = true;
                clearInterval(id);
            }, 100);
        }));
        it('should run async test with successful promise', (0, testing_1.waitForAsync)(() => {
            const p = new Promise((resolve) => {
                setTimeout(resolve, 10);
            });
            p.then(() => {
                actuallyDone = true;
            });
        }));
        it('should run async test with failed promise', (0, testing_1.waitForAsync)(() => {
            const p = new Promise((resolve, reject) => {
                setTimeout(reject, 10);
            });
            p.catch(() => {
                actuallyDone = true;
            });
        }));
        // Use done. Can also use async or fakeAsync.
        it('should run async test with successful delayed Observable', (done) => {
            const source = (0, rxjs_1.of)(true).pipe((0, operators_1.delay)(10));
            source.subscribe({
                next: (val) => (actuallyDone = true),
                error: (err) => fail(err),
                complete: done,
            });
        });
        it('should run async test with successful delayed Observable', (0, testing_1.waitForAsync)(() => {
            const source = (0, rxjs_1.of)(true).pipe((0, operators_1.delay)(10));
            source.subscribe({
                next: (val) => (actuallyDone = true),
                error: (err) => fail(err),
            });
        }));
        it('should run async test with successful delayed Observable', (0, testing_1.fakeAsync)(() => {
            const source = (0, rxjs_1.of)(true).pipe((0, operators_1.delay)(10));
            source.subscribe({
                next: (val) => (actuallyDone = true),
                error: (err) => fail(err),
            });
            (0, testing_1.tick)(10);
        }));
    });
    describe('fakeAsync', () => {
        // #docregion fake-async-test-tick
        it('should run timeout callback with delay after call tick with millis', (0, testing_1.fakeAsync)(() => {
            let called = false;
            setTimeout(() => {
                called = true;
            }, 100);
            (0, testing_1.tick)(100);
            expect(called).toBe(true);
        }));
        // #enddocregion fake-async-test-tick
        // #docregion fake-async-test-tick-new-macro-task-sync
        it('should run new macro task callback with delay after call tick with millis', (0, testing_1.fakeAsync)(() => {
            function nestedTimer(cb) {
                setTimeout(() => setTimeout(() => cb()));
            }
            const callback = jasmine.createSpy('callback');
            nestedTimer(callback);
            expect(callback).not.toHaveBeenCalled();
            (0, testing_1.tick)(0);
            // the nested timeout will also be triggered
            expect(callback).toHaveBeenCalled();
        }));
        // #enddocregion fake-async-test-tick-new-macro-task-sync
        // #docregion fake-async-test-tick-new-macro-task-async
        it('should not run new macro task callback with delay after call tick with millis', (0, testing_1.fakeAsync)(() => {
            function nestedTimer(cb) {
                setTimeout(() => setTimeout(() => cb()));
            }
            const callback = jasmine.createSpy('callback');
            nestedTimer(callback);
            expect(callback).not.toHaveBeenCalled();
            (0, testing_1.tick)(0, { processNewMacroTasksSynchronously: false });
            // the nested timeout will not be triggered
            expect(callback).not.toHaveBeenCalled();
            (0, testing_1.tick)(0);
            expect(callback).toHaveBeenCalled();
        }));
        // #enddocregion fake-async-test-tick-new-macro-task-async
        // #docregion fake-async-test-date
        it('should get Date diff correctly in fakeAsync', (0, testing_1.fakeAsync)(() => {
            const start = Date.now();
            (0, testing_1.tick)(100);
            const end = Date.now();
            expect(end - start).toBe(100);
        }));
        // #enddocregion fake-async-test-date
        // #docregion fake-async-test-rxjs
        it('should get Date diff correctly in fakeAsync with rxjs scheduler', (0, testing_1.fakeAsync)(() => {
            // need to add `import 'zone.js/plugins/zone-patch-rxjs-fake-async'
            // to patch rxjs scheduler
            let result = '';
            (0, rxjs_1.of)('hello')
                .pipe((0, operators_1.delay)(1000))
                .subscribe((v) => {
                result = v;
            });
            expect(result).toBe('');
            (0, testing_1.tick)(1000);
            expect(result).toBe('hello');
            const start = new Date().getTime();
            let dateDiff = 0;
            (0, rxjs_1.interval)(1000)
                .pipe((0, operators_1.take)(2))
                .subscribe(() => (dateDiff = new Date().getTime() - start));
            (0, testing_1.tick)(1000);
            expect(dateDiff).toBe(1000);
            (0, testing_1.tick)(1000);
            expect(dateDiff).toBe(2000);
        }));
        // #enddocregion fake-async-test-rxjs
    });
    // #docregion fake-async-test-clock
    describe('use jasmine.clock()', () => {
        // need to config __zone_symbol__fakeAsyncPatchLock flag
        // before loading zone.js/testing
        beforeEach(() => {
            jasmine.clock().install();
        });
        afterEach(() => {
            jasmine.clock().uninstall();
        });
        it('should auto enter fakeAsync', () => {
            // is in fakeAsync now, don't need to call fakeAsync(testFn)
            let called = false;
            setTimeout(() => {
                called = true;
            }, 100);
            jasmine.clock().tick(100);
            expect(called).toBe(true);
        });
    });
    // #enddocregion fake-async-test-clock
    describe('test jsonp', () => {
        function jsonp(url, callback) {
            // do a jsonp call which is not zone aware
        }
        // need to config __zone_symbol__supportWaitUnResolvedChainedPromise flag
        // before loading zone.js/testing
        it('should wait until promise.then is called', (0, testing_1.waitForAsync)(() => {
            let finished = false;
            new Promise((res) => {
                jsonp('localhost:8080/jsonp', () => {
                    // success callback and resolve the promise
                    finished = true;
                    res();
                });
            }).then(() => {
                // async will wait until promise.then is called
                // if __zone_symbol__supportWaitUnResolvedChainedPromise is set
                expect(finished).toBe(true);
            });
        }));
    });
});
