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
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const signals_1 = require("../../primitives/signals");
const rxjs_interop_1 = require("../../rxjs-interop");
const testing_1 = require("../../testing");
const platform_browser_1 = require("@angular/platform-browser");
const testing_2 = require("@angular/private/testing");
describe('reactivity', () => {
    describe('effects', () => {
        beforeEach(core_1.destroyPlatform);
        afterEach(core_1.destroyPlatform);
        it('should run effects in the zone in which they get created', (0, testing_2.withBody)('<test-cmp></test-cmp>', () => __awaiter(void 0, void 0, void 0, function* () {
            const log = [];
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor(ngZone) {
                        (0, core_1.effect)(() => {
                            log.push(Zone.current.name);
                        });
                        ngZone.runOutsideAngular(() => {
                            (0, core_1.effect)(() => {
                                log.push(Zone.current.name);
                            });
                        });
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            yield (0, platform_browser_1.bootstrapApplication)(Cmp);
            expect(log).not.toEqual(['angular', 'angular']);
        })));
        it('should contribute to application stableness when an effect is pending', () => __awaiter(void 0, void 0, void 0, function* () {
            const someSignal = (0, core_1.signal)('initial');
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            const isStable = [];
            const sub = appRef.isStable.subscribe((stable) => isStable.push(stable));
            expect(isStable).toEqual([true]);
            testing_1.TestBed.runInInjectionContext(() => (0, core_1.effect)(() => someSignal()));
            expect(isStable).toEqual([true, false]);
            appRef.tick();
            expect(isStable).toEqual([true, false, true]);
        }));
        it('should propagate errors to the ErrorHandler', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ErrorHandler, useFactory: () => new FakeErrorHandler() }],
                rethrowApplicationErrors: false,
            });
            let run = false;
            let lastError = null;
            class FakeErrorHandler extends core_1.ErrorHandler {
                handleError(error) {
                    lastError = error;
                }
            }
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            (0, core_1.effect)(() => {
                run = true;
                throw new Error('fail!');
            }, { injector: appRef.injector });
            yield appRef.whenStable();
            expect(run).toBeTrue();
            expect(lastError.message).toBe('fail!');
        }));
        // Disabled while we consider whether this actually makes sense.
        // This test _used_ to show that `effect()` was usable inside component error handlers, partly
        // because effect errors used to report to component error handlers. Now, effect errors are
        // always reported to the top-level error handler, which has never been able to use `effect()`
        // as `effect()` depends transitively on `ApplicationRef` which depends circularly on
        // `ErrorHandler`.
        xit('should be usable inside an ErrorHandler', () => __awaiter(void 0, void 0, void 0, function* () {
            const shouldError = (0, core_1.signal)(false);
            let lastError = null;
            class FakeErrorHandler extends core_1.ErrorHandler {
                constructor() {
                    super();
                    (0, core_1.effect)(() => {
                        if (shouldError()) {
                            throw new Error('fail!');
                        }
                    });
                }
                handleError(error) {
                    lastError = error;
                }
            }
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ErrorHandler, useClass: FakeErrorHandler }],
                rethrowApplicationErrors: false,
            });
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            expect(() => appRef.tick()).not.toThrow();
            shouldError.set(true);
            expect(() => appRef.tick()).not.toThrow();
            expect(lastError === null || lastError === void 0 ? void 0 : lastError.message).toBe('fail!');
        }));
        it('should run effect cleanup function on destroy', () => __awaiter(void 0, void 0, void 0, function* () {
            let counterLog = [];
            let cleanupCount = 0;
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.counter = (0, core_1.signal)(0);
                        this.effectRef = (0, core_1.effect)((onCleanup) => {
                            counterLog.push(this.counter());
                            onCleanup(() => {
                                cleanupCount++;
                            });
                        });
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            yield fixture.whenStable();
            expect(counterLog).toEqual([0]);
            // initially an effect runs but the default cleanup function is noop
            expect(cleanupCount).toBe(0);
            fixture.componentInstance.counter.set(5);
            fixture.detectChanges();
            yield fixture.whenStable();
            expect(counterLog).toEqual([0, 5]);
            expect(cleanupCount).toBe(1);
            fixture.destroy();
            expect(counterLog).toEqual([0, 5]);
            expect(cleanupCount).toBe(2);
        }));
        it('should run effect cleanup as untracked', () => __awaiter(void 0, void 0, void 0, function* () {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.counter = (0, core_1.signal)(0);
                        this.effectTrigger = (0, core_1.signal)(0);
                        this.effectRef = (0, core_1.effect)((onCleanup) => {
                            this.effectTrigger();
                            (0, core_1.untracked)(() => {
                                if (this.counter() > 1) {
                                    // This is an early bailout in case the effect loops infinitely
                                    throw new Error('Updated consummers in cleanup for not re-trigger the effect');
                                }
                            });
                            onCleanup(() => {
                                this.counter(); // A signal read but not consummed
                                this.counter.update((v) => v + 1);
                            });
                        });
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            yield fixture.whenStable();
            // initially an effect runs but the default cleanup function is noop
            expect(fixture.componentInstance.counter()).toBe(0);
            // Triggers a cleanup
            fixture.componentInstance.effectTrigger.update((v) => v + 1);
            fixture.detectChanges();
            yield fixture.whenStable();
            expect(fixture.componentInstance.counter()).toBe(1);
            // Destroy triggers a cleanup
            fixture.destroy();
            expect(fixture.componentInstance.counter()).toBe(2);
        }));
        it('should run effects created in ngAfterViewInit', () => {
            let didRun = false;
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.injector = (0, core_1.inject)(core_1.Injector);
                    }
                    ngAfterViewInit() {
                        (0, core_1.effect)(() => {
                            didRun = true;
                        }, { injector: this.injector });
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            expect(didRun).toBeTrue();
        });
        it('should create root effects when outside of a component, using injection context', () => {
            testing_1.TestBed.configureTestingModule({});
            const counter = (0, core_1.signal)(0);
            const log = [];
            testing_1.TestBed.runInInjectionContext(() => (0, core_1.effect)(() => log.push(counter())));
            testing_1.TestBed.tick();
            expect(log).toEqual([0]);
            counter.set(1);
            testing_1.TestBed.tick();
            expect(log).toEqual([0, 1]);
        });
        it('should create root effects when outside of a component, using an injector', () => {
            testing_1.TestBed.configureTestingModule({});
            const counter = (0, core_1.signal)(0);
            const log = [];
            (0, core_1.effect)(() => log.push(counter()), { injector: testing_1.TestBed.inject(core_1.Injector) });
            testing_1.TestBed.tick();
            expect(log).toEqual([0]);
            counter.set(1);
            testing_1.TestBed.tick();
            expect(log).toEqual([0, 1]);
        });
        it('should cleanup effect when manualCleanup is enabled and an injector is provided', () => {
            testing_1.TestBed.configureTestingModule({});
            const counter = (0, core_1.signal)(0);
            const log = [];
            // It needs the injector to be able to inject the other deps (and not just the DestroyRef).
            const ref = (0, core_1.effect)(() => log.push(counter()), {
                manualCleanup: true,
                injector: testing_1.TestBed.inject(core_1.Injector),
            });
            testing_1.TestBed.tick();
            expect(log).toEqual([0]);
            counter.set(1);
            testing_1.TestBed.tick();
            expect(log).toEqual([0, 1]);
            ref.destroy();
            counter.set(2);
            testing_1.TestBed.tick();
            expect(log).toEqual([0, 1]);
        });
        it('should run root effects in creation order independent of dirty order', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, core_1.provideZonelessChangeDetection)()],
            });
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            const sourceA = (0, core_1.signal)(0);
            const sourceB = (0, core_1.signal)(0);
            const log = [];
            // Creation order: A, B
            (0, core_1.effect)(() => log.push(`A: ${sourceA()}`), { injector: appRef.injector });
            (0, core_1.effect)(() => log.push(`B: ${sourceB()}`), { injector: appRef.injector });
            yield appRef.whenStable();
            expect(log).toEqual(['A: 0', 'B: 0']);
            log.length = 0;
            // Dirty order: B, A
            sourceB.set(1);
            sourceA.set(2);
            yield appRef.whenStable();
            // Effects should still run in A, B creation order.
            expect(log).toEqual(['A: 2', 'B: 1']);
        }));
        it('should check components made dirty from markForCheck() from an effect', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, core_1.provideZonelessChangeDetection)()],
            });
            const source = (0, core_1.signal)('');
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: '{{ data }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                        this.data = '';
                        this.effectRef = (0, core_1.effect)(() => {
                            if (this.data !== source()) {
                                this.data = source();
                                this.cdr.markForCheck();
                            }
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
            const fix = testing_1.TestBed.createComponent(TestCmp);
            yield fix.whenStable();
            source.set('test');
            yield fix.whenStable();
            expect(fix.nativeElement.innerHTML).toBe('test');
        }));
        it('should check components made dirty from markForCheck() from an effect in a service', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, core_1.provideZonelessChangeDetection)()],
            });
            const source = (0, core_1.signal)('');
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        this.data = '';
                        this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                        this.effectRef = (0, core_1.effect)(() => {
                            if (this.data !== source()) {
                                this.data = source();
                                this.cdr.markForCheck();
                            }
                        });
                    }
                };
                __setFunctionName(_classThis, "Service");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Service = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Service = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        providers: [Service],
                        template: '{{ service.data }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
                    constructor() {
                        this.service = (0, core_1.inject)(Service);
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
            const fix = testing_1.TestBed.createComponent(TestCmp);
            yield fix.whenStable();
            source.set('test');
            yield fix.whenStable();
            expect(fix.nativeElement.innerHTML).toBe('test');
        }));
        it('should check views made dirty from markForCheck() from an effect in a directive', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, core_1.provideZonelessChangeDetection)()],
            });
            const source = (0, core_1.signal)('');
            let Dir = (() => {
                let _classDecorators = [(0, core_1.Directive)({
                        selector: '[dir]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dir = _classThis = class {
                    constructor() {
                        this.tpl = (0, core_1.inject)(core_1.TemplateRef);
                        this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                        this.cdr = (0, core_1.inject)(core_1.ChangeDetectorRef);
                        this.ctx = {
                            $implicit: '',
                        };
                        this.ref = this.vcr.createEmbeddedView(this.tpl, this.ctx);
                        this.effectRef = (0, core_1.effect)(() => {
                            if (this.ctx.$implicit !== source()) {
                                this.ctx.$implicit = source();
                                this.cdr.markForCheck();
                            }
                        });
                    }
                };
                __setFunctionName(_classThis, "Dir");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dir = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dir = _classThis;
            })();
            let TestCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Dir],
                        template: `<ng-template dir let-data>{{data}}</ng-template>`,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestCmp = _classThis = class {
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
            const fix = testing_1.TestBed.createComponent(TestCmp);
            yield fix.whenStable();
            source.set('test');
            yield fix.whenStable();
            expect(fix.nativeElement.innerHTML).toContain('test');
        }));
        describe('destruction', () => {
            it('should destroy effects when the parent component is destroyed', () => {
                let destroyed = false;
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            (0, core_1.effect)((onCleanup) => onCleanup(() => (destroyed = true)));
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
                const fix = testing_1.TestBed.createComponent(TestCmp);
                fix.detectChanges();
                fix.destroy();
                expect(destroyed).toBeTrue();
            });
            it('should destroy effects when their view is destroyed, separately from DestroyRef', () => {
                let destroyed = false;
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.injector = core_1.Injector.create({ providers: [], parent: (0, core_1.inject)(core_1.Injector) });
                            (0, core_1.effect)((onCleanup) => onCleanup(() => (destroyed = true)), { injector: this.injector });
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
                const fix = testing_1.TestBed.createComponent(TestCmp);
                fix.detectChanges();
                fix.destroy();
                expect(destroyed).toBeTrue();
            });
            it('should destroy effects when their DestroyRef is separately destroyed', () => {
                let destroyed = false;
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({})];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.injector = core_1.Injector.create({ providers: [], parent: (0, core_1.inject)(core_1.Injector) });
                            (0, core_1.effect)((onCleanup) => onCleanup(() => (destroyed = true)), { injector: this.injector });
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
                const fix = testing_1.TestBed.createComponent(TestCmp);
                fix.detectChanges();
                fix.componentInstance.injector.destroy();
                expect(destroyed).toBeTrue();
            });
            it('should not run root effects after it has been destroyed', () => __awaiter(void 0, void 0, void 0, function* () {
                let effectCounter = 0;
                const counter = (0, core_1.signal)(1);
                const effectRef = testing_1.TestBed.runInInjectionContext(() => (0, core_1.effect)(() => {
                    counter();
                    effectCounter++;
                }, { injector: testing_1.TestBed.inject(core_1.EnvironmentInjector) }));
                expect(effectCounter).toBe(0);
                effectRef.destroy();
                testing_1.TestBed.tick();
                expect(effectCounter).toBe(0);
                counter.set(2);
                testing_1.TestBed.tick();
                expect(effectCounter).toBe(0);
            }));
            it('should not run view effects after it has been destroyed', () => __awaiter(void 0, void 0, void 0, function* () {
                let effectCounter = 0;
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({ template: '' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.counter = (0, core_1.signal)(1);
                            this.effectRef = (0, core_1.effect)(() => {
                                this.counter();
                                effectCounter++;
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
                fixture.componentInstance.effectRef.destroy();
                fixture.detectChanges();
                expect(effectCounter).toBe(0);
                testing_1.TestBed.tick();
                expect(effectCounter).toBe(0);
                fixture.componentInstance.counter.set(2);
                testing_1.TestBed.tick();
                expect(effectCounter).toBe(0);
            }));
        });
    });
    describe('safeguards', () => {
        it('should allow writing to signals within effects', () => {
            const counter = (0, core_1.signal)(0);
            (0, core_1.effect)(() => counter.set(1), { injector: testing_1.TestBed.inject(core_1.Injector) });
            testing_1.TestBed.tick();
            expect(counter()).toBe(1);
        });
        it('should allow writing to signals in ngOnChanges', () => {
            let WithInput = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-input',
                        template: '{{inSignal()}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _in_decorators;
                let _in_initializers = [];
                let _in_extraInitializers = [];
                var WithInput = _classThis = class {
                    ngOnChanges(changes) {
                        if (changes['in']) {
                            this.inSignal.set(changes['in'].currentValue);
                        }
                    }
                    constructor() {
                        this.inSignal = (0, core_1.signal)(undefined);
                        this.in = __runInitializers(this, _in_initializers, void 0);
                        __runInitializers(this, _in_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "WithInput");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _in_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _in_decorators, { kind: "field", name: "in", static: false, private: false, access: { has: obj => "in" in obj, get: obj => obj.in, set: (obj, value) => { obj.in = value; } }, metadata: _metadata }, _in_initializers, _in_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithInput = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithInput = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        imports: [WithInput],
                        template: `<with-input [in]="'A'" />|<with-input [in]="'B'" />`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('A|B');
        });
        it('should allow writing to signals in a constructor', () => {
            let WithConstructor = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-constructor',
                        template: '{{state()}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var WithConstructor = _classThis = class {
                    constructor() {
                        this.state = (0, core_1.signal)('property initializer');
                        this.state.set('constructor');
                    }
                };
                __setFunctionName(_classThis, "WithConstructor");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithConstructor = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithConstructor = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        imports: [WithConstructor],
                        template: `<with-constructor />`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('constructor');
        });
        it('should allow writing to signals in input setters', () => {
            let WithInputSetter = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-input-setter',
                        template: '{{state()}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_testInput_decorators;
                var WithInputSetter = _classThis = class {
                    constructor() {
                        this.state = (__runInitializers(this, _instanceExtraInitializers), (0, core_1.signal)('property initializer'));
                    }
                    set testInput(newValue) {
                        this.state.set(newValue);
                    }
                };
                __setFunctionName(_classThis, "WithInputSetter");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_testInput_decorators = [(0, core_1.Input)()];
                    __esDecorate(_classThis, null, _set_testInput_decorators, { kind: "setter", name: "testInput", static: false, private: false, access: { has: obj => "testInput" in obj, set: (obj, value) => { obj.testInput = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithInputSetter = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithInputSetter = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        imports: [WithInputSetter],
                        template: `
          <with-input-setter [testInput]="'binding'" />|<with-input-setter testInput="static" />
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('binding|static');
        });
        it('should allow writing to signals in query result setters', () => {
            let WithQuery = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-query',
                        template: '{{items().length}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_itemsQuery_decorators;
                var WithQuery = _classThis = class {
                    constructor() {
                        this.items = (__runInitializers(this, _instanceExtraInitializers), (0, core_1.signal)([]));
                    }
                    set itemsQuery(result) {
                        this.items.set(result.toArray());
                    }
                };
                __setFunctionName(_classThis, "WithQuery");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_itemsQuery_decorators = [(0, core_1.ContentChildren)('item')];
                    __esDecorate(_classThis, null, _set_itemsQuery_decorators, { kind: "setter", name: "itemsQuery", static: false, private: false, access: { has: obj => "itemsQuery" in obj, set: (obj, value) => { obj.itemsQuery = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithQuery = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithQuery = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        imports: [WithQuery],
                        template: `<with-query><div #item></div></with-query>`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('1');
        });
        it('should not execute query setters in the reactive context', () => {
            const state = (0, core_1.signal)('initial');
            let WithQuerySetter = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-query-setter',
                        template: '<div #el></div>',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _instanceExtraInitializers = [];
                let _set_elQuery_decorators;
                var WithQuerySetter = _classThis = class {
                    constructor() {
                        this.el = __runInitializers(this, _instanceExtraInitializers);
                    }
                    set elQuery(result) {
                        // read a signal in a setter - I want to verify that framework executes this code outside of
                        // the reactive context
                        state();
                        this.el = result;
                    }
                };
                __setFunctionName(_classThis, "WithQuerySetter");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _set_elQuery_decorators = [(0, core_1.ViewChild)('el', { static: true })];
                    __esDecorate(_classThis, null, _set_elQuery_decorators, { kind: "setter", name: "elQuery", static: false, private: false, access: { has: obj => "elQuery" in obj, set: (obj, value) => { obj.elQuery = value; } }, metadata: _metadata }, null, _instanceExtraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WithQuerySetter = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WithQuerySetter = _classThis;
            })();
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: ``,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor(environmentInjector) {
                        // A slightly artificial setup where a component instance is created using imperative APIs.
                        // We don't have control over the timing / reactive context of such API calls so need to
                        // code defensively in the framework.
                        this.noOfCmpCreated = 0;
                        // Here we want to specifically verify that an effect is _not_ re-run if a signal read
                        // happens in a query setter of a dynamically created component.
                        (0, core_1.effect)(() => {
                            (0, core_1.createComponent)(WithQuerySetter, { environmentInjector });
                            this.noOfCmpCreated++;
                        });
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.noOfCmpCreated).toBe(1);
            state.set('changed');
            fixture.detectChanges();
            expect(fixture.componentInstance.noOfCmpCreated).toBe(1);
        });
        it('should allow toObservable subscription in template (with async pipe)', () => {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        imports: [common_1.AsyncPipe],
                        template: '{{counter$ | async}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.counter$ = (0, rxjs_interop_1.toObservable)((0, core_1.signal)(0));
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Cmp);
            expect(() => fixture.detectChanges(true)).not.toThrow();
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent).toBe('0');
        });
        it('should assign a debugName to the underlying node for an effect', () => __awaiter(void 0, void 0, void 0, function* () {
            let Cmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'test-cmp',
                        template: '',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Cmp = _classThis = class {
                    constructor() {
                        this.effectRef = (0, core_1.effect)(() => { }, { debugName: 'TEST_DEBUG_NAME' });
                    }
                };
                __setFunctionName(_classThis, "Cmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Cmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Cmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(Cmp);
            fixture.detectChanges();
            const component = fixture.componentInstance;
            const effectRef = component.effectRef;
            expect(effectRef[signals_1.SIGNAL].debugName).toBe('TEST_DEBUG_NAME');
        }));
        it('should disallow writing to signals within computed', () => {
            let WriteComputed = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-input',
                        template: '{{comp()}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var WriteComputed = _classThis = class {
                    constructor() {
                        this.sig = (0, core_1.signal)(0);
                        this.comp = (0, core_1.computed)(() => {
                            this.sig.set(this.sig() + 1);
                            return this.sig();
                        });
                    }
                };
                __setFunctionName(_classThis, "WriteComputed");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WriteComputed = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WriteComputed = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(WriteComputed);
            expect(() => fixture.detectChanges()).toThrowError(/NG0600.*in a `computed`/);
        });
        it('should disallow writing to signals within a template', () => {
            let WriteComputed = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'with-input',
                        template: '{{func()}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var WriteComputed = _classThis = class {
                    constructor() {
                        this.sig = (0, core_1.signal)(0);
                    }
                    func() {
                        this.sig.set(this.sig() + 1);
                    }
                };
                __setFunctionName(_classThis, "WriteComputed");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    WriteComputed = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return WriteComputed = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(WriteComputed);
            expect(() => fixture.detectChanges()).toThrowError(/NG0600.*template/);
        });
        describe('effects created in components should first run after ngOnInit', () => {
            it('when created during bootstrapping', () => {
                let log = [];
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-cmp',
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            (0, core_1.effect)(() => log.push('effect'));
                        }
                        ngOnInit() {
                            log.push('init');
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
                testing_1.TestBed.tick();
                expect(log).toEqual([]);
                fixture.detectChanges();
                expect(log).toEqual(['init', 'effect']);
            });
            it('when created during change detection', () => {
                let log = [];
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-cmp',
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.ngOnInitRan = false;
                            (0, core_1.effect)(() => log.push('effect'));
                        }
                        ngOnInit() {
                            log.push('init');
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
                let DriverCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'driver-cmp',
                            imports: [TestCmp],
                            template: `
          @if (cond) {
            <test-cmp />
          }
        `,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DriverCmp = _classThis = class {
                        constructor() {
                            this.cond = false;
                        }
                    };
                    __setFunctionName(_classThis, "DriverCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DriverCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DriverCmp = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(DriverCmp);
                fixture.detectChanges();
                expect(log).toEqual([]);
                // Toggle the @if, which should create and run the effect.
                fixture.componentInstance.cond = true;
                fixture.detectChanges();
                expect(log).toEqual(['init', 'effect']);
            });
            it('when created dynamically', () => {
                let log = [];
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-cmp',
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.ngOnInitRan = false;
                            (0, core_1.effect)(() => log.push('effect'));
                        }
                        ngOnInit() {
                            log.push('init');
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
                let DriverCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'driver-cmp',
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DriverCmp = _classThis = class {
                        constructor() {
                            this.vcr = (0, core_1.inject)(core_1.ViewContainerRef);
                        }
                    };
                    __setFunctionName(_classThis, "DriverCmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DriverCmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DriverCmp = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(DriverCmp);
                fixture.detectChanges();
                fixture.componentInstance.vcr.createComponent(TestCmp);
                // Verify that simply creating the component didn't schedule the effect.
                testing_1.TestBed.tick();
                expect(log).toEqual([]);
                // Running change detection should schedule and run the effect.
                fixture.detectChanges();
                expect(log).toEqual(['init', 'effect']);
            });
            it('when created in a service provided in a component', () => {
                let log = [];
                let EffectService = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var EffectService = _classThis = class {
                        constructor() {
                            (0, core_1.effect)(() => log.push('effect'));
                        }
                    };
                    __setFunctionName(_classThis, "EffectService");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        EffectService = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return EffectService = _classThis;
                })();
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-cmp',
                            template: '',
                            providers: [EffectService],
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            this.svc = (0, core_1.inject)(EffectService);
                        }
                        ngOnInit() {
                            log.push('init');
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
                testing_1.TestBed.tick();
                expect(log).toEqual([]);
                fixture.detectChanges();
                expect(log).toEqual(['init', 'effect']);
            });
            it('if multiple effects are created', () => {
                let log = [];
                let TestCmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'test-cmp',
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var TestCmp = _classThis = class {
                        constructor() {
                            (0, core_1.effect)(() => log.push('effect a'));
                            (0, core_1.effect)(() => log.push('effect b'));
                            (0, core_1.effect)(() => log.push('effect c'));
                        }
                        ngOnInit() {
                            log.push('init');
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
                expect(log[0]).toBe('init');
                expect(log).toContain('effect a');
                expect(log).toContain('effect b');
                expect(log).toContain('effect c');
            });
        });
        describe('should disallow creating an effect context', () => {
            it('inside template effect', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                            template: '{{someFn()}}',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        someFn() {
                            (0, core_1.effect)(() => { });
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp = _classThis;
                })();
                const fixture = testing_1.TestBed.createComponent(Cmp);
                expect(() => fixture.detectChanges(true)).toThrowError(/effect\(\) cannot be called from within a reactive context./);
            });
            it('inside computed', () => {
                expect(() => {
                    (0, core_1.computed)(() => {
                        (0, core_1.effect)(() => { });
                    })();
                }).toThrowError(/effect\(\) cannot be called from within a reactive context./);
            });
            it('inside an effect', () => {
                let Cmp = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            standalone: false,
                            template: '',
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Cmp = _classThis = class {
                        constructor() {
                            (0, core_1.effect)(() => {
                                this.someFnThatWillCreateAnEffect();
                            });
                        }
                        someFnThatWillCreateAnEffect() {
                            (0, core_1.effect)(() => { });
                        }
                    };
                    __setFunctionName(_classThis, "Cmp");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Cmp = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Cmp = _classThis;
                })();
                testing_1.TestBed.configureTestingModule({
                    providers: [
                        {
                            provide: core_1.ErrorHandler,
                            useClass: class extends core_1.ErrorHandler {
                                handleError(e) {
                                    throw e;
                                }
                            },
                        },
                    ],
                });
                const fixture = testing_1.TestBed.createComponent(Cmp);
                expect(() => fixture.detectChanges()).toThrowError(/effect\(\) cannot be called from within a reactive context./);
            });
        });
    });
});
