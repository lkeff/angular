"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("../testing");
const testing_internal_1 = require("../testing/src/testing_internal");
const platform_browser_1 = require("@angular/platform-browser");
const resolvedPromise = Promise.resolve(null);
const ProxyZoneSpec = Zone['ProxyZoneSpec'];
describe('fake async', () => {
    it('should run synchronous code', () => {
        let ran = false;
        (0, testing_1.fakeAsync)(() => {
            ran = true;
        })();
        expect(ran).toEqual(true);
    });
    it('should pass arguments to the wrapped function', () => {
        (0, testing_1.fakeAsync)((foo, bar) => {
            expect(foo).toEqual('foo');
            expect(bar).toEqual('bar');
        })('foo', 'bar');
    });
    it('should work with inject()', (0, testing_1.fakeAsync)((0, testing_1.inject)([platform_browser_1.EventManager], (eventManager) => {
        expect(eventManager).toBeInstanceOf(platform_browser_1.EventManager);
    })));
    it('should throw on nested calls', () => {
        expect(() => {
            (0, testing_1.fakeAsync)(() => {
                (0, testing_1.fakeAsync)(() => null)();
            })();
        }).toThrowError('fakeAsync() calls can not be nested');
    });
    it('should flush microtasks before returning', () => {
        let thenRan = false;
        (0, testing_1.fakeAsync)(() => {
            resolvedPromise.then((_) => {
                thenRan = true;
            });
        })();
        expect(thenRan).toEqual(true);
    });
    it('should propagate the return value', () => {
        expect((0, testing_1.fakeAsync)(() => 'foo')()).toEqual('foo');
    });
    describe('Promise', () => {
        it('should run asynchronous code', (0, testing_1.fakeAsync)(() => {
            let thenRan = false;
            resolvedPromise.then((_) => {
                thenRan = true;
            });
            expect(thenRan).toEqual(false);
            (0, testing_1.flushMicrotasks)();
            expect(thenRan).toEqual(true);
        }));
        it('should run chained thens', (0, testing_1.fakeAsync)(() => {
            const log = new testing_internal_1.Log();
            resolvedPromise.then((_) => log.add(1)).then((_) => log.add(2));
            expect(log.result()).toEqual('');
            (0, testing_1.flushMicrotasks)();
            expect(log.result()).toEqual('1; 2');
        }));
        it('should run Promise created in Promise', (0, testing_1.fakeAsync)(() => {
            const log = new testing_internal_1.Log();
            resolvedPromise.then((_) => {
                log.add(1);
                resolvedPromise.then((_) => log.add(2));
            });
            expect(log.result()).toEqual('');
            (0, testing_1.flushMicrotasks)();
            expect(log.result()).toEqual('1; 2');
        }));
        it('should complain if the test throws an exception during async calls', () => {
            expect(() => {
                (0, testing_1.fakeAsync)(() => {
                    resolvedPromise.then((_) => {
                        throw new Error('async');
                    });
                    (0, testing_1.flushMicrotasks)();
                })();
            }).toThrow();
        });
        it('should complain if a test throws an exception', () => {
            expect(() => {
                (0, testing_1.fakeAsync)(() => {
                    throw new Error('sync');
                })();
            }).toThrowError('sync');
        });
    });
    describe('timers', () => {
        it('should run queued zero duration timer on zero tick', (0, testing_1.fakeAsync)(() => {
            let ran = false;
            setTimeout(() => {
                ran = true;
            }, 0);
            expect(ran).toEqual(false);
            (0, testing_1.tick)();
            expect(ran).toEqual(true);
        }));
        it('should run queued timer after sufficient clock ticks', (0, testing_1.fakeAsync)(() => {
            let ran = false;
            setTimeout(() => {
                ran = true;
            }, 10);
            (0, testing_1.tick)(6);
            expect(ran).toEqual(false);
            (0, testing_1.tick)(6);
            expect(ran).toEqual(true);
        }));
        it('should run new macro tasks created by timer callback', (0, testing_1.fakeAsync)(() => {
            function nestedTimer(callback) {
                setTimeout(() => setTimeout(() => callback()));
            }
            const callback = jasmine.createSpy('callback');
            nestedTimer(callback);
            expect(callback).not.toHaveBeenCalled();
            (0, testing_1.tick)(0);
            expect(callback).toHaveBeenCalled();
        }));
        it('should not queue nested timer on tick with processNewMacroTasksSynchronously=false', (0, testing_1.fakeAsync)(() => {
            function nestedTimer(callback) {
                setTimeout(() => setTimeout(() => callback()));
            }
            const callback = jasmine.createSpy('callback');
            nestedTimer(callback);
            expect(callback).not.toHaveBeenCalled();
            (0, testing_1.tick)(0, { processNewMacroTasksSynchronously: false });
            expect(callback).not.toHaveBeenCalled();
            (0, testing_1.flush)();
            expect(callback).toHaveBeenCalled();
        }));
        it('should run queued timer only once', (0, testing_1.fakeAsync)(() => {
            let cycles = 0;
            setTimeout(() => {
                cycles++;
            }, 10);
            (0, testing_1.tick)(10);
            expect(cycles).toEqual(1);
            (0, testing_1.tick)(10);
            expect(cycles).toEqual(1);
            (0, testing_1.tick)(10);
            expect(cycles).toEqual(1);
        }));
        it('should not run cancelled timer', (0, testing_1.fakeAsync)(() => {
            let ran = false;
            const id = setTimeout(() => {
                ran = true;
            }, 10);
            clearTimeout(id);
            (0, testing_1.tick)(10);
            expect(ran).toEqual(false);
        }));
        it('should throw an error on dangling timers', () => {
            expect(() => {
                (0, testing_1.fakeAsync)(() => {
                    setTimeout(() => { }, 10);
                }, { flush: false })();
            }).toThrowError('1 timer(s) still in the queue.');
        });
        it('should throw an error on dangling periodic timers', () => {
            expect(() => {
                (0, testing_1.fakeAsync)(() => {
                    setInterval(() => { }, 10);
                }, { flush: false })();
            }).toThrowError('1 periodic timer(s) still in the queue.');
        });
        it('should run periodic timers', (0, testing_1.fakeAsync)(() => {
            let cycles = 0;
            const id = setInterval(() => {
                cycles++;
            }, 10);
            (0, testing_1.tick)(10);
            expect(cycles).toEqual(1);
            (0, testing_1.tick)(10);
            expect(cycles).toEqual(2);
            (0, testing_1.tick)(10);
            expect(cycles).toEqual(3);
            clearInterval(id);
        }));
        it('should not run cancelled periodic timer', (0, testing_1.fakeAsync)(() => {
            let ran = false;
            const id = setInterval(() => {
                ran = true;
            }, 10);
            clearInterval(id);
            (0, testing_1.tick)(10);
            expect(ran).toEqual(false);
        }));
        it('should be able to cancel periodic timers from a callback', (0, testing_1.fakeAsync)(() => {
            let cycles = 0;
            const id = setInterval(() => {
                cycles++;
                clearInterval(id);
            }, 10);
            (0, testing_1.tick)(10);
            expect(cycles).toEqual(1);
            (0, testing_1.tick)(10);
            expect(cycles).toEqual(1);
        }));
        it('should clear periodic timers', (0, testing_1.fakeAsync)(() => {
            let cycles = 0;
            setInterval(() => {
                cycles++;
            }, 10);
            (0, testing_1.tick)(10);
            expect(cycles).toEqual(1);
            (0, testing_1.discardPeriodicTasks)();
            // Tick once to clear out the timer which already started.
            (0, testing_1.tick)(10);
            expect(cycles).toEqual(2);
            (0, testing_1.tick)(10);
            // Nothing should change
            expect(cycles).toEqual(2);
        }));
        it('should process microtasks before timers', (0, testing_1.fakeAsync)(() => {
            const log = new testing_internal_1.Log();
            resolvedPromise.then((_) => log.add('microtask'));
            setTimeout(() => log.add('timer'), 9);
            const id = setInterval(() => log.add('periodic timer'), 10);
            expect(log.result()).toEqual('');
            (0, testing_1.tick)(10);
            expect(log.result()).toEqual('microtask; timer; periodic timer');
            clearInterval(id);
        }));
        it('should process micro-tasks created in timers before next timers', (0, testing_1.fakeAsync)(() => {
            const log = new testing_internal_1.Log();
            resolvedPromise.then((_) => log.add('microtask'));
            setTimeout(() => {
                log.add('timer');
                resolvedPromise.then((_) => log.add('t microtask'));
            }, 9);
            const id = setInterval(() => {
                log.add('periodic timer');
                resolvedPromise.then((_) => log.add('pt microtask'));
            }, 10);
            (0, testing_1.tick)(10);
            expect(log.result()).toEqual('microtask; timer; t microtask; periodic timer; pt microtask');
            (0, testing_1.tick)(10);
            expect(log.result()).toEqual('microtask; timer; t microtask; periodic timer; pt microtask; periodic timer; pt microtask');
            clearInterval(id);
        }));
        it('should flush tasks', (0, testing_1.fakeAsync)(() => {
            let ran = false;
            setTimeout(() => {
                ran = true;
            }, 10);
            (0, testing_1.flush)();
            expect(ran).toEqual(true);
        }));
        it('should flush multiple tasks', (0, testing_1.fakeAsync)(() => {
            let ran = false;
            let ran2 = false;
            setTimeout(() => {
                ran = true;
            }, 10);
            setTimeout(() => {
                ran2 = true;
            }, 30);
            let elapsed = (0, testing_1.flush)();
            expect(ran).toEqual(true);
            expect(ran2).toEqual(true);
            expect(elapsed).toEqual(30);
        }));
        it('should move periodic tasks', (0, testing_1.fakeAsync)(() => {
            let ran = false;
            let count = 0;
            setInterval(() => {
                count++;
            }, 10);
            setTimeout(() => {
                ran = true;
            }, 35);
            let elapsed = (0, testing_1.flush)();
            expect(count).toEqual(3);
            expect(ran).toEqual(true);
            expect(elapsed).toEqual(35);
            (0, testing_1.discardPeriodicTasks)();
        }));
    });
    describe('outside of the fakeAsync zone', () => {
        it('calling flushMicrotasks should throw', () => {
            expect(() => {
                (0, testing_1.flushMicrotasks)();
            }).toThrowError('The code should be running in the fakeAsync zone to call this function');
        });
        it('calling tick should throw', () => {
            expect(() => {
                (0, testing_1.tick)();
            }).toThrowError('The code should be running in the fakeAsync zone to call this function');
        });
        it('calling flush should throw', () => {
            expect(() => {
                (0, testing_1.flush)();
            }).toThrowError('The code should be running in the fakeAsync zone to call this function');
        });
        it('calling discardPeriodicTasks should throw', () => {
            expect(() => {
                (0, testing_1.discardPeriodicTasks)();
            }).toThrowError('The code should be running in the fakeAsync zone to call this function');
        });
    });
    describe('only one `fakeAsync` zone per test', () => {
        let zoneInBeforeEach;
        let zoneInTest1;
        beforeEach((0, testing_1.fakeAsync)(() => {
            zoneInBeforeEach = Zone.current;
        }));
        it('should use the same zone as in beforeEach', (0, testing_1.fakeAsync)(() => {
            zoneInTest1 = Zone.current;
            expect(zoneInTest1).toBe(zoneInBeforeEach);
        }));
    });
});
describe('ProxyZone', () => {
    beforeEach(() => {
        ProxyZoneSpec.assertPresent();
    });
    afterEach(() => {
        ProxyZoneSpec.assertPresent();
    });
    it('should allow fakeAsync zone to retroactively set a zoneSpec outside of fakeAsync', () => {
        ProxyZoneSpec.assertPresent();
        let state = 'not run';
        const testZone = Zone.current.fork({ name: 'test-zone' });
        (0, testing_1.fakeAsync)(() => {
            testZone.run(() => {
                Promise.resolve('works').then((v) => (state = v));
                expect(state).toEqual('not run');
                (0, testing_1.flushMicrotasks)();
                expect(state).toEqual('works');
            });
        })();
        expect(state).toEqual('works');
    });
});
