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
exports.DebugConsole = void 0;
exports.withDebugConsole = withDebugConsole;
const common_1 = require("@angular/common");
const core_1 = require("../../src/core");
const def_getters_1 = require("../../src/render3/def_getters");
const testing_1 = require("../../testing");
const injector_discovery_utils_1 = require("../../src/render3/util/injector_discovery_utils");
const router_1 = require("@angular/router");
const chained_injector_1 = require("../../src/render3/chained_injector");
const global_1 = require("../../src/util/global");
const timer_scheduler_1 = require("@angular/core/src/defer/timer_scheduler");
const console_1 = require("../../src/console");
const errors_1 = require("../../src/errors");
const ng_reflect_1 = require("../../src/ng_reflect");
/**
 * Clears all associated directive defs from a given component class.
 *
 * This is a *hack* for TestBed, which compiles components in JIT mode
 * and can not remove dependencies and their imports in the same way as AOT.
 * From JIT perspective, all dependencies inside a defer block remain eager.
 * We need to clear this association to run tests that verify loading and
 * prefetching behavior.
 */
function clearDirectiveDefs(type) {
    const cmpDef = (0, def_getters_1.getComponentDef)(type);
    cmpDef.dependencies = [];
    cmpDef.directiveDefs = null;
}
/**
 * Emulates a dynamic import promise.
 *
 * Note: `setTimeout` is used to make `fixture.whenStable()` function
 * wait for promise resolution, since `whenStable()` relies on the state
 * of a macrotask queue.
 */
function dynamicImportOf(type, timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(type), timeout);
    });
}
/**
 * Emulates a failed dynamic import promise.
 */
function failedDynamicImport() {
    return new Promise((_, reject) => {
        setTimeout(() => reject());
    });
}
/**
 * Helper function to await all pending dynamic imports
 * emulated using `dynamicImportOf` function.
 */
function allPendingDynamicImports() {
    return dynamicImportOf(null, 10);
}
/**
 * Allows to verify behavior of defer blocks by providing a set of
 * [time, expected output] pairs. Also allows to provide a function
 * instead of an expected output string, in which case the function
 * is invoked at a specified time.
 */
function verifyTimeline(fixture, ...slots) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < slots.length; i++) {
            const timeToWait = i === 0 ? slots[0][0] : slots[i][0] - slots[i - 1][0];
            const slotValue = slots[i][1];
            // This is an action, just invoke a function.
            if (typeof slotValue === 'function') {
                slotValue();
            }
            (0, testing_1.tick)(timeToWait);
            fixture.detectChanges();
            if (typeof slotValue === 'string') {
                const actual = fixture.nativeElement.textContent.trim();
                expect(actual).withContext(`${slots[i][0]}ms`).toBe(slotValue);
            }
        }
    });
}
class FakeTimerScheduler {
    constructor() {
        this.cbs = [];
    }
    add(delay, callback) {
        this.cbs.push(callback);
    }
    remove(callback) {
        /* noop */
    }
    invoke() {
        for (const cb of this.cbs) {
            cb();
        }
    }
}
let DebugConsole = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = console_1.Console;
    var DebugConsole = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.logs = [];
        }
        log(message) {
            this.logs.push(message);
        }
        warn(message) {
            this.logs.push(message);
        }
    };
    __setFunctionName(_classThis, "DebugConsole");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DebugConsole = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DebugConsole = _classThis;
})();
exports.DebugConsole = DebugConsole;
/**
 * Provides a debug console instance that allows to capture all
 * produces messages for testing purposes.
 */
function withDebugConsole() {
    return [{ provide: console_1.Console, useClass: DebugConsole }];
}
/**
 * Given a template, creates a component fixture and returns
 * a set of helper functions to trigger rendering of prefetching
 * of a defer block.
 */
function createFixture(template) {
    let NestedCmp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'nested-cmp',
                template: '{{ block }}',
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _block_decorators;
        let _block_initializers = [];
        let _block_extraInitializers = [];
        var NestedCmp = _classThis = class {
            constructor() {
                this.block = __runInitializers(this, _block_initializers, void 0);
                __runInitializers(this, _block_extraInitializers);
            }
        };
        __setFunctionName(_classThis, "NestedCmp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _block_decorators = [(0, core_1.Input)()];
            __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            NestedCmp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return NestedCmp = _classThis;
    })();
    let MyCmp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'simple-app',
                imports: [NestedCmp],
                template,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MyCmp = _classThis = class {
            constructor() {
                this.trigger = false;
                this.prefetchTrigger = false;
            }
        };
        __setFunctionName(_classThis, "MyCmp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyCmp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyCmp = _classThis;
    })();
    let loadingTimeout = 0;
    const deferDepsInterceptor = {
        intercept() {
            return () => {
                return [dynamicImportOf(NestedCmp, loadingTimeout)];
            };
        },
    };
    testing_1.TestBed.configureTestingModule({
        providers: [
            ...COMMON_PROVIDERS,
            { provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor },
        ],
    });
    clearDirectiveDefs(MyCmp);
    const fixture = testing_1.TestBed.createComponent(MyCmp);
    fixture.detectChanges();
    const trigger = (loadingResourcesTime) => () => {
        loadingTimeout = loadingResourcesTime;
        fixture.componentInstance.trigger = true;
        fixture.detectChanges();
    };
    const triggerPrefetch = (loadingResourcesTime) => () => {
        loadingTimeout = loadingResourcesTime;
        fixture.componentInstance.prefetchTrigger = true;
        fixture.detectChanges();
    };
    return { trigger, triggerPrefetch, fixture };
}
// Set `PLATFORM_ID` to a browser platform value to trigger defer loading
// while running tests in Node.
const COMMON_PROVIDERS = [
    { provide: core_1.PLATFORM_ID, useValue: common_1.ɵPLATFORM_BROWSER_ID },
    (0, ng_reflect_1.provideNgReflectAttributes)(),
];
describe('@defer', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({ providers: COMMON_PROVIDERS });
    });
    it('should transition between placeholder, loading and loaded states', () => __awaiter(void 0, void 0, void 0, function* () {
        let MyLazyCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-lazy-cmp',
                    template: 'Hi!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyLazyCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyLazyCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyLazyCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyLazyCmp = _classThis;
        })();
        let MyCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'simple-app',
                    imports: [MyLazyCmp],
                    template: `
        @defer (when isVisible) {
          <my-lazy-cmp />
        } @loading {
          Loading...
        } @placeholder {
          Placeholder!
        } @error {
          Failed to load dependencies :(
        }
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyCmp = _classThis = class {
                constructor() {
                    this.isVisible = false;
                }
            };
            __setFunctionName(_classThis, "MyCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(MyCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
        fixture.componentInstance.isVisible = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).toContain('Loading');
        // Wait for dependencies to load.
        yield allPendingDynamicImports();
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).toContain('<my-lazy-cmp>Hi!</my-lazy-cmp>');
    }));
    it('should work when only main block is present', () => __awaiter(void 0, void 0, void 0, function* () {
        let MyLazyCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'my-lazy-cmp',
                    template: 'Hi!',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyLazyCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "MyLazyCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyLazyCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyLazyCmp = _classThis;
        })();
        let MyCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'simple-app',
                    imports: [MyLazyCmp],
                    template: `
        <p>Text outside of a defer block</p>
        @defer (when isVisible) {
          <my-lazy-cmp />
        }
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyCmp = _classThis = class {
                constructor() {
                    this.isVisible = false;
                }
            };
            __setFunctionName(_classThis, "MyCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(MyCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).toContain('Text outside of a defer block');
        fixture.componentInstance.isVisible = true;
        fixture.detectChanges();
        // Wait for dependencies to load.
        yield allPendingDynamicImports();
        fixture.detectChanges();
        expect(fixture.nativeElement.outerHTML).toContain('<my-lazy-cmp>Hi!</my-lazy-cmp>');
    }));
    it('should be able to use pipes injecting ChangeDetectorRef in defer blocks', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestPipe = (() => {
            let _classDecorators = [(0, core_1.Pipe)({ name: 'test' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestPipe = _classThis = class {
                constructor() {
                    this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                }
                transform(value) {
                    return value;
                }
            };
            __setFunctionName(_classThis, "TestPipe");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestPipe = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestPipe = _classThis;
        })();
        let MyCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    imports: [TestPipe],
                    template: `@defer (when isVisible | test; prefetch when isVisible | test) {Hello}`,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyCmp = _classThis = class {
                constructor() {
                    this.isVisible = false;
                }
            };
            __setFunctionName(_classThis, "MyCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(MyCmp);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('');
        fixture.componentInstance.isVisible = true;
        fixture.detectChanges();
        yield allPendingDynamicImports();
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toBe('Hello');
    }));
    it('should preserve execution order of dependencies', () => __awaiter(void 0, void 0, void 0, function* () {
        // Important note: the framework does *NOT* guarantee an exact order
        // in which directives are instantiated. Directives should not depend
        // on the order in which other directives are invoked. This test just
        // verifies that the order does not change when a particular part of
        // code is wrapped using the `@defer` block.
        const logs = [];
        let DirA = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dirA]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DirA = _classThis = class {
                constructor(mode) {
                    logs.push(`DirA.${mode}`);
                }
            };
            __setFunctionName(_classThis, "DirA");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirA = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirA = _classThis;
        })();
        let DirB = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dirB]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DirB = _classThis = class {
                constructor(mode) {
                    logs.push(`DirB.${mode}`);
                }
            };
            __setFunctionName(_classThis, "DirB");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirB = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirB = _classThis;
        })();
        let DirC = (() => {
            let _classDecorators = [(0, core_1.Directive)({
                    selector: '[dirC]',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DirC = _classThis = class {
                constructor(mode) {
                    logs.push(`DirC.${mode}`);
                }
            };
            __setFunctionName(_classThis, "DirC");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DirC = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DirC = _classThis;
        })();
        let MyCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    // Directive order is intentional here (different from the order
                    // in which they are defined on the host element).
                    imports: [DirC, DirB, DirA],
                    template: `
        @defer (when isVisible) {
          <div mode="defer" dirA dirB dirC></div>
        }
        <div mode="eager" dirA dirB dirC></div>
      `,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var MyCmp = _classThis = class {
                constructor() {
                    this.isVisible = true;
                }
            };
            __setFunctionName(_classThis, "MyCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                MyCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return MyCmp = _classThis;
        })();
        const fixture = testing_1.TestBed.createComponent(MyCmp);
        fixture.detectChanges();
        yield allPendingDynamicImports();
        fixture.detectChanges();
        const actual = { defer: [], eager: [] };
        for (const log of logs) {
            const [dir, category] = log.split('.');
            actual[category].push(dir);
        }
        // Expect that in both cases we have the same order.
        expect(actual.defer).toEqual(actual.eager);
    }));
    describe('with OnPush', () => {
        it('should render when @defer is used inside of an OnPush component', () => __awaiter(void 0, void 0, void 0, function* () {
            let MyLazyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-lazy-cmp',
                        template: '{{ foo }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyLazyCmp = _classThis = class {
                    constructor() {
                        this.foo = 'bar';
                    }
                };
                __setFunctionName(_classThis, "MyLazyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyLazyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyLazyCmp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        imports: [MyLazyCmp],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: `
          @defer (on immediate) {
            <my-lazy-cmp />
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            // Wait for dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('<my-lazy-cmp>bar</my-lazy-cmp>');
        }));
        it('should render when @defer-loaded component uses OnPush', () => __awaiter(void 0, void 0, void 0, function* () {
            let MyLazyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-lazy-cmp',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: '{{ foo }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyLazyCmp = _classThis = class {
                    constructor() {
                        this.foo = 'bar';
                    }
                };
                __setFunctionName(_classThis, "MyLazyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyLazyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyLazyCmp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        imports: [MyLazyCmp],
                        template: `
          @defer (on immediate) {
            <my-lazy-cmp />
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            // Wait for dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('<my-lazy-cmp>bar</my-lazy-cmp>');
        }));
        it('should render when both @defer-loaded and host component use OnPush', () => __awaiter(void 0, void 0, void 0, function* () {
            let MyLazyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-lazy-cmp',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: '{{ foo }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyLazyCmp = _classThis = class {
                    constructor() {
                        this.foo = 'bar';
                    }
                };
                __setFunctionName(_classThis, "MyLazyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyLazyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyLazyCmp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        imports: [MyLazyCmp],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: `
          @defer (on immediate) {
            <my-lazy-cmp />
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            // Wait for dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('<my-lazy-cmp>bar</my-lazy-cmp>');
        }));
        it('should render when both OnPush components used in other blocks (e.g. @placeholder)', () => __awaiter(void 0, void 0, void 0, function* () {
            let MyLazyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-lazy-cmp',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: '{{ foo }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyLazyCmp = _classThis = class {
                    constructor() {
                        this.foo = 'main';
                    }
                };
                __setFunctionName(_classThis, "MyLazyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyLazyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyLazyCmp = _classThis;
            })();
            let AnotherLazyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'another-lazy-cmp',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: '{{ foo }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnotherLazyCmp = _classThis = class {
                    constructor() {
                        this.foo = 'placeholder';
                    }
                };
                __setFunctionName(_classThis, "AnotherLazyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnotherLazyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnotherLazyCmp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        imports: [MyLazyCmp, AnotherLazyCmp],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        template: `
              @defer (when isVisible) {
                <my-lazy-cmp />
              } @placeholder {
                <another-lazy-cmp />
              }
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                        this.changeDetectorRef = (0, core_1.inject)(core_1.ChangeDetectorRef);
                    }
                    triggerDeferBlock() {
                        this.isVisible = true;
                        this.changeDetectorRef.detectChanges();
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            // Expect placeholder to be rendered correctly.
            expect(fixture.nativeElement.outerHTML).toContain('<another-lazy-cmp>placeholder</another-lazy-cmp>');
            fixture.componentInstance.triggerDeferBlock();
            // Wait for dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('<my-lazy-cmp>main</my-lazy-cmp>');
        }));
    });
    describe('with HMR', () => {
        beforeEach(() => {
            globalThis['ngHmrMode'] = true;
        });
        afterEach(() => {
            globalThis['ngHmrMode'] = undefined;
        });
        it('should produce a message into a console about eagerly loaded deps', () => __awaiter(void 0, void 0, void 0, function* () {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        template: `
          @defer (when true) {
            Defer block #1
          }
          @defer (on immediate) {
            Defer block #2
          }
          @defer (when true) {
            Defer block #3
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ providers: [withDebugConsole()] });
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            // Wait for all async actions to complete.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Make sure that the HMR message is present in the console and there is
            // only a single instance of a message.
            const console = testing_1.TestBed.inject(console_1.Console);
            const errorCode = (0, errors_1.formatRuntimeErrorCode)(-751 /* RuntimeErrorCode.DEFER_IN_HMR_MODE */);
            const hmrMessages = console.logs.filter((log) => log.indexOf(errorCode) > -1);
            expect(hmrMessages.length).withContext('HMR message should be present once').toBe(1);
            const textContent = fixture.nativeElement.textContent;
            expect(textContent).toContain('Defer block #1');
            expect(textContent).toContain('Defer block #2');
            expect(textContent).toContain('Defer block #3');
        }));
        it('should not produce a message about eagerly loaded deps if no defer blocks are present', () => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        template: `No defer blocks`,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({ providers: [withDebugConsole()] });
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            // Make sure that there were no HMR messages present in the console, because
            // there were no defer blocks in a template.
            const console = testing_1.TestBed.inject(console_1.Console);
            const errorCode = (0, errors_1.formatRuntimeErrorCode)(-751 /* RuntimeErrorCode.DEFER_IN_HMR_MODE */);
            const hmrMessages = console.logs.filter((log) => log.indexOf(errorCode) > -1);
            expect(hmrMessages.length).withContext('HMR message should *not* be present').toBe(0);
            expect(fixture.nativeElement.textContent).toContain('No defer blocks');
        });
    });
    describe('`on` conditions', () => {
        it('should support `on immediate` condition', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
          @defer (on immediate) {
            <nested-cmp [block]="'primary'" />
          } @placeholder {
            Placeholder
          } @loading {
            Loading
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [dynamicImportOf(NestedCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [
                    ...COMMON_PROVIDERS,
                    { provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor },
                ],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            // Expecting that no placeholder content would be rendered when
            // a loading block is present.
            expect(fixture.nativeElement.outerHTML).toContain('Loading');
            // Expecting loading function to be triggered right away.
            expect(loadingFnInvokedTimes).toBe(1);
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was not invoked again.
            expect(loadingFnInvokedTimes).toBe(1);
            // Verify primary block content.
            const primaryBlockHTML = fixture.nativeElement.outerHTML;
            expect(primaryBlockHTML).toContain('<nested-cmp ng-reflect-block="primary">Rendering primary block.</nested-cmp>');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
        }));
    });
    describe('directive matching', () => {
        it('should support directive matching in all blocks', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        imports: [NestedCmp],
                        template: `
        @defer (when isVisible) {
          <nested-cmp [block]="'primary'" />
        } @loading {
          Loading...
          <nested-cmp [block]="'loading'" />
        } @placeholder {
          Placeholder!
          <nested-cmp [block]="'placeholder'" />
        } @error {
          Failed to load dependencies :(
          <nested-cmp [block]="'error'" />
        }
      `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('<nested-cmp ng-reflect-block="placeholder">Rendering placeholder block.</nested-cmp>');
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('<nested-cmp ng-reflect-block="loading">Rendering loading block.</nested-cmp>');
            // Wait for dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('<nested-cmp ng-reflect-block="primary">Rendering primary block.</nested-cmp>');
        }));
    });
    describe('minimum and after conditions', () => {
        it('should support minimum and after conditions', (0, testing_1.fakeAsync)(() => {
            const { trigger, fixture } = createFixture(`
            @defer (when trigger; prefetch when prefetchTrigger) {
              <nested-cmp [block]="'Main'" />
            } @loading (after 100ms; minimum 150ms) {
              Loading
            } @placeholder (minimum 100ms) {
              Placeholder
            } @error {
              Error
            }
          `);
            verifyTimeline(fixture, [50, 'Placeholder'], [100, trigger(170)], [150, 'Placeholder'], [250, 'Loading'], [300, 'Loading'], [450, 'Main']);
        }));
        it('should support @placeholder with `minimum`', (0, testing_1.fakeAsync)(() => {
            const { trigger, fixture } = createFixture(`
          @defer (when trigger; prefetch when prefetchTrigger) {
            <nested-cmp [block]="'Main'" />
          } @placeholder (minimum 100ms) {
            Placeholder
          }
        `);
            verifyTimeline(fixture, [0, trigger(40)], [90, 'Placeholder'], [100, 'Main']);
        }));
        it('should keep rendering @placeholder if trigger happened later', (0, testing_1.fakeAsync)(() => {
            const { trigger, fixture } = createFixture(`
          @defer (when trigger; prefetch when prefetchTrigger) {
            <nested-cmp [block]="'Main'" />
          } @placeholder (minimum 100ms) {
            Placeholder
          }
        `);
            verifyTimeline(fixture, [0, 'Placeholder'], [50, trigger(20)], [90, 'Placeholder'], [100, 'Main']);
        }));
        it('should transition from @placeholder to primary content ' + 'if it was prefetched', (0, testing_1.fakeAsync)(() => {
            const { trigger, triggerPrefetch, fixture } = createFixture(`
         @defer (when trigger; prefetch when prefetchTrigger) {
           <nested-cmp [block]="'Main'" />
         } @placeholder (minimum 100ms) {
           Placeholder
         }
       `);
            verifyTimeline(fixture, [0, 'Placeholder'], [20, triggerPrefetch(20)], [150, 'Placeholder'], [200, trigger(0)], [225, 'Main']);
        }));
        it('should support @loading with `minimum`', (0, testing_1.fakeAsync)(() => {
            const { trigger, fixture } = createFixture(`
          @defer (when trigger; prefetch when prefetchTrigger) {
            <nested-cmp [block]="'Main'" />
          } @loading (minimum 100ms) {
            Loading
          }
        `);
            verifyTimeline(fixture, [0, trigger(20)], 
            // Even though loading happened in 20ms,
            // we still render @loading block for longer
            // period of time, since there was `minimum` defined.
            [95, 'Loading'], [100, 'Main']);
        }));
        it('should support @loading with `after` and `minimum`', (0, testing_1.fakeAsync)(() => {
            const { trigger, fixture } = createFixture(`
         @defer (when trigger; prefetch when prefetchTrigger) {
           <nested-cmp [block]="'Main'" />
         } @loading (after 100ms; minimum 150ms) {
           Loading
         }
       `);
            verifyTimeline(fixture, [0, trigger(150)], [50, ''], 
            // Start showing loading after `after` ms.
            [100, 'Loading'], [150, 'Loading'], [200, 'Loading'], 
            // Render main content after `after` + `minimum` ms.
            [300, 'Main']);
        }));
        it('should skip @loading when resources were prefetched', (0, testing_1.fakeAsync)(() => {
            const { trigger, triggerPrefetch, fixture } = createFixture(`
          @defer (when trigger; prefetch when prefetchTrigger) {
            <nested-cmp [block]="'Main'" />
          } @loading (minimum 100ms) {
            Loading
          }
        `);
            verifyTimeline(fixture, [0, triggerPrefetch(50)], [50, ''], [75, ''], [100, trigger(0)], 
            // We go directly into the final state, since
            // resources were already preloaded.
            [125, 'Main']);
        }));
    });
    describe('error handling', () => {
        it('should render an error block when loading fails', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        imports: [NestedCmp],
                        template: `
          @defer (when isVisible) {
            <nested-cmp [block]="'primary'" />
          } @loading {
            Loading...
          } @placeholder {
            Placeholder!
          } @error {
            Failed to load dependencies :(
            <nested-cmp [block]="'error'" />
          }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _cmps_decorators;
                let _cmps_initializers = [];
                let _cmps_extraInitializers = [];
                var MyCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                        this.cmps = __runInitializers(this, _cmps_initializers, void 0);
                        __runInitializers(this, _cmps_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _cmps_decorators = [(0, core_1.ViewChildren)(NestedCmp)];
                    __esDecorate(null, null, _cmps_decorators, { kind: "field", name: "cmps", static: false, private: false, access: { has: obj => "cmps" in obj, get: obj => obj.cmps, set: (obj, value) => { obj.cmps = value; } }, metadata: _metadata }, _cmps_initializers, _cmps_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const deferDepsInterceptor = {
                intercept() {
                    return () => [failedDynamicImport()];
                },
            };
            testing_1.TestBed.configureTestingModule({
                rethrowApplicationErrors: false,
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Loading');
            // Wait for dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify that the error block is rendered.
            // Also verify that selector matching works in an error block.
            expect(fixture.nativeElement.outerHTML).toContain('<nested-cmp ng-reflect-block="error">Rendering error block.</nested-cmp>');
            // Verify that queries work within an error block.
            expect(fixture.componentInstance.cmps.length).toBe(1);
            expect((_a = fixture.componentInstance.cmps.get(0)) === null || _a === void 0 ? void 0 : _a.block).toBe('error');
        }));
        it('should report an error to the ErrorHandler if no `@error` block is defined', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'NestedCmp',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NestedCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        imports: [NestedCmp],
                        template: `
          @defer (when isVisible) {
            <nested-cmp />
          } @loading {
            Loading...
          } @placeholder {
            Placeholder
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const deferDepsInterceptor = {
                intercept() {
                    return () => [failedDynamicImport()];
                },
            };
            const reportedErrors = [];
            testing_1.TestBed.configureTestingModule({
                rethrowApplicationErrors: false,
                providers: [
                    {
                        provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR,
                        useValue: deferDepsInterceptor,
                    },
                    {
                        provide: core_1.ErrorHandler,
                        useClass: class extends core_1.ErrorHandler {
                            handleError(error) {
                                reportedErrors.push(error);
                            }
                        },
                    },
                ],
            });
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Loading');
            // Wait for dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify that there was an error reported to the `ErrorHandler`.
            expect(reportedErrors.length).toBe(1);
            expect(reportedErrors[0].message).toContain('NG0750');
            expect(reportedErrors[0].message).toContain(`(used in the 'MyCmp' component template)`);
        }));
        it('should not render `@error` block if loaded component has errors', () => __awaiter(void 0, void 0, void 0, function* () {
            let CmpWithError = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp-with-error',
                        template: 'CmpWithError',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CmpWithError = _classThis = class {
                    constructor() {
                        throw new Error('CmpWithError produced an error');
                    }
                };
                __setFunctionName(_classThis, "CmpWithError");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CmpWithError = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CmpWithError = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        imports: [CmpWithError],
                        template: `
          @defer (when isVisible) {
            <cmp-with-error />
          } @loading {
            Loading...
          } @error {
            Error
          } @placeholder {
            Placeholder
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const deferDepsInterceptor = {
                intercept() {
                    return () => [dynamicImportOf(CmpWithError)];
                },
            };
            const reportedErrors = [];
            testing_1.TestBed.configureTestingModule({
                rethrowApplicationErrors: false,
                providers: [
                    {
                        provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR,
                        useValue: deferDepsInterceptor,
                    },
                    {
                        provide: core_1.ErrorHandler,
                        useClass: class extends core_1.ErrorHandler {
                            handleError(error) {
                                reportedErrors.push(error);
                            }
                        },
                    },
                ],
            });
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Loading');
            // Wait for dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect an error to be reported to the `ErrorHandler`.
            expect(reportedErrors.length).toBe(1);
            expect(reportedErrors[0].message).toBe('CmpWithError produced an error');
            // Expect that the `@loading` UI is removed, but the `@error` is *not* rendered,
            // because it was a component initialization error, not resource loading issue.
            expect(fixture.nativeElement.textContent).toBe('');
        }));
        describe('with ngDevMode', () => {
            const _global = global_1.global;
            let saveNgDevMode;
            beforeEach(() => (saveNgDevMode = ngDevMode));
            afterEach(() => (_global.ngDevMode = saveNgDevMode));
            [true, false].forEach((devMode) => {
                it(`should log an error in the handler when there is no error block with devMode:${devMode}`, () => __awaiter(void 0, void 0, void 0, function* () {
                    let NestedCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'nested-cmp',
                                template: 'Rendering {{ block }} block.',
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _block_decorators;
                        let _block_initializers = [];
                        let _block_extraInitializers = [];
                        var NestedCmp = _classThis = class {
                            constructor() {
                                this.block = __runInitializers(this, _block_initializers, void 0);
                                __runInitializers(this, _block_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "NestedCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _block_decorators = [(0, core_1.Input)()];
                            __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            NestedCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return NestedCmp = _classThis;
                    })();
                    let MyCmp = (() => {
                        let _classDecorators = [(0, core_1.Component)({
                                selector: 'simple-app',
                                imports: [NestedCmp],
                                template: `
          @defer (when isVisible) {
            <nested-cmp [block]="'primary'" />
          } @loading {
            Loading...
          } @placeholder {
            Placeholder!
          }
          `,
                            })];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        let _cmps_decorators;
                        let _cmps_initializers = [];
                        let _cmps_extraInitializers = [];
                        var MyCmp = _classThis = class {
                            constructor() {
                                this.isVisible = false;
                                this.cmps = __runInitializers(this, _cmps_initializers, void 0);
                                __runInitializers(this, _cmps_extraInitializers);
                            }
                        };
                        __setFunctionName(_classThis, "MyCmp");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            _cmps_decorators = [(0, core_1.ViewChildren)(NestedCmp)];
                            __esDecorate(null, null, _cmps_decorators, { kind: "field", name: "cmps", static: false, private: false, access: { has: obj => "cmps" in obj, get: obj => obj.cmps, set: (obj, value) => { obj.cmps = value; } }, metadata: _metadata }, _cmps_initializers, _cmps_extraInitializers);
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            MyCmp = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return MyCmp = _classThis;
                    })();
                    const deferDepsInterceptor = {
                        intercept() {
                            return () => [failedDynamicImport()];
                        },
                    };
                    const errorLogs = [];
                    let CustomErrorHandler = (() => {
                        let _classDecorators = [(0, core_1.Injectable)()];
                        let _classDescriptor;
                        let _classExtraInitializers = [];
                        let _classThis;
                        var CustomErrorHandler = _classThis = class {
                            handleError(error) {
                                errorLogs.push(error);
                            }
                        };
                        __setFunctionName(_classThis, "CustomErrorHandler");
                        (() => {
                            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                            CustomErrorHandler = _classThis = _classDescriptor.value;
                            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                            __runInitializers(_classThis, _classExtraInitializers);
                        })();
                        return CustomErrorHandler = _classThis;
                    })();
                    testing_1.TestBed.configureTestingModule({
                        rethrowApplicationErrors: false,
                        providers: [
                            { provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor },
                            {
                                provide: core_1.ErrorHandler,
                                useClass: CustomErrorHandler,
                            },
                        ],
                    });
                    const fixture = testing_1.TestBed.createComponent(MyCmp);
                    fixture.detectChanges();
                    expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
                    fixture.componentInstance.isVisible = true;
                    fixture.detectChanges();
                    expect(fixture.nativeElement.outerHTML).toContain('Loading');
                    // ngDevMode should not be set earlier than here
                    // as it would prevent the DEFER_BLOCK_DEPENDENCY_INTERCEPTOR from being set
                    _global.ngDevMode = devMode;
                    // Wait for dependencies to load.
                    yield allPendingDynamicImports();
                    fixture.detectChanges();
                    expect(errorLogs.length).toBe(1);
                    const error = errorLogs[0];
                    expect(error).toBeInstanceOf(core_1.ɵRuntimeError);
                    expect(error.message).toMatch(/NG0750/);
                }));
            });
        });
    });
    describe('queries', () => {
        it('should query for components within each block', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c;
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'simple-app',
                        imports: [NestedCmp],
                        template: `
          @defer (when isVisible) {
            <nested-cmp [block]="'primary'" />
          } @loading {
            Loading...
            <nested-cmp [block]="'loading'" />
          } @placeholder {
            Placeholder!
            <nested-cmp [block]="'placeholder'" />
          } @error {
            Failed to load dependencies :(
            <nested-cmp [block]="'error'" />
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _cmps_decorators;
                let _cmps_initializers = [];
                let _cmps_extraInitializers = [];
                var MyCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                        this.cmps = __runInitializers(this, _cmps_initializers, void 0);
                        __runInitializers(this, _cmps_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _cmps_decorators = [(0, core_1.ViewChildren)(NestedCmp)];
                    __esDecorate(null, null, _cmps_decorators, { kind: "field", name: "cmps", static: false, private: false, access: { has: obj => "cmps" in obj, get: obj => obj.cmps, set: (obj, value) => { obj.cmps = value; } }, metadata: _metadata }, _cmps_initializers, _cmps_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.componentInstance.cmps.length).toBe(1);
            expect((_a = fixture.componentInstance.cmps.get(0)) === null || _a === void 0 ? void 0 : _a.block).toBe('placeholder');
            expect(fixture.nativeElement.outerHTML).toContain('<nested-cmp ng-reflect-block="placeholder">Rendering placeholder block.</nested-cmp>');
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            expect(fixture.componentInstance.cmps.length).toBe(1);
            expect((_b = fixture.componentInstance.cmps.get(0)) === null || _b === void 0 ? void 0 : _b.block).toBe('loading');
            expect(fixture.nativeElement.outerHTML).toContain('<nested-cmp ng-reflect-block="loading">Rendering loading block.</nested-cmp>');
            // Wait for dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            expect(fixture.componentInstance.cmps.length).toBe(1);
            expect((_c = fixture.componentInstance.cmps.get(0)) === null || _c === void 0 ? void 0 : _c.block).toBe('primary');
            expect(fixture.nativeElement.outerHTML).toContain('<nested-cmp ng-reflect-block="primary">Rendering primary block.</nested-cmp>');
        }));
    });
    describe('content projection', () => {
        it('should be able to project content into each block', () => __awaiter(void 0, void 0, void 0, function* () {
            let CmpA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp-a',
                        template: 'CmpA',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CmpA = _classThis = class {
                };
                __setFunctionName(_classThis, "CmpA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CmpA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CmpA = _classThis;
            })();
            let CmpB = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp-b',
                        template: 'CmpB',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CmpB = _classThis = class {
                };
                __setFunctionName(_classThis, "CmpB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CmpB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CmpB = _classThis;
            })();
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'my-app',
                        imports: [NestedCmp],
                        template: `
          @defer (when isVisible) {
            <nested-cmp [block]="'primary'" />
            <ng-content />
          } @loading {
            Loading...
            <nested-cmp [block]="'loading'" />
          } @placeholder {
            Placeholder!
            <nested-cmp [block]="'placeholder'" />
          } @error {
            Failed to load dependencies :(
            <nested-cmp [block]="'error'" />
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _isVisible_decorators;
                let _isVisible_initializers = [];
                let _isVisible_extraInitializers = [];
                var MyCmp = _classThis = class {
                    constructor() {
                        this.isVisible = __runInitializers(this, _isVisible_initializers, false);
                        __runInitializers(this, _isVisible_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _isVisible_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _isVisible_decorators, { kind: "field", name: "isVisible", static: false, private: false, access: { has: obj => "isVisible" in obj, get: obj => obj.isVisible, set: (obj, value) => { obj.isVisible = value; } }, metadata: _metadata }, _isVisible_initializers, _isVisible_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [MyCmp, CmpA, CmpB],
                        template: `
          <my-app [isVisible]="isVisible">
            Projected content.
            <b>Including tags</b>
            <cmp-a />
            @defer (when isInViewport) {
              <cmp-b />
            } @placeholder {
              Projected defer block placeholder.
            }
          </my-app>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                        this.isInViewport = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('<nested-cmp ng-reflect-block="placeholder">Rendering placeholder block.</nested-cmp>');
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('<nested-cmp ng-reflect-block="loading">Rendering loading block.</nested-cmp>');
            // Wait for dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify primary block content.
            const primaryBlockHTML = fixture.nativeElement.outerHTML;
            expect(primaryBlockHTML).toContain('<nested-cmp ng-reflect-block="primary">Rendering primary block.</nested-cmp>');
            expect(primaryBlockHTML).toContain('Projected content.');
            expect(primaryBlockHTML).toContain('<b>Including tags</b>');
            expect(primaryBlockHTML).toContain('<cmp-a>CmpA</cmp-a>');
            expect(primaryBlockHTML).toContain('Projected defer block placeholder.');
            fixture.componentInstance.isInViewport = true;
            fixture.detectChanges();
            // Wait for projected block dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Nested defer block was triggered and the `CmpB` content got rendered.
            expect(fixture.nativeElement.outerHTML).toContain('<cmp-b>CmpB</cmp-b>');
        }));
    });
    describe('nested blocks', () => {
        it('should be able to have nested blocks', () => __awaiter(void 0, void 0, void 0, function* () {
            let CmpA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp-a',
                        template: 'CmpA',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CmpA = _classThis = class {
                };
                __setFunctionName(_classThis, "CmpA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CmpA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CmpA = _classThis;
            })();
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp, CmpA],
                        template: `
          @defer (when isVisible) {
            <nested-cmp [block]="'primary'" />

            @defer (when isInViewport) {
              <cmp-a />
            } @placeholder {
              Nested defer block placeholder.
            }
          } @placeholder {
            <nested-cmp [block]="'placeholder'" />
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                        this.isInViewport = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('<nested-cmp ng-reflect-block="placeholder">Rendering placeholder block.</nested-cmp>');
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify primary block content.
            const primaryBlockHTML = fixture.nativeElement.outerHTML;
            expect(primaryBlockHTML).toContain('<nested-cmp ng-reflect-block="primary">Rendering primary block.</nested-cmp>');
            // Make sure we have a nested block in a placeholder state.
            expect(primaryBlockHTML).toContain('Nested defer block placeholder.');
            // Trigger condition for the nested block.
            fixture.componentInstance.isInViewport = true;
            fixture.detectChanges();
            // Wait for nested block dependencies to load.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Nested defer block was triggered and the `CmpB` content got rendered.
            expect(fixture.nativeElement.outerHTML).toContain('<cmp-a>CmpA</cmp-a>');
        }));
        it('should handle nested blocks that defer load the same dep', () => __awaiter(void 0, void 0, void 0, function* () {
            let CmpA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'cmp-a',
                        template: 'CmpA',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var CmpA = _classThis = class {
                };
                __setFunctionName(_classThis, "CmpA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    CmpA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return CmpA = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [CmpA],
                        template: `
          @defer (on immediate) {
            <cmp-a />

            @defer (on immediate) {
              <cmp-a />
            }
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        return [dynamicImportOf(CmpA)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            // Wait for the dependency fn promise to resolve.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Await all async work to be completed.
            yield fixture.whenStable();
            // Expect both <cmp-a> components to be rendered.
            expect(fixture.nativeElement.innerHTML.replaceAll('<!--container-->', '')).toBe('<cmp-a>CmpA</cmp-a><cmp-a>CmpA</cmp-a>');
        }));
    });
    describe('prefetch', () => {
        /**
         * Sets up interceptors for when an idle callback is requested
         * and when it's cancelled. This is needed to keep track of calls
         * made to `requestIdleCallback` and `cancelIdleCallback` APIs.
         */
        let id = 0;
        let idleCallbacksRequested;
        let idleCallbacksInvoked;
        let idleCallbacksCancelled;
        const onIdleCallbackQueue = new Map();
        function resetCounters() {
            idleCallbacksRequested = 0;
            idleCallbacksInvoked = 0;
            idleCallbacksCancelled = 0;
        }
        resetCounters();
        let nativeRequestIdleCallback;
        let nativeCancelIdleCallback;
        const mockRequestIdleCallback = (callback, options) => {
            onIdleCallbackQueue.set(id, callback);
            expect(idleCallbacksRequested).toBe(0);
            expect(core_1.NgZone.isInAngularZone()).toBe(true);
            idleCallbacksRequested++;
            return id++;
        };
        const mockCancelIdleCallback = (id) => {
            onIdleCallbackQueue.delete(id);
            idleCallbacksRequested--;
            idleCallbacksCancelled++;
        };
        const triggerIdleCallbacks = () => {
            for (const [_, callback] of onIdleCallbackQueue) {
                idleCallbacksInvoked++;
                callback(null);
            }
            onIdleCallbackQueue.clear();
        };
        beforeEach(() => {
            nativeRequestIdleCallback = globalThis.requestIdleCallback;
            nativeCancelIdleCallback = globalThis.cancelIdleCallback;
            globalThis.requestIdleCallback = mockRequestIdleCallback;
            globalThis.cancelIdleCallback = mockCancelIdleCallback;
            resetCounters();
        });
        afterEach(() => {
            globalThis.requestIdleCallback = nativeRequestIdleCallback;
            globalThis.cancelIdleCallback = nativeCancelIdleCallback;
            onIdleCallbackQueue.clear();
            resetCounters();
        });
        it('should be able to prefetch resources', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
          @defer (when deferCond; prefetch when prefetchCond) {
            <nested-cmp [block]="'primary'" />
          } @placeholder {
            Placeholder
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.deferCond = false;
                        this.prefetchCond = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [dynamicImportOf(NestedCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            // Trigger prefetching.
            fixture.componentInstance.prefetchCond = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Expect that placeholder content is still rendered.
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            // Trigger main content.
            fixture.componentInstance.deferCond = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify primary block content.
            const primaryBlockHTML = fixture.nativeElement.outerHTML;
            expect(primaryBlockHTML).toContain('<nested-cmp ng-reflect-block="primary">Rendering primary block.</nested-cmp>');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should handle a case when prefetching fails', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
          @defer (when deferCond; prefetch when prefetchCond) {
            <nested-cmp [block]="'primary'" />
          } @error {
            Loading failed
          } @placeholder {
            Placeholder
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.deferCond = false;
                        this.prefetchCond = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [failedDynamicImport()];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            // Trigger prefetching.
            fixture.componentInstance.prefetchCond = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Expect that placeholder content is still rendered.
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            // Trigger main content.
            fixture.componentInstance.deferCond = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Since prefetching failed, expect the error block to be rendered.
            expect(fixture.nativeElement.outerHTML).toContain('Loading failed');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should work when loading and prefetching were kicked off at the same time', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
          @defer (when deferCond; prefetch when deferCond) {
            <nested-cmp [block]="'primary'" />
          } @error {
            Loading failed
          } @placeholder {
            Placeholder
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.deferCond = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [dynamicImportOf(NestedCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            // Trigger prefetching and loading at the same time.
            fixture.componentInstance.deferCond = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once,
            // even though both main loading and prefetching were kicked off
            // at the same time.
            expect(loadingFnInvokedTimes).toBe(1);
            // Expect the main content to be rendered.
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary block');
        }));
        it('should support `prefetch on idle` condition', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
          @defer (when deferCond; prefetch on idle) {
            <nested-cmp [block]="'primary'" />
          } @placeholder {
            Placeholder
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.deferCond = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [dynamicImportOf(NestedCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            triggerIdleCallbacks();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Expect that placeholder content is still rendered.
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            // Trigger main content.
            fixture.componentInstance.deferCond = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify primary block content.
            const primaryBlockHTML = fixture.nativeElement.outerHTML;
            expect(primaryBlockHTML).toContain('<nested-cmp ng-reflect-block="primary">Rendering primary block.</nested-cmp>');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should trigger prefetching based on `on idle` only once', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
          @for (item of items; track item) {
            @defer (when deferCond; prefetch on idle) {
              <nested-cmp [block]="'primary for \`' + item + '\`'" />
            } @placeholder {
              Placeholder \`{{ item }}\`
            }
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.deferCond = false;
                        this.items = ['a', 'b', 'c'];
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [dynamicImportOf(NestedCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `a`');
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `b`');
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `c`');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            triggerIdleCallbacks();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Expect that placeholder content is still rendered.
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `a`');
            // Trigger main content.
            fixture.componentInstance.deferCond = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify primary blocks content.
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `a` block');
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `b` block');
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `c` block');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should trigger fetching based on `on idle` only once', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
          @for (item of items; track item) {
            @defer (on idle; prefetch on idle) {
              <nested-cmp [block]="'primary for \`' + item + '\`'" />
            } @placeholder {
              Placeholder \`{{ item }}\`
            }
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.items = ['a', 'b', 'c'];
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [dynamicImportOf(NestedCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `a`');
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `b`');
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `c`');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            triggerIdleCallbacks();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Verify primary blocks content.
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `a` block');
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `b` block');
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `c` block');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should support `prefetch on immediate` condition', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
          @defer (when deferCond; prefetch on immediate) {
            <nested-cmp [block]="'primary'" />
          } @placeholder {
            Placeholder
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.deferCond = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [dynamicImportOf(NestedCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [
                    ...COMMON_PROVIDERS,
                    { provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor },
                ],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            // Expecting loading function to be triggered right away.
            expect(loadingFnInvokedTimes).toBe(1);
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Expect that placeholder content is still rendered.
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder');
            // Trigger main content.
            fixture.componentInstance.deferCond = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify primary block content.
            const primaryBlockHTML = fixture.nativeElement.outerHTML;
            expect(primaryBlockHTML).toContain('<nested-cmp ng-reflect-block="primary">Rendering primary block.</nested-cmp>');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should delay nested defer blocks with `on idle` triggers', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Primary block content.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let AnotherNestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'another-nested-cmp',
                        template: 'Nested block component.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnotherNestedCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "AnotherNestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnotherNestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnotherNestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp, AnotherNestedCmp],
                        template: `
          @defer (on idle; prefetch on idle) {
            <nested-cmp [block]="'primary for \`' + item + '\`'" />

            <!--
              Expecting that nested defer block would be initialized
              in a subsequent "requestIdleCallback" call.
            -->
            @defer (on idle) {
              <another-nested-cmp />
            } @placeholder {
              Nested block placeholder
            } @loading {
              Nested block loading
            }

          } @placeholder {
            Root block placeholder
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        const nextDeferredComponent = loadingFnInvokedTimes === 1 ? NestedCmp : AnotherNestedCmp;
                        return [dynamicImportOf(nextDeferredComponent)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Root block placeholder');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            // Trigger all scheduled callbacks and await all mocked dynamic imports.
            triggerIdleCallbacks();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Verify primary blocks content.
            expect(fixture.nativeElement.outerHTML).toContain('Primary block content');
            // Verify that nested defer block is in a placeholder mode.
            expect(fixture.nativeElement.outerHTML).toContain('Nested block placeholder');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
            triggerIdleCallbacks();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify that nested defer block now renders the main content.
            expect(fixture.nativeElement.outerHTML).toContain('Nested block component');
            // We loaded a nested block dependency, expect counter to be 2.
            expect(loadingFnInvokedTimes).toBe(2);
        }));
        it('should not request idle callback for each block in a for loop', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
          @for (item of items; track item) {
            @defer (on idle; prefetch on idle) {
              <nested-cmp [block]="'primary for \`' + item + '\`'" />
            } @placeholder {
              Placeholder \`{{ item }}\`
            }
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.items = ['a', 'b', 'c'];
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [dynamicImportOf(NestedCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `a`');
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `b`');
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `c`');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            // Trigger all scheduled callbacks and await all mocked dynamic imports.
            triggerIdleCallbacks();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Verify primary blocks content.
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `a` block');
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `b` block');
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `c` block');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should delay nested defer blocks with `on idle` triggers', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Primary block content.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let AnotherNestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'another-nested-cmp',
                        template: 'Nested block component.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnotherNestedCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "AnotherNestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnotherNestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnotherNestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp, AnotherNestedCmp],
                        template: `
          @defer (on idle; prefetch on idle) {
            <nested-cmp [block]="'primary for \`' + item + '\`'" />
            <!--
              Expecting that nested defer block would be initialized
              in a subsequent "requestIdleCallback" call.
            -->
            @defer (on idle) {
              <another-nested-cmp />
            } @placeholder {
              Nested block placeholder
            } @loading {
              Nested block loading
            }

          } @placeholder {
            Root block placeholder
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        const nextDeferredComponent = loadingFnInvokedTimes === 1 ? NestedCmp : AnotherNestedCmp;
                        return [dynamicImportOf(nextDeferredComponent)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
            });
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Root block placeholder');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            // Trigger all scheduled callbacks and await all mocked dynamic imports.
            triggerIdleCallbacks();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Verify primary blocks content.
            expect(fixture.nativeElement.outerHTML).toContain('Primary block content');
            // Verify that nested defer block is in a placeholder mode.
            expect(fixture.nativeElement.outerHTML).toContain('Nested block placeholder');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
            triggerIdleCallbacks();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify that nested defer block now renders the main content.
            expect(fixture.nativeElement.outerHTML).toContain('Nested block component');
            // We loaded a nested block dependency, expect counter to be 2.
            expect(loadingFnInvokedTimes).toBe(2);
        }));
        it('should clear idle handlers when defer block is triggered', () => __awaiter(void 0, void 0, void 0, function* () {
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        template: `
          @defer (when isVisible; on idle; prefetch on idle) {
            Hello world!
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({});
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            // Expecting that an idle callback was requested.
            expect(idleCallbacksRequested).toBe(1);
            expect(idleCallbacksInvoked).toBe(0);
            expect(idleCallbacksCancelled).toBe(0);
            // Trigger defer block.
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Expecting that an idle callback was cancelled and never invoked.
            expect(idleCallbacksRequested).toBe(0);
            expect(idleCallbacksInvoked).toBe(0);
            expect(idleCallbacksCancelled).toBe(1);
        }));
    });
    // Note: these cases specifically use `on interaction`, however
    // the resolution logic is the same for all triggers.
    describe('trigger resolution', () => {
        it('should resolve a trigger is outside the defer block', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            @defer (on interaction(trigger)) {
              Main content
            } @placeholder {
              Placeholder
            }

            <div>
              <div>
                <div>
                  <button #trigger></button>
                </div>
            </div>
          </div>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should resolve a trigger on a component outside the defer block', (0, testing_1.fakeAsync)(() => {
            let SomeComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'some-comp', template: '<button></button>' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [SomeComp],
                        template: `
            @defer (on interaction(trigger)) {
              Main content
            } @placeholder {
              Placeholder
            }

            <div>
              <div>
                <div>
                  <some-comp #trigger/>
                </div>
              </div>
            </div>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should resolve a trigger that is on a parent element', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <button #trigger>
              <div>
                <div>
                @defer (on interaction(trigger)) {
                  Main content
                } @placeholder {
                  Placeholder
                }
                </div>
              </div>
            </button>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should resolve a trigger that is inside a parent embedded view', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            @if (cond) {
              <button #trigger></button>

              @if (cond) {
                @if (cond) {
                  @defer (on interaction(trigger)) {
                    Main content
                  } @placeholder {
                    Placeholder
                  }
                }
              }
            }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.cond = true;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should resolve a trigger that is on a component in a parent embedded view', (0, testing_1.fakeAsync)(() => {
            let SomeComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'some-comp', template: '<button></button>' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [SomeComp],
                        template: `
              @if (cond) {
                <some-comp #trigger/>

                @if (cond) {
                  @if (cond) {
                    @defer (on interaction(trigger)) {
                      Main content
                    } @placeholder {
                      Placeholder
                    }
                  }
                }
              }
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.cond = true;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should resolve a trigger that is inside the placeholder', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              @defer (on interaction(trigger)) {
                Main content
              } @placeholder {
                Placeholder <div><div><div><button #trigger></button></div></div></div>
              }
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should resolve a trigger that is a component inside the placeholder', (0, testing_1.fakeAsync)(() => {
            let SomeComp = (() => {
                let _classDecorators = [(0, core_1.Component)({ selector: 'some-comp', template: '<button></button>' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SomeComp = _classThis = class {
                };
                __setFunctionName(_classThis, "SomeComp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SomeComp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SomeComp = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [SomeComp],
                        template: `
              @defer (on interaction(trigger)) {
                Main content
              } @placeholder {
                Placeholder <div><div><div><some-comp #trigger/></div></div></div>
              }
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
    });
    describe('interaction triggers', () => {
        it('should load the deferred content when the trigger is clicked', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              @defer (on interaction(trigger)) {
                Main content
              } @placeholder {
                Placeholder
              }

              <button #trigger></button>
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should load the deferred content when the trigger receives a keyboard event', (0, testing_1.fakeAsync)(() => {
            // Domino doesn't support creating custom events so we have to skip this test.
            if (!isBrowser) {
                return;
            }
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              @defer (on interaction(trigger)) {
                Main content
              } @placeholder {
                Placeholder
              }

              <button #trigger></button>
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            const button = fixture.nativeElement.querySelector('button');
            button.dispatchEvent(new Event('keydown'));
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should load the deferred content when an implicit trigger is clicked', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
             @defer (on interaction) {
               Main content
             } @placeholder {
               <button>Placeholder</button>
             }
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should load the deferred content if a child of the trigger is clicked', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              @defer (on interaction(trigger)) {
                Main content
              } @placeholder {
                Placeholder
              }

             <div #trigger>
               <div>
                <button></button>
               </div>
             </div>
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should support multiple deferred blocks with the same trigger', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
             @defer (on interaction(trigger)) {
              Main content 1
             } @placeholder {
              Placeholder 1
             }

             @defer (on interaction(trigger)) {
              Main content 2
             } @placeholder {
              Placeholder 2
             }

             <button #trigger></button>
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder 1  Placeholder 2');
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content 1  Main content 2');
        }));
        it('should unbind the trigger events when the deferred block is loaded', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
             @defer (on interaction(trigger)) {Main content}
             <button #trigger></button>
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            const spy = spyOn(button, 'removeEventListener');
            button.click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith('click', jasmine.any(Function), jasmine.any(Object));
            expect(spy).toHaveBeenCalledWith('keydown', jasmine.any(Function), jasmine.any(Object));
        }));
        it('should unbind the trigger events when the trigger is destroyed', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            @if (renderBlock) {
              @defer (on interaction(trigger)) {Main content}
              <button #trigger></button>
            }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.renderBlock = true;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            const spy = spyOn(button, 'removeEventListener');
            fixture.componentInstance.renderBlock = false;
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith('click', jasmine.any(Function), jasmine.any(Object));
            expect(spy).toHaveBeenCalledWith('keydown', jasmine.any(Function), jasmine.any(Object));
        }));
        it('should unbind the trigger events when the deferred block is destroyed', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              @if (renderBlock) {
                @defer (on interaction(trigger)) {Main content}
              }

              <button #trigger></button>
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.renderBlock = true;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            const spy = spyOn(button, 'removeEventListener');
            fixture.componentInstance.renderBlock = false;
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith('click', jasmine.any(Function), jasmine.any(Object));
            expect(spy).toHaveBeenCalledWith('keydown', jasmine.any(Function), jasmine.any(Object));
        }));
        it('should remove placeholder content on interaction', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
           @defer (on interaction(trigger)) {
             Main content
           } @placeholder {
            <div>placeholder</div>
           }

           <button #trigger></button>
         `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({});
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            const zone = testing_1.TestBed.inject(core_1.NgZone);
            const componentRef = (0, core_1.createComponent)(MyCmp, {
                environmentInjector: testing_1.TestBed.inject(core_1.EnvironmentInjector),
            });
            const button = componentRef.location.nativeElement.querySelector('button');
            zone.run(() => {
                appRef.attachView(componentRef.hostView);
            });
            expect(componentRef.location.nativeElement.innerHTML).toContain('<div>placeholder</div>');
            zone.run(() => {
                button.click();
            });
            (0, testing_1.tick)();
            expect(componentRef.location.nativeElement.innerHTML).not.toContain('<div>placeholder</div>');
        }));
        it('should prefetch resources on interaction', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        template: `
              @defer (when isLoaded; prefetch on interaction(trigger)) {Main content}
              <button #trigger></button>
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        // We need a `when` trigger here so that `on idle` doesn't get added automatically.
                        this.isLoaded = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    {
                        provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR,
                        useValue: {
                            intercept: () => () => {
                                loadingFnInvokedTimes++;
                                return [];
                            },
                        },
                    },
                ],
            });
            clearDirectiveDefs(MyCmp);
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(loadingFnInvokedTimes).toBe(0);
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should prefetch resources on interaction with an implicit trigger', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        template: `
             @defer (when isLoaded; prefetch on interaction) {
              Main content
             } @placeholder {
              <button></button>
             }
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        // We need a `when` trigger here so that `on idle` doesn't get added automatically.
                        this.isLoaded = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    {
                        provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR,
                        useValue: {
                            intercept: () => () => {
                                loadingFnInvokedTimes++;
                                return [];
                            },
                        },
                    },
                ],
            });
            clearDirectiveDefs(MyCmp);
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(loadingFnInvokedTimes).toBe(0);
            fixture.nativeElement.querySelector('button').click();
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(loadingFnInvokedTimes).toBe(1);
        }));
    });
    describe('hover triggers', () => {
        it('should load the deferred content when the trigger is hovered', (0, testing_1.fakeAsync)(() => {
            // Domino doesn't support creating custom events so we have to skip this test.
            if (!isBrowser) {
                return;
            }
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              @defer (on hover(trigger)) {
                Main content
              } @placeholder {
                Placeholder
              }

              <button #trigger></button>
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            const button = fixture.nativeElement.querySelector('button');
            button.dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should load the deferred content with an implicit trigger element', (0, testing_1.fakeAsync)(() => {
            // Domino doesn't support creating custom events so we have to skip this test.
            if (!isBrowser) {
                return;
            }
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
             @defer (on hover) {
               Main content
             } @placeholder {
              <button>Placeholder</button>
             }
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            const button = fixture.nativeElement.querySelector('button');
            button.dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();
            (0, testing_1.flush)();
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should support multiple deferred blocks with the same hover trigger', (0, testing_1.fakeAsync)(() => {
            // Domino doesn't support creating custom events so we have to skip this test.
            if (!isBrowser) {
                return;
            }
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              @defer (on hover(trigger)) {
                Main content 1
              } @placeholder {
                Placeholder 1
              }

              @defer (on hover(trigger)) {
                Main content 2
              } @placeholder {
                Placeholder 2
              }

              <button #trigger></button>
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder 1  Placeholder 2');
            const button = fixture.nativeElement.querySelector('button');
            button.dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content 1  Main content 2');
        }));
        it('should unbind the trigger events when the deferred block is loaded', (0, testing_1.fakeAsync)(() => {
            // Domino doesn't support creating custom events so we have to skip this test.
            if (!isBrowser) {
                return;
            }
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
             @defer (on hover(trigger)) {
              Main content
             }
             <button #trigger></button>
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            const spy = spyOn(button, 'removeEventListener');
            button.dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(spy).toHaveBeenCalledTimes(3);
            expect(spy).toHaveBeenCalledWith('mouseenter', jasmine.any(Function), jasmine.any(Object));
            expect(spy).toHaveBeenCalledWith('mouseover', jasmine.any(Function), jasmine.any(Object));
            expect(spy).toHaveBeenCalledWith('focusin', jasmine.any(Function), jasmine.any(Object));
        }));
        it('should unbind the trigger events when the trigger is destroyed', (0, testing_1.fakeAsync)(() => {
            // Domino doesn't support creating custom events so we have to skip this test.
            if (!isBrowser) {
                return;
            }
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            @if (renderBlock) {
              @defer (on hover(trigger)) {
                Main content
              }
              <button #trigger></button>
            }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.renderBlock = true;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            const spy = spyOn(button, 'removeEventListener');
            fixture.componentInstance.renderBlock = false;
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledTimes(3);
            expect(spy).toHaveBeenCalledWith('mouseenter', jasmine.any(Function), jasmine.any(Object));
            expect(spy).toHaveBeenCalledWith('mouseover', jasmine.any(Function), jasmine.any(Object));
            expect(spy).toHaveBeenCalledWith('focusin', jasmine.any(Function), jasmine.any(Object));
        }));
        it('should unbind the trigger events when the deferred block is destroyed', (0, testing_1.fakeAsync)(() => {
            // Domino doesn't support creating custom events so we have to skip this test.
            if (!isBrowser) {
                return;
            }
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              @if (renderBlock) {
                @defer (on hover(trigger)) {
                  Main content
                }
              }

              <button #trigger></button>
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.renderBlock = true;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            const spy = spyOn(button, 'removeEventListener');
            fixture.componentInstance.renderBlock = false;
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledTimes(3);
            expect(spy).toHaveBeenCalledWith('mouseenter', jasmine.any(Function), jasmine.any(Object));
            expect(spy).toHaveBeenCalledWith('mouseover', jasmine.any(Function), jasmine.any(Object));
            expect(spy).toHaveBeenCalledWith('focusin', jasmine.any(Function), jasmine.any(Object));
        }));
        it('should prefetch resources on hover', (0, testing_1.fakeAsync)(() => {
            // Domino doesn't support creating custom events so we have to skip this test.
            if (!isBrowser) {
                return;
            }
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        template: `
              @defer (when isLoaded; prefetch on hover(trigger)) {
                Main content
              }
              <button #trigger></button>
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        // We need a `when` trigger here so that `on idle` doesn't get added automatically.
                        this.isLoaded = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    {
                        provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR,
                        useValue: {
                            intercept: () => () => {
                                loadingFnInvokedTimes++;
                                return [];
                            },
                        },
                    },
                ],
            });
            clearDirectiveDefs(MyCmp);
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(loadingFnInvokedTimes).toBe(0);
            const button = fixture.nativeElement.querySelector('button');
            button.dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should prefetch resources when an implicit trigger is hovered', (0, testing_1.fakeAsync)(() => {
            // Domino doesn't support creating custom events so we have to skip this test.
            if (!isBrowser) {
                return;
            }
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        template: `
             @defer (when isLoaded; prefetch on hover) {
               Main content
             } @placeholder {
               <button></button>
             }
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        // We need a `when` trigger here so that `on idle` doesn't get added automatically.
                        this.isLoaded = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    {
                        provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR,
                        useValue: {
                            intercept: () => () => {
                                loadingFnInvokedTimes++;
                                return [];
                            },
                        },
                    },
                ],
            });
            clearDirectiveDefs(MyCmp);
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(loadingFnInvokedTimes).toBe(0);
            const button = fixture.nativeElement.querySelector('button');
            button.dispatchEvent(new Event('mouseenter'));
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(loadingFnInvokedTimes).toBe(1);
        }));
    });
    describe('`on timer` triggers', () => {
        it('should trigger based on `on timer` condition', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
            @for (item of items; track item) {
              @defer (on timer(500ms)) {
                <nested-cmp [block]="'primary for \`' + item + '\`'" />
              } @placeholder {
                Placeholder \`{{ item }}\`
              }
            }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.items = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [dynamicImportOf(NestedCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor },
                    { provide: timer_scheduler_1.TimerScheduler, useClass: FakeTimerScheduler },
                ],
            });
            const fakeScheduler = testing_1.TestBed.inject(timer_scheduler_1.TimerScheduler);
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `a`');
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `b`');
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `c`');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            fakeScheduler.invoke();
            yield allPendingDynamicImports(); // fetching dependencies of the defer block
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Verify primary blocks content.
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `a` block');
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `b` block');
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `c` block');
            // Expect that the loading resources function was not invoked again (counter remains 1).
            expect(loadingFnInvokedTimes).toBe(1);
            // Adding an extra item to the list
            fixture.componentInstance.items = ['a', 'b', 'c', 'd'];
            fixture.detectChanges();
            // Make sure loading function is still 1 (i.e. wasn't invoked again).
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should trigger nested `on timer` condition', () => __awaiter(void 0, void 0, void 0, function* () {
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        template: `
          @defer (on timer(100ms)) {
            primary[top]

            @defer (on timer(100ms)) {
              primary[nested]
            } @placeholder {
              placeholder[nested]
            }
          } @placeholder {
            placeholder[top]
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: timer_scheduler_1.TimerScheduler, useClass: FakeTimerScheduler }],
            });
            const fakeScheduler = testing_1.TestBed.inject(timer_scheduler_1.TimerScheduler);
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            expect(fixture.nativeElement.outerHTML).toContain('placeholder[top]');
            fakeScheduler.invoke();
            yield allPendingDynamicImports(); // fetching dependencies of the defer block
            // Verify primary blocks content after triggering top-level @defer.
            expect(fixture.nativeElement.outerHTML).toContain('primary[top]');
            expect(fixture.nativeElement.outerHTML).toContain('placeholder[nested]');
            fakeScheduler.invoke();
            yield allPendingDynamicImports(); // fetching dependencies of the defer block
            // Verify that nested @defer block was triggered as well.
            expect(fixture.nativeElement.outerHTML).toContain('primary[top]');
            expect(fixture.nativeElement.outerHTML).toContain('primary[nested]');
        }));
    });
    describe('`prefetch on timer` triggers', () => {
        it('should trigger prefetching based on `on timer` condition', () => __awaiter(void 0, void 0, void 0, function* () {
            let NestedCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'nested-cmp',
                        template: 'Rendering {{ block }} block.',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _block_decorators;
                let _block_initializers = [];
                let _block_extraInitializers = [];
                var NestedCmp = _classThis = class {
                    constructor() {
                        this.block = __runInitializers(this, _block_initializers, void 0);
                        __runInitializers(this, _block_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "NestedCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _block_decorators = [(0, core_1.Input)()];
                    __esDecorate(null, null, _block_decorators, { kind: "field", name: "block", static: false, private: false, access: { has: obj => "block" in obj, get: obj => obj.block, set: (obj, value) => { obj.block = value; } }, metadata: _metadata }, _block_initializers, _block_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NestedCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NestedCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        imports: [NestedCmp],
                        template: `
            @for (item of items; track item) {
              @defer (when shouldTrigger; prefetch on timer(100ms)) {
                <nested-cmp [block]="'primary for \`' + item + '\`'" />
              } @placeholder {
                Placeholder \`{{ item }}\`
              }
            }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.shouldTrigger = false;
                        this.items = ['a', 'b', 'c'];
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        loadingFnInvokedTimes++;
                        return [dynamicImportOf(NestedCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor },
                    { provide: timer_scheduler_1.TimerScheduler, useClass: FakeTimerScheduler },
                ],
            });
            const fakeScheduler = testing_1.TestBed.inject(timer_scheduler_1.TimerScheduler);
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `a`');
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `b`');
            expect(fixture.nativeElement.outerHTML).toContain('Placeholder `c`');
            // Make sure loading function is not yet invoked.
            expect(loadingFnInvokedTimes).toBe(0);
            fakeScheduler.invoke();
            yield allPendingDynamicImports(); // fetching dependencies of the defer block
            fixture.detectChanges();
            // Expect that the loading resources function was invoked once.
            expect(loadingFnInvokedTimes).toBe(1);
            // Trigger rendering of all defer blocks.
            fixture.componentInstance.shouldTrigger = true;
            fixture.detectChanges();
            // Verify primary blocks content.
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `a` block');
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `b` block');
            expect(fixture.nativeElement.outerHTML).toContain('Rendering primary for `c` block');
            // Make sure the loading function wasn't invoked again (count remains `1`).
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should trigger prefetching and rendering based on `on timer` condition', (0, testing_1.fakeAsync)(() => {
            const { fixture } = createFixture(`
            @defer (on timer(200ms); prefetch on timer(100ms)) {
              <nested-cmp [block]="'Main'" />
            } @placeholder {
              Placeholder
            }
          `);
            verifyTimeline(fixture, [50, 'Placeholder'], [150, 'Placeholder'], [250, 'Main']);
        }));
        it('should clear timeout callbacks when defer block is triggered', (0, testing_1.fakeAsync)(() => {
            const setSpy = spyOn(globalThis, 'setTimeout');
            const clearSpy = spyOn(globalThis, 'clearTimeout');
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        template: `
              @defer (when isVisible; on timer(200ms); prefetch on timer(100ms)) {
                Hello world!
              }
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({});
            clearDirectiveDefs(RootCmp);
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            // Trigger defer block
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            // The `clearTimeout` was called synchronously, because the `when`
            // condition was triggered, which resulted in timers cleanup.
            expect(setSpy).toHaveBeenCalledTimes(2);
            expect(clearSpy).toHaveBeenCalledTimes(2);
        }));
    });
    describe('viewport triggers', () => {
        let activeObservers = [];
        let nativeIntersectionObserver;
        beforeEach(() => {
            nativeIntersectionObserver = globalThis.IntersectionObserver;
            globalThis.IntersectionObserver = MockIntersectionObserver;
        });
        afterEach(() => {
            globalThis.IntersectionObserver = nativeIntersectionObserver;
            activeObservers = [];
        });
        /**
         * Mocked out implementation of the native IntersectionObserver API. We need to
         * mock it out for tests, because it's unsupported in Domino and we can't trigger
         * it reliably in the browser.
         */
        class MockIntersectionObserver {
            constructor(callback) {
                this.callback = callback;
                this.root = null;
                this.rootMargin = null;
                this.thresholds = null;
                this.observedElements = new Set();
                this.elementsInView = new Set();
                activeObservers.push(this);
            }
            static invokeCallbacksForElement(element, isInView) {
                for (const observer of activeObservers) {
                    const elements = observer.elementsInView;
                    const wasInView = elements.has(element);
                    if (isInView) {
                        elements.add(element);
                    }
                    else {
                        elements.delete(element);
                    }
                    observer.invokeCallback();
                    if (wasInView) {
                        elements.add(element);
                    }
                    else {
                        elements.delete(element);
                    }
                }
            }
            invokeCallback() {
                for (const el of this.observedElements) {
                    this.callback([
                        {
                            target: el,
                            isIntersecting: this.elementsInView.has(el),
                            // Unsupported properties.
                            boundingClientRect: null,
                            intersectionRatio: null,
                            intersectionRect: null,
                            rootBounds: null,
                            time: null,
                        },
                    ], this);
                }
            }
            observe(element) {
                this.observedElements.add(element);
                // Native observers fire their callback as soon as an
                // element is observed so we try to mimic it here.
                this.invokeCallback();
            }
            unobserve(element) {
                this.observedElements.delete(element);
            }
            disconnect() {
                this.observedElements.clear();
                this.elementsInView.clear();
            }
            takeRecords() {
                throw new Error('Not supported');
            }
        }
        it('should load the deferred content when the trigger is in the viewport', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              @defer (on viewport(trigger)) {
                Main content
              } @placeholder {
                Placeholder
              }

              <button #trigger></button>
            `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            const button = fixture.nativeElement.querySelector('button');
            MockIntersectionObserver.invokeCallbacksForElement(button, true);
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should load the deferred content when an implicit trigger is in the viewport', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
             @defer (on viewport) {
               Main content
             } @placeholder {
              <button>Placeholder</button>
             }
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            const button = fixture.nativeElement.querySelector('button');
            MockIntersectionObserver.invokeCallbacksForElement(button, true);
            fixture.detectChanges();
            (0, testing_1.flush)();
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should not load the content if the trigger is not in the view yet', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
             @defer (on viewport(trigger)) {
              Main content
             } @placeholder {
              Placeholder
             }

             <button #trigger></button>
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            const button = fixture.nativeElement.querySelector('button');
            MockIntersectionObserver.invokeCallbacksForElement(button, false);
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            MockIntersectionObserver.invokeCallbacksForElement(button, false);
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder');
            MockIntersectionObserver.invokeCallbacksForElement(button, true);
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content');
        }));
        it('should support multiple deferred blocks with the same trigger', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            @defer (on viewport(trigger)) {
              Main content 1
            } @placeholder {
              Placeholder 1
            }

            @defer (on viewport(trigger)) {
              Main content 2
            } @placeholder {
              Placeholder 2
            }

            <button #trigger></button>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(fixture.nativeElement.textContent.trim()).toBe('Placeholder 1  Placeholder 2');
            const button = fixture.nativeElement.querySelector('button');
            MockIntersectionObserver.invokeCallbacksForElement(button, true);
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(fixture.nativeElement.textContent.trim()).toBe('Main content 1  Main content 2');
        }));
        it('should stop observing the trigger when the deferred block is loaded', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            @defer (on viewport(trigger)) {
              Main content
            }
            <button #trigger></button>
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            expect(activeObservers.length).toBe(1);
            expect(activeObservers[0].observedElements.size).toBe(1);
            expect(activeObservers[0].observedElements.has(button)).toBe(true);
            MockIntersectionObserver.invokeCallbacksForElement(button, true);
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(activeObservers.length).toBe(1);
            expect(activeObservers[0].observedElements.size).toBe(0);
        }));
        it('should stop observing the trigger when the trigger is destroyed', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
           @if (renderBlock) {
             @defer (on viewport(trigger)) {
              Main content
             }
             <button #trigger></button>
           }
         `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.renderBlock = true;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            expect(activeObservers.length).toBe(1);
            expect(activeObservers[0].observedElements.size).toBe(1);
            expect(activeObservers[0].observedElements.has(button)).toBe(true);
            fixture.componentInstance.renderBlock = false;
            fixture.detectChanges();
            expect(activeObservers.length).toBe(1);
            expect(activeObservers[0].observedElements.size).toBe(0);
        }));
        it('should stop observing the trigger when the deferred block is destroyed', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
             @if (renderBlock) {
              @defer (on viewport(trigger)) {
                Main content
              }
             }

             <button #trigger></button>
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.renderBlock = true;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            expect(activeObservers.length).toBe(1);
            expect(activeObservers[0].observedElements.size).toBe(1);
            expect(activeObservers[0].observedElements.has(button)).toBe(true);
            fixture.componentInstance.renderBlock = false;
            fixture.detectChanges();
            expect(activeObservers.length).toBe(1);
            expect(activeObservers[0].observedElements.size).toBe(0);
        }));
        it('should disconnect the intersection observer once all deferred blocks have been loaded', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
            <button #triggerOne></button>
            @defer (on viewport(triggerOne)) {
              One
            }

            <button #triggerTwo></button>
            @defer (on viewport(triggerTwo)) {
              Two
            }
          `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(activeObservers.length).toBe(1);
            const buttons = Array.from(fixture.nativeElement.querySelectorAll('button'));
            const observer = activeObservers[0];
            const disconnectSpy = spyOn(observer, 'disconnect').and.callThrough();
            expect(Array.from(observer.observedElements)).toEqual(buttons);
            MockIntersectionObserver.invokeCallbacksForElement(buttons[0], true);
            fixture.detectChanges();
            expect(disconnectSpy).not.toHaveBeenCalled();
            expect(Array.from(observer.observedElements)).toEqual([buttons[1]]);
            MockIntersectionObserver.invokeCallbacksForElement(buttons[1], true);
            fixture.detectChanges();
            expect(disconnectSpy).toHaveBeenCalled();
            expect(observer.observedElements.size).toBe(0);
        }));
        it('should prefetch resources when the trigger comes into the viewport', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        template: `
             @defer (when isLoaded; prefetch on viewport(trigger)) {
              Main content
             }
             <button #trigger></button>
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        // We need a `when` trigger here so that `on idle` doesn't get added automatically.
                        this.isLoaded = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    {
                        provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR,
                        useValue: {
                            intercept: () => () => {
                                loadingFnInvokedTimes++;
                                return [];
                            },
                        },
                    },
                ],
            });
            clearDirectiveDefs(MyCmp);
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(loadingFnInvokedTimes).toBe(0);
            const button = fixture.nativeElement.querySelector('button');
            MockIntersectionObserver.invokeCallbacksForElement(button, true);
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should prefetch resources when an implicit trigger comes into the viewport', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-app',
                        template: `
             @defer (when isLoaded; prefetch on viewport) {
              Main content
             } @placeholder {
               <button></button>
             }
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        // We need a `when` trigger here so that `on idle` doesn't get added automatically.
                        this.isLoaded = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            let loadingFnInvokedTimes = 0;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    {
                        provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR,
                        useValue: {
                            intercept: () => () => {
                                loadingFnInvokedTimes++;
                                return [];
                            },
                        },
                    },
                ],
            });
            clearDirectiveDefs(MyCmp);
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            expect(loadingFnInvokedTimes).toBe(0);
            const button = fixture.nativeElement.querySelector('button');
            MockIntersectionObserver.invokeCallbacksForElement(button, true);
            fixture.detectChanges();
            (0, testing_1.flush)();
            expect(loadingFnInvokedTimes).toBe(1);
        }));
        it('should load deferred content in a loop', (0, testing_1.fakeAsync)(() => {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
              @for (item of items; track item) {
                @defer (on viewport) {d{{item}} }
                @placeholder {<button>p{{item}} </button>}
              }
           `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3, 4, 5, 6];
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const buttons = Array.from(fixture.nativeElement.querySelectorAll('button'));
            const items = fixture.componentInstance.items;
            // None of the blocks are loaded yet.
            expect(fixture.nativeElement.textContent.trim()).toBe('p1 p2 p3 p4 p5 p6');
            // First half of the blocks is loaded.
            for (let i = 0; i < items.length / 2; i++) {
                MockIntersectionObserver.invokeCallbacksForElement(buttons[i], true);
                fixture.detectChanges();
                (0, testing_1.flush)();
            }
            expect(fixture.nativeElement.textContent.trim()).toBe('d1 d2 d3 p4 p5 p6');
            // Second half of the blocks is loaded.
            for (let i = items.length / 2; i < items.length; i++) {
                MockIntersectionObserver.invokeCallbacksForElement(buttons[i], true);
                fixture.detectChanges();
                (0, testing_1.flush)();
            }
            expect(fixture.nativeElement.textContent.trim()).toBe('d1 d2 d3 d4 d5 d6');
        }));
    });
    describe('DOM-based events cleanup', () => {
        it('should unbind `interaction` trigger events when the deferred block is loaded', () => __awaiter(void 0, void 0, void 0, function* () {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          @defer (
            when isVisible;
            on interaction(trigger);
            prefetch on interaction(prefetchTrigger)
          ) { Main content }
          <button #trigger></button>
          <div #prefetchTrigger></div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            const triggerSpy = spyOn(button, 'removeEventListener');
            const div = fixture.nativeElement.querySelector('div');
            const prefetchSpy = spyOn(div, 'removeEventListener');
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify that trigger element is cleaned up.
            expect(triggerSpy).toHaveBeenCalledTimes(2);
            expect(triggerSpy).toHaveBeenCalledWith('click', jasmine.any(Function), jasmine.any(Object));
            expect(triggerSpy).toHaveBeenCalledWith('keydown', jasmine.any(Function), jasmine.any(Object));
            // Verify that prefetch trigger element is cleaned up.
            expect(prefetchSpy).toHaveBeenCalledTimes(2);
            expect(prefetchSpy).toHaveBeenCalledWith('click', jasmine.any(Function), jasmine.any(Object));
            expect(prefetchSpy).toHaveBeenCalledWith('keydown', jasmine.any(Function), jasmine.any(Object));
        }));
        it('should unbind `hover` trigger events when the deferred block is loaded', () => __awaiter(void 0, void 0, void 0, function* () {
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
          @defer (
            when isVisible;
            on hover(trigger);
            prefetch on hover(prefetchTrigger)
          ) { Main content }
          <button #trigger></button>
          <div #prefetchTrigger></div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.isVisible = false;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            const button = fixture.nativeElement.querySelector('button');
            const triggerSpy = spyOn(button, 'removeEventListener');
            const div = fixture.nativeElement.querySelector('div');
            const prefetchSpy = spyOn(div, 'removeEventListener');
            fixture.componentInstance.isVisible = true;
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify that trigger element is cleaned up.
            expect(triggerSpy).toHaveBeenCalledTimes(3);
            expect(triggerSpy).toHaveBeenCalledWith('mouseenter', jasmine.any(Function), jasmine.any(Object));
            expect(triggerSpy).toHaveBeenCalledWith('mouseover', jasmine.any(Function), jasmine.any(Object));
            expect(triggerSpy).toHaveBeenCalledWith('focusin', jasmine.any(Function), jasmine.any(Object));
            // Verify that prefetch trigger element is cleaned up.
            expect(prefetchSpy).toHaveBeenCalledTimes(3);
            expect(prefetchSpy).toHaveBeenCalledWith('mouseenter', jasmine.any(Function), jasmine.any(Object));
            expect(prefetchSpy).toHaveBeenCalledWith('mouseover', jasmine.any(Function), jasmine.any(Object));
            expect(prefetchSpy).toHaveBeenCalledWith('focusin', jasmine.any(Function), jasmine.any(Object));
        }));
    });
    describe('DI', () => {
        it('should provide access to tokens from a parent component', () => __awaiter(void 0, void 0, void 0, function* () {
            const TokenA = new core_1.InjectionToken('A');
            const TokenB = new core_1.InjectionToken('B');
            let ParentCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent-cmp',
                        template: '<ng-content />',
                        providers: [{ provide: TokenA, useValue: 'TokenA.ParentCmp' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentCmp = _classThis;
            })();
            let ChildCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child-cmp',
                        template: 'Token A: {{ parentTokenA }} | Token B: {{ parentTokenB }}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildCmp = _classThis = class {
                    constructor() {
                        this.parentTokenA = (0, core_1.inject)(TokenA);
                        this.parentTokenB = (0, core_1.inject)(TokenB);
                    }
                };
                __setFunctionName(_classThis, "ChildCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildCmp = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-root',
                        template: `
          <parent-cmp>
            @defer (when isVisible) {
              <child-cmp />
            }
          </parent-cmp>
        `,
                        imports: [ChildCmp, ParentCmp],
                        providers: [{ provide: TokenB, useValue: 'TokenB.RootCmp' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmp = _classThis = class {
                    constructor() {
                        this.isVisible = true;
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        return [dynamicImportOf(ChildCmp)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
                deferBlockBehavior: testing_1.DeferBlockBehavior.Playthrough,
            });
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify that tokens from parent components are available for injection
            // inside a component within a `@defer` block.
            const tokenA = 'TokenA.ParentCmp';
            const tokenB = 'TokenB.RootCmp';
            expect(fixture.nativeElement.innerHTML).toContain(`<child-cmp>Token A: ${tokenA} | Token B: ${tokenB}</child-cmp>`);
        }));
        it('should provide access to tokens from a parent component ' +
            'for components instantiated via `createComponent` call (when a corresponding NodeInjector is used in the call), ' +
            'but attached to the ApplicationRef', () => __awaiter(void 0, void 0, void 0, function* () {
            const TokenA = new core_1.InjectionToken('A');
            const TokenB = new core_1.InjectionToken('B');
            let MyModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [{ provide: TokenB, useValue: 'TokenB value' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyModule = _classThis = class {
                };
                __setFunctionName(_classThis, "MyModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyModule = _classThis;
            })();
            let Lazy = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        imports: [MyModule],
                        template: `
          Lazy Component! Token: {{ token }}
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Lazy = _classThis = class {
                    constructor() {
                        this.token = (0, core_1.inject)(TokenA);
                    }
                };
                __setFunctionName(_classThis, "Lazy");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Lazy = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Lazy = _classThis;
            })();
            let Dialog = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [Lazy],
                        template: `
          @defer (on immediate) {
            <lazy />
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Dialog = _classThis = class {
                };
                __setFunctionName(_classThis, "Dialog");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Dialog = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Dialog = _classThis;
            })();
            let RootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-root',
                        providers: [{ provide: TokenA, useValue: 'TokenA from RootCmp' }],
                        template: `
          <div #container></div>
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _container_decorators;
                let _container_initializers = [];
                let _container_extraInitializers = [];
                var RootCmp = _classThis = class {
                    openModal() {
                        const hostElement = this.container.nativeElement;
                        const componentRef = (0, core_1.createComponent)(Dialog, {
                            hostElement,
                            elementInjector: this.injector,
                            environmentInjector: this.envInjector,
                        });
                        this.appRef.attachView(componentRef.hostView);
                        componentRef.changeDetectorRef.detectChanges();
                    }
                    constructor() {
                        this.injector = (0, core_1.inject)(core_1.Injector);
                        this.appRef = (0, core_1.inject)(core_1.ApplicationRef);
                        this.envInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
                        this.container = __runInitializers(this, _container_initializers, void 0);
                        __runInitializers(this, _container_extraInitializers);
                    }
                };
                __setFunctionName(_classThis, "RootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _container_decorators = [(0, core_1.ViewChild)('container', { read: core_1.ElementRef })];
                    __esDecorate(null, null, _container_decorators, { kind: "field", name: "container", static: false, private: false, access: { has: obj => "container" in obj, get: obj => obj.container, set: (obj, value) => { obj.container = value; } }, metadata: _metadata }, _container_initializers, _container_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmp = _classThis;
            })();
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        return [dynamicImportOf(Lazy)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor },
                ],
                deferBlockBehavior: testing_1.DeferBlockBehavior.Playthrough,
            });
            const fixture = testing_1.TestBed.createComponent(RootCmp);
            fixture.detectChanges();
            fixture.componentInstance.openModal();
            // The call above instantiates a component that uses a `@defer` block,
            // so we need to wait for dynamic imports to complete.
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify that tokens from parent components are available for injection
            // inside a component within a `@defer` block.
            expect(fixture.nativeElement.innerHTML).toContain(`<lazy> Lazy Component! Token: TokenA from RootCmp </lazy>`);
        }));
    });
    describe('NgModules', () => {
        it('should provide access to tokens from imported NgModules', () => __awaiter(void 0, void 0, void 0, function* () {
            let serviceInitCount = 0;
            const TokenA = new core_1.InjectionToken('');
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
                    constructor() {
                        this.id = 'ChartsModule.Service';
                        serviceInitCount++;
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
            let Chart = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'chart',
                        template: 'Service:{{ svc.id }}|TokenA:{{ tokenA }}',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Chart = _classThis = class {
                    constructor() {
                        this.svc = (0, core_1.inject)(Service);
                        this.tokenA = (0, core_1.inject)(TokenA);
                    }
                };
                __setFunctionName(_classThis, "Chart");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Chart = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Chart = _classThis;
            })();
            let ChartsModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [Service],
                        declarations: [Chart],
                        exports: [Chart],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChartsModule = _classThis = class {
                };
                __setFunctionName(_classThis, "ChartsModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChartsModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChartsModule = _classThis;
            })();
            let ChartCollectionComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'chart-collection',
                        template: '<chart />',
                        imports: [ChartsModule],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChartCollectionComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "ChartCollectionComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChartCollectionComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChartCollectionComponent = _classThis;
            })();
            let MyCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'app-root',
                        template: `
          @for(item of items; track $index) {
            @defer (when isVisible) {
              <chart-collection />
            }
          }
        `,
                        imports: [ChartCollectionComponent],
                        providers: [{ provide: TokenA, useValue: 'MyCmp.A' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyCmp = _classThis = class {
                    constructor() {
                        this.items = [1, 2, 3];
                        this.isVisible = true;
                    }
                };
                __setFunctionName(_classThis, "MyCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyCmp = _classThis;
            })();
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        return [dynamicImportOf(ChartCollectionComponent)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [{ provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor }],
                deferBlockBehavior: testing_1.DeferBlockBehavior.Playthrough,
            });
            clearDirectiveDefs(MyCmp);
            const fixture = testing_1.TestBed.createComponent(MyCmp);
            fixture.detectChanges();
            yield allPendingDynamicImports();
            fixture.detectChanges();
            // Verify that the `Service` injectable was initialized only once,
            // even though it was injected in 3 instances of the `<chart>` component,
            // used within defer blocks.
            expect(serviceInitCount).toBe(1);
            expect(fixture.nativeElement.querySelectorAll('chart').length).toBe(3);
            // Verify that a service defined within an NgModule can inject services
            // provided within the same NgModule.
            const serviceFromNgModule = 'Service:ChartsModule.Service';
            // Make sure sure that a nested `<chart>` component from the defer block
            // can inject tokens provided in parent component (that contains `@defer`
            // in its template).
            const tokenFromRootComponent = 'TokenA:MyCmp.A';
            expect(fixture.nativeElement.innerHTML).toContain(`<chart>${serviceFromNgModule}|${tokenFromRootComponent}</chart>`);
        }));
    });
    describe('Router', () => {
        it('should inject correct `ActivatedRoutes` in components within defer blocks', () => __awaiter(void 0, void 0, void 0, function* () {
            let deferCmpEnvInjector;
            const TokenA = new core_1.InjectionToken('TokenA');
            let MyModuleA = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [{ provide: TokenA, useValue: 'nested' }],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var MyModuleA = _classThis = class {
                };
                __setFunctionName(_classThis, "MyModuleA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    MyModuleA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return MyModuleA = _classThis;
            })();
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [router_1.RouterOutlet],
                        template: '<router-outlet />',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var App = _classThis = class {
                };
                __setFunctionName(_classThis, "App");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    App = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return App = _classThis;
            })();
            let AnotherChild = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'another-child',
                        imports: [common_1.CommonModule, MyModuleA],
                        template: 'another child: {{route.snapshot.url[0]}} | token: {{tokenA}}',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var AnotherChild = _classThis = class {
                    constructor() {
                        this.route = (0, core_1.inject)(router_1.ActivatedRoute);
                        this.tokenA = (0, core_1.inject)(TokenA);
                        deferCmpEnvInjector = (0, core_1.inject)(core_1.EnvironmentInjector);
                    }
                };
                __setFunctionName(_classThis, "AnotherChild");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    AnotherChild = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return AnotherChild = _classThis;
            })();
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [common_1.CommonModule, AnotherChild],
                        template: `
          child: {{route.snapshot.url[0]}} |
          token: {{tokenA}}
          @defer (on immediate) {
            <another-child />
          }
        `,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                    constructor() {
                        this.route = (0, core_1.inject)(router_1.ActivatedRoute);
                        this.tokenA = (0, core_1.inject)(TokenA);
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
            const deferDepsInterceptor = {
                intercept() {
                    return () => {
                        return [dynamicImportOf(AnotherChild, 10)];
                    };
                },
            };
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: TokenA, useValue: 'root' },
                    { provide: core_1.PLATFORM_ID, useValue: common_1.ɵPLATFORM_BROWSER_ID },
                    { provide: core_1.ɵDEFER_BLOCK_DEPENDENCY_INTERCEPTOR, useValue: deferDepsInterceptor },
                    (0, router_1.provideRouter)([
                        { path: 'a', component: Child },
                        { path: 'b', component: Child },
                    ]),
                ],
            });
            clearDirectiveDefs(Child);
            const app = testing_1.TestBed.createComponent(App);
            yield testing_1.TestBed.inject(router_1.Router).navigateByUrl('/a');
            app.detectChanges();
            yield allPendingDynamicImports();
            app.detectChanges();
            expect(app.nativeElement.innerHTML).toContain('child: a | token: root');
            expect(app.nativeElement.innerHTML).toContain('another child: a | token: nested');
            // Navigate to `/b`
            yield testing_1.TestBed.inject(router_1.Router).navigateByUrl('/b');
            app.detectChanges();
            yield allPendingDynamicImports();
            app.detectChanges();
            // Make sure that the `getInjectorResolutionPath` debugging utility
            // (used by DevTools) doesn't expose Router's `OutletInjector` in
            // the resolution path. `OutletInjector` is a special case, because it
            // doesn't store any tokens itself, we point to the parent injector instead.
            const resolutionPath = (0, injector_discovery_utils_1.getInjectorResolutionPath)(deferCmpEnvInjector);
            for (const inj of resolutionPath) {
                expect(inj).not.toBeInstanceOf(chained_injector_1.ChainedInjector);
            }
            // Expect that `ActivatedRoute` information get updated inside
            // of a component used in a `@defer` block.
            expect(app.nativeElement.innerHTML).toContain('child: b | token: root');
            expect(app.nativeElement.innerHTML).toContain('another child: b | token: nested');
        }));
    });
});
