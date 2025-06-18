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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const index_1 = require("../../index");
const testing_2 = require("../../testing");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const provide_router_1 = require("../../src/provide_router");
describe('navigateForTest', () => {
    it('gives null for the activatedComponent when no routes are configured', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({ providers: [(0, index_1.provideRouter)([])] });
        const harness = yield testing_2.RouterTestingHarness.create('/');
        expect(harness.routeDebugElement).toBeNull();
    }));
    it('navigates to routed component', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: 'hello {{name}}' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor() {
                    this.name = 'world';
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
        testing_1.TestBed.configureTestingModule({ providers: [(0, index_1.provideRouter)([{ path: '', component: TestCmp }])] });
        const harness = yield testing_2.RouterTestingHarness.create();
        const activatedComponent = yield harness.navigateByUrl('/', TestCmp);
        expect(activatedComponent).toBeInstanceOf(TestCmp);
        expect((_a = harness.routeNativeElement) === null || _a === void 0 ? void 0 : _a.innerHTML).toContain('hello world');
    }));
    it('executes guards on the path', () => __awaiter(void 0, void 0, void 0, function* () {
        let guardCalled = false;
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: '',
                        canActivate: [
                            () => {
                                guardCalled = true;
                                return true;
                            },
                        ],
                        children: [],
                    },
                ]),
            ],
        });
        yield testing_2.RouterTestingHarness.create('/');
        expect(guardCalled).toBeTrue();
    }));
    it('throws error if routing throws', () => __awaiter(void 0, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'e',
                        canActivate: [
                            () => {
                                throw new Error('oh no');
                            },
                        ],
                        children: [],
                    },
                ], (0, provide_router_1.withRouterConfig)({ resolveNavigationPromiseOnError: true })),
            ],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        yield expectAsync(harness.navigateByUrl('e')).toBeResolvedTo(null);
    }));
    it('can observe param changes on routed component with second navigation', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '{{(route.params | async)?.id}}', imports: [common_1.AsyncPipe] })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmp = _classThis = class {
                constructor(route) {
                    this.route = route;
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
        testing_1.TestBed.configureTestingModule({
            providers: [(0, index_1.provideRouter)([{ path: ':id', component: TestCmp }])],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        const activatedComponent = yield harness.navigateByUrl('/123', TestCmp);
        expect(activatedComponent.route).toBeInstanceOf(index_1.ActivatedRoute);
        expect((_a = harness.routeNativeElement) === null || _a === void 0 ? void 0 : _a.innerHTML).toContain('123');
        yield harness.navigateByUrl('/456');
        expect((_b = harness.routeNativeElement) === null || _b === void 0 ? void 0 : _b.innerHTML).toContain('456');
    }));
    it('throws an error if the routed component instance does not match the one required', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
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
        let OtherCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OtherCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "OtherCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OtherCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OtherCmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [(0, index_1.provideRouter)([{ path: '**', component: TestCmp }])],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        yield expectAsync(harness.navigateByUrl('/123', OtherCmp)).toBeRejected();
    }));
    it('throws an error if navigation fails but expected a component instance', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: '' })];
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
        testing_1.TestBed.configureTestingModule({
            providers: [(0, index_1.provideRouter)([{ path: '**', canActivate: [() => false], component: TestCmp }])],
        });
        const harness = yield testing_2.RouterTestingHarness.create();
        yield expectAsync(harness.navigateByUrl('/123', TestCmp)).toBeRejected();
    }));
    it('waits for redirects using router.navigate', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: 'test' })];
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
        let OtherCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({ template: 'redirect' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var OtherCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "OtherCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                OtherCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return OtherCmp = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, index_1.provideRouter)([
                    {
                        path: 'test',
                        canActivate: [() => (0, core_1.inject)(index_1.Router).navigateByUrl('/redirect')],
                        component: TestCmp,
                    },
                    { path: 'redirect', canActivate: [() => (0, rxjs_1.of)(true).pipe((0, operators_1.delay)(100))], component: OtherCmp },
                ]),
            ],
        });
        yield testing_2.RouterTestingHarness.create('test');
        expect(testing_1.TestBed.inject(index_1.Router).url).toEqual('/redirect');
    }));
});
