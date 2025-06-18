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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const testing_1 = require("../../testing");
describe('DestroyRef', () => {
    describe('for environnement injector', () => {
        it('should inject cleanup context in services', () => {
            let destroyed = false;
            const envInjector = (0, core_1.createEnvironmentInjector)([], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            envInjector.get(core_1.DestroyRef).onDestroy(() => (destroyed = true));
            expect(destroyed).toBe(false);
            envInjector.destroy();
            expect(destroyed).toBe(true);
        });
        it('should allow removal of destroy callbacks', () => {
            let destroyed = false;
            const envInjector = (0, core_1.createEnvironmentInjector)([], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            const unRegFn = envInjector.get(core_1.DestroyRef).onDestroy(() => (destroyed = true));
            expect(destroyed).toBe(false);
            // explicitly unregister before destroy
            unRegFn();
            envInjector.destroy();
            expect(destroyed).toBe(false);
        });
        it('should removal single destroy callback if many identical ones are registered', () => {
            let onDestroyCalls = 0;
            const onDestroyCallback = () => onDestroyCalls++;
            const envInjector = (0, core_1.createEnvironmentInjector)([], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            const destroyRef = envInjector.get(core_1.DestroyRef);
            // Register the same fn 3 times:
            const unregFn = destroyRef.onDestroy(onDestroyCallback);
            destroyRef.onDestroy(onDestroyCallback);
            destroyRef.onDestroy(onDestroyCallback);
            // Unregister the fn 1 time:
            unregFn();
            envInjector.destroy();
            // Check that the callback was invoked only 2 times
            // (since we've unregistered one of the callbacks)
            expect(onDestroyCalls).toBe(2);
        });
        it('should throw when trying to register destroy callback on destroyed injector', () => {
            const envInjector = (0, core_1.createEnvironmentInjector)([], testing_1.TestBed.inject(core_1.EnvironmentInjector));
            const destroyRef = envInjector.get(core_1.DestroyRef);
            envInjector.destroy();
            expect(() => {
                destroyRef.onDestroy(() => { });
            }).toThrowError('NG0205: Injector has already been destroyed.');
        });
    });
    describe('for node injector', () => {
        it('should inject cleanup context in components', () => {
            let destroyed = false;
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        template: ``,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor(destroyCtx) {
                        destroyCtx.onDestroy(() => (destroyed = true));
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            expect(destroyed).toBe(false);
            fixture.componentRef.destroy();
            expect(destroyed).toBe(true);
        });
        it('should allow using cleanup context with views that store cleanup internally', () => {
            let destroyed = false;
            let WithCleanupDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[withCleanup]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var WithCleanupDirective = _classThis = class {
                    constructor() {
                        (0, core_1.inject)(core_1.DestroyRef).onDestroy(() => (destroyed = true));
                    }
                };
                __setFunctionName(_classThis, "WithCleanupDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithCleanupDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithCleanupDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        imports: [WithCleanupDirective],
                        // note: we are trying to register a LView-level cleanup _before_ TView-level one (event
                        // listener)
                        template: `<div withCleanup></div><button (click)="noop()"></button>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    noop() { }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(destroyed).toBe(false);
            fixture.componentRef.destroy();
            expect(destroyed).toBe(true);
        });
        it('should scope destroy context to a view level', () => {
            let destroyed = false;
            let WithCleanupDirective = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[withCleanup]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var WithCleanupDirective = _classThis = class {
                    constructor() {
                        (0, core_1.inject)(core_1.DestroyRef).onDestroy(() => (destroyed = true));
                    }
                };
                __setFunctionName(_classThis, "WithCleanupDirective");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithCleanupDirective = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithCleanupDirective = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test',
                        imports: [WithCleanupDirective, common_1.NgIf],
                        template: `<ng-template [ngIf]="show"><div withCleanup></div></ng-template>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.show = true;
                    }
                };
                __setFunctionName(_classThis, "TestCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(TestCmp);
            fixture.detectChanges();
            expect(destroyed).toBe(false);
            fixture.componentInstance.show = false;
            fixture.detectChanges();
            expect(destroyed).toBe(true);
        });
        it('can inject into a child component', () => {
            const onDestroySpy = jasmine.createSpy('destroy spy');
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                    constructor() {
                        (0, core_1.inject)(core_1.DestroyRef).onDestroy(onDestroySpy);
                    }
                };
                __setFunctionName(_classThis, "Child");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Child, common_1.NgIf],
                        template: '<child *ngIf="showChild"></child>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor() {
                        this.showChild = true;
                    }
                };
                __setFunctionName(_classThis, "Parent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Parent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Parent = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Parent);
            fixture.detectChanges();
            expect(onDestroySpy).not.toHaveBeenCalled();
            fixture.componentInstance.showChild = false;
            fixture.detectChanges();
            expect(onDestroySpy).toHaveBeenCalled();
        });
    });
    it('should allow removal of view-scoped destroy callbacks', () => {
        let destroyed = false;
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: ``,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor(destroyCtx) {
                    this.unRegFn = destroyCtx.onDestroy(() => (destroyed = true));
                }
            };
            __setFunctionName(_classThis, "TestCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        expect(destroyed).toBe(false);
        // explicitly unregister before destroy
        fixture.componentInstance.unRegFn();
        fixture.componentRef.destroy();
        expect(destroyed).toBe(false);
    });
    it('should removal single destroy callback if many identical ones are registered', () => {
        let onDestroyCalls = 0;
        const onDestroyCallback = () => onDestroyCalls++;
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: ``,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor(destroyCtx) {
                    // Register the same fn 3 times:
                    this.unRegFn = destroyCtx.onDestroy(onDestroyCallback);
                    this.unRegFn = destroyCtx.onDestroy(onDestroyCallback);
                    this.unRegFn = destroyCtx.onDestroy(onDestroyCallback);
                }
            };
            __setFunctionName(_classThis, "TestCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        expect(onDestroyCalls).toBe(0);
        // explicitly unregister 1-time before destroy
        fixture.componentInstance.unRegFn();
        fixture.componentRef.destroy();
        // Check that the callback was invoked only 2 times
        // (since we've unregistered one of the callbacks)
        expect(onDestroyCalls).toBe(2);
    });
    it('should allow unregistration while destroying', () => {
        const destroyedLog = [];
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: ``,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor(destroyCtx) {
                    const unregister = destroyCtx.onDestroy(() => {
                        destroyedLog.push('first');
                        unregister();
                    });
                    destroyCtx.onDestroy(() => {
                        destroyedLog.push('second');
                    });
                }
            };
            __setFunctionName(_classThis, "TestCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(TestCmp);
        expect(destroyedLog).toEqual([]);
        fixture.componentRef.destroy();
        expect(destroyedLog).toEqual(['first', 'second']);
    });
});
