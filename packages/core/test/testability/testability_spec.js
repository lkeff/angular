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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../../src/core");
const di_1 = require("../../src/di");
const testability_1 = require("../../src/testability/testability");
const ng_zone_1 = require("../../src/zone/ng_zone");
const testing_1 = require("../../testing");
// Schedules a microtasks (using queueMicrotask)
function microTask(fn) {
    queueMicrotask(() => {
        // We do double dispatch so that we can wait for queueMicrotask in the Testability when
        // NgZone becomes stable.
        queueMicrotask(() => fn());
    });
}
class NoopGetTestability {
    addToWindow(registry) { }
    findTestabilityInTree(registry, elem, findInAncestors) {
        return null;
    }
}
let MockNgZone = (() => {
    let _classDecorators = [(0, di_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = ng_zone_1.NgZone;
    var MockNgZone = _classThis = class extends _classSuper {
        constructor() {
            super({ enableLongStackTrace: false });
            this.onUnstable = new core_1.EventEmitter(false);
            this.onStable = new core_1.EventEmitter(false);
        }
        unstable() {
            this.onUnstable.emit(null);
        }
        stable() {
            this.onStable.emit(null);
        }
    };
    __setFunctionName(_classThis, "MockNgZone");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MockNgZone = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MockNgZone = _classThis;
})();
describe('Testability', () => {
    let testability;
    let execute;
    let execute2;
    let updateCallback;
    let ngZone;
    beforeEach((0, testing_1.waitForAsync)(() => {
        ngZone = new MockNgZone();
        testability = new testability_1.Testability(ngZone, new testability_1.TestabilityRegistry(), new NoopGetTestability());
        execute = jasmine.createSpy('execute');
        execute2 = jasmine.createSpy('execute');
        updateCallback = jasmine.createSpy('execute');
    }));
    afterEach(() => {
        // Instantiating the Testability (via `new Testability` above) has a side
        // effect of defining the testability getter globally to a specified value.
        // This call resets that reference after each test to make sure it does not
        // get leaked between tests. In real scenarios this is not a problem, since
        // the `Testability` is created via DI and uses the same testability getter
        // (injected into a constructor) across all instances.
        (0, testability_1.setTestabilityGetter)(null);
    });
    describe('NgZone callback logic', () => {
        describe('whenStable with timeout', () => {
            it('should fire if Angular is already stable', (0, testing_1.waitForAsync)(() => {
                testability.whenStable(execute, 200);
                microTask(() => {
                    expect(execute).toHaveBeenCalled();
                });
            }));
            it('should fire when macroTasks are cancelled', (0, testing_1.fakeAsync)(() => {
                const id = ngZone.run(() => setTimeout(() => { }, 1000));
                testability.whenStable(execute, 500);
                (0, testing_1.tick)(200);
                ngZone.run(() => clearTimeout(id));
                // fakeAsync doesn't trigger NgZones whenStable
                ngZone.stable();
                (0, testing_1.tick)(1);
                expect(execute).toHaveBeenCalled();
            }));
            it('calls the done callback when angular is stable', (0, testing_1.fakeAsync)(() => {
                let timeout1Done = false;
                ngZone.run(() => setTimeout(() => (timeout1Done = true), 500));
                testability.whenStable(execute, 1000);
                (0, testing_1.tick)(600);
                ngZone.stable();
                (0, testing_1.tick)();
                expect(timeout1Done).toEqual(true);
                expect(execute).toHaveBeenCalled();
                // Should cancel the done timeout.
                (0, testing_1.tick)(500);
                ngZone.stable();
                (0, testing_1.tick)();
                expect(execute.calls.count()).toEqual(1);
            }));
            it('calls update when macro tasks change', (0, testing_1.fakeAsync)(() => {
                let timeout1Done = false;
                let timeout2Done = false;
                ngZone.run(() => setTimeout(() => (timeout1Done = true), 500));
                (0, testing_1.tick)();
                testability.whenStable(execute, 1000, updateCallback);
                (0, testing_1.tick)(100);
                ngZone.run(() => setTimeout(() => (timeout2Done = true), 300));
                expect(updateCallback.calls.count()).toEqual(1);
                (0, testing_1.tick)(600);
                expect(timeout1Done).toEqual(true);
                expect(timeout2Done).toEqual(true);
                expect(updateCallback.calls.count()).toEqual(3);
                expect(execute).toHaveBeenCalled();
                const update1 = updateCallback.calls.all()[0].args[0];
                expect(update1[0].data.delay).toEqual(500);
                const update2 = updateCallback.calls.all()[1].args[0];
                expect(update2[0].data.delay).toEqual(500);
                expect(update2[1].data.delay).toEqual(300);
            }));
            it('cancels the done callback if the update callback returns true', (0, testing_1.fakeAsync)(() => {
                let timeoutDone = false;
                ngZone.unstable();
                execute2.and.returnValue(true);
                testability.whenStable(execute, 1000, execute2);
                (0, testing_1.tick)(100);
                ngZone.run(() => setTimeout(() => (timeoutDone = true), 500));
                ngZone.stable();
                expect(execute2).toHaveBeenCalled();
                (0, testing_1.tick)(500);
                ngZone.stable();
                (0, testing_1.tick)();
                expect(execute).not.toHaveBeenCalled();
            }));
        });
        it('should fire whenstable callback if event is already finished', (0, testing_1.fakeAsync)(() => {
            ngZone.unstable();
            ngZone.stable();
            testability.whenStable(execute);
            (0, testing_1.tick)();
            expect(execute).toHaveBeenCalled();
        }));
        it('should not fire whenstable callbacks synchronously if event is already finished', () => {
            ngZone.unstable();
            ngZone.stable();
            testability.whenStable(execute);
            expect(execute).not.toHaveBeenCalled();
        });
        it('should fire whenstable callback when event finishes', (0, testing_1.fakeAsync)(() => {
            ngZone.unstable();
            testability.whenStable(execute);
            (0, testing_1.tick)();
            expect(execute).not.toHaveBeenCalled();
            ngZone.stable();
            (0, testing_1.tick)();
            expect(execute).toHaveBeenCalled();
        }));
        it('should not fire whenstable callbacks synchronously when event finishes', () => {
            ngZone.unstable();
            testability.whenStable(execute);
            ngZone.stable();
            expect(execute).not.toHaveBeenCalled();
        });
        it('should fire whenstable callback with didWork if event is already finished', (0, testing_1.fakeAsync)(() => {
            ngZone.unstable();
            ngZone.stable();
            testability.whenStable(execute);
            (0, testing_1.tick)();
            expect(execute).toHaveBeenCalled();
            testability.whenStable(execute2);
            (0, testing_1.tick)();
            expect(execute2).toHaveBeenCalled();
        }));
        it('should fire whenstable callback with didwork when event finishes', (0, testing_1.fakeAsync)(() => {
            ngZone.unstable();
            testability.whenStable(execute);
            (0, testing_1.tick)();
            ngZone.stable();
            (0, testing_1.tick)();
            expect(execute).toHaveBeenCalled();
            testability.whenStable(execute2);
            (0, testing_1.tick)();
            expect(execute2).toHaveBeenCalled();
        }));
    });
});
describe('TestabilityRegistry', () => {
    let testability1;
    let testability2;
    let registry;
    let ngZone;
    beforeEach((0, testing_1.waitForAsync)(() => {
        ngZone = new MockNgZone();
        registry = new testability_1.TestabilityRegistry();
        testability1 = new testability_1.Testability(ngZone, registry, new NoopGetTestability());
        testability2 = new testability_1.Testability(ngZone, registry, new NoopGetTestability());
    }));
    afterEach(() => {
        // Instantiating the Testability (via `new Testability` above) has a side
        // effect of defining the testability getter globally to a specified value.
        // This call resets that reference after each test to make sure it does not
        // get leaked between tests. In real scenarios this is not a problem, since
        // the `Testability` is created via DI and uses the same testability getter
        // (injected into a constructor) across all instances.
        (0, testability_1.setTestabilityGetter)(null);
    });
    describe('unregister testability', () => {
        it('should remove the testability when unregistering an existing testability', () => {
            registry.registerApplication('testability1', testability1);
            registry.registerApplication('testability2', testability2);
            registry.unregisterApplication('testability2');
            expect(registry.getAllTestabilities().length).toEqual(1);
            expect(registry.getTestability('testability1')).toEqual(testability1);
        });
        it('should remain the same when unregistering a non-existing testability', () => {
            expect(registry.getAllTestabilities().length).toEqual(0);
            registry.registerApplication('testability1', testability1);
            registry.registerApplication('testability2', testability2);
            registry.unregisterApplication('testability3');
            expect(registry.getAllTestabilities().length).toEqual(2);
            expect(registry.getTestability('testability1')).toEqual(testability1);
            expect(registry.getTestability('testability2')).toEqual(testability2);
        });
        it('should remove all the testability when unregistering all testabilities', () => {
            registry.registerApplication('testability1', testability1);
            registry.registerApplication('testability2', testability2);
            registry.unregisterAllApplications();
            expect(registry.getAllTestabilities().length).toEqual(0);
        });
    });
});
