"use strict";
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
exports.routeDataIntegrationSuite = routeDataIntegrationSuite;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const common_1 = require("@angular/common");
const src_1 = require("../../src");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const integration_helpers_1 = require("./integration_helpers");
function routeDataIntegrationSuite() {
    describe('data', () => {
        class ResolveSix {
            resolve(route, state) {
                return 6;
            }
        }
        let NestedComponentWithData = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'nested-cmp',
                    template: 'nested-cmp',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NestedComponentWithData = _classThis = class {
                constructor(route) {
                    this.route = route;
                    this.data = [];
                    route.data.forEach((d) => this.data.push(d));
                }
            };
            __setFunctionName(_classThis, "NestedComponentWithData");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NestedComponentWithData = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NestedComponentWithData = _classThis;
        })();
        beforeEach(() => {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: 'resolveTwo', useValue: (a, b) => 2 },
                    { provide: 'resolveFour', useValue: (a, b) => 4 },
                    { provide: 'resolveSix', useClass: ResolveSix },
                    { provide: 'resolveError', useValue: (a, b) => Promise.reject('error') },
                    { provide: 'resolveNullError', useValue: (a, b) => Promise.reject(null) },
                    { provide: 'resolveEmpty', useValue: (a, b) => rxjs_1.EMPTY },
                    { provide: 'numberOfUrlSegments', useValue: (a, b) => a.url.length },
                ],
            });
        });
        it('should provide resolved data', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmpWithTwoOutlets);
            router.resetConfig([
                {
                    path: 'parent/:id',
                    data: { one: 1 },
                    resolve: { two: 'resolveTwo' },
                    children: [
                        { path: '', data: { three: 3 }, resolve: { four: 'resolveFour' }, component: integration_helpers_1.RouteCmp },
                        {
                            path: '',
                            data: { five: 5 },
                            resolve: { six: 'resolveSix' },
                            component: integration_helpers_1.RouteCmp,
                            outlet: 'right',
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/parent/1');
            yield (0, integration_helpers_1.advance)(fixture);
            const primaryCmp = fixture.debugElement.children[1].componentInstance;
            const rightCmp = fixture.debugElement.children[3].componentInstance;
            expect(primaryCmp.route.snapshot.data).toEqual({ one: 1, two: 2, three: 3, four: 4 });
            expect(rightCmp.route.snapshot.data).toEqual({ one: 1, two: 2, five: 5, six: 6 });
            const primaryRecorded = [];
            primaryCmp.route.data.forEach((rec) => primaryRecorded.push(rec));
            const rightRecorded = [];
            rightCmp.route.data.forEach((rec) => rightRecorded.push(rec));
            router.navigateByUrl('/parent/2');
            yield (0, integration_helpers_1.advance)(fixture);
            expect(primaryRecorded).toEqual([{ one: 1, three: 3, two: 2, four: 4 }]);
            expect(rightRecorded).toEqual([{ one: 1, five: 5, two: 2, six: 6 }]);
        }));
        it('should handle errors', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'simple', component: integration_helpers_1.SimpleCmp, resolve: { error: 'resolveError' } },
            ]);
            const recordedEvents = [];
            router.events.subscribe((e) => e instanceof src_1.RouterEvent && recordedEvents.push(e));
            let e = null;
            router.navigateByUrl('/simple').catch((error) => (e = error));
            yield (0, integration_helpers_1.advance)(fixture);
            (0, integration_helpers_1.expectEvents)(recordedEvents, [
                [src_1.NavigationStart, '/simple'],
                [src_1.RoutesRecognized, '/simple'],
                [src_1.GuardsCheckStart, '/simple'],
                [src_1.GuardsCheckEnd, '/simple'],
                [src_1.ResolveStart, '/simple'],
                [src_1.NavigationError, '/simple'],
            ]);
            expect(e).toEqual('error');
        }));
        it('should handle empty errors', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'simple', component: integration_helpers_1.SimpleCmp, resolve: { error: 'resolveNullError' } },
            ]);
            const recordedEvents = [];
            router.events.subscribe((e) => e instanceof src_1.RouterEvent && recordedEvents.push(e));
            let e = 'some value';
            router.navigateByUrl('/simple').catch((error) => (e = error));
            yield (0, integration_helpers_1.advance)(fixture);
            expect(e).toEqual(null);
        }));
        it('should not navigate when all resolvers return empty result', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'simple',
                    component: integration_helpers_1.SimpleCmp,
                    resolve: { e1: 'resolveEmpty', e2: 'resolveEmpty' },
                },
            ]);
            const recordedEvents = [];
            router.events.subscribe((e) => e instanceof src_1.RouterEvent && recordedEvents.push(e));
            let e = null;
            router.navigateByUrl('/simple').catch((error) => (e = error));
            yield (0, integration_helpers_1.advance)(fixture);
            (0, integration_helpers_1.expectEvents)(recordedEvents, [
                [src_1.NavigationStart, '/simple'],
                [src_1.RoutesRecognized, '/simple'],
                [src_1.GuardsCheckStart, '/simple'],
                [src_1.GuardsCheckEnd, '/simple'],
                [src_1.ResolveStart, '/simple'],
                [src_1.NavigationCancel, '/simple'],
            ]);
            expect(recordedEvents[recordedEvents.length - 1].code).toBe(src_1.NavigationCancellationCode.NoDataFromResolver);
            expect(e).toEqual(null);
        }));
        it('should not navigate when at least one resolver returns empty result', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'simple', component: integration_helpers_1.SimpleCmp, resolve: { e1: 'resolveTwo', e2: 'resolveEmpty' } },
            ]);
            const recordedEvents = [];
            router.events.subscribe((e) => e instanceof src_1.RouterEvent && recordedEvents.push(e));
            let e = null;
            router.navigateByUrl('/simple').catch((error) => (e = error));
            yield (0, integration_helpers_1.advance)(fixture);
            (0, integration_helpers_1.expectEvents)(recordedEvents, [
                [src_1.NavigationStart, '/simple'],
                [src_1.RoutesRecognized, '/simple'],
                [src_1.GuardsCheckStart, '/simple'],
                [src_1.GuardsCheckEnd, '/simple'],
                [src_1.ResolveStart, '/simple'],
                [src_1.NavigationCancel, '/simple'],
            ]);
            expect(e).toEqual(null);
        }));
        it('should not navigate when all resolvers for a child route from forChild() returns empty result', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            let LazyComponent1 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy-cmp',
                        template: 'lazy-loaded-1',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyComponent1 = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyComponent1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyComponent1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyComponent1 = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyComponent1],
                        imports: [
                            src_1.RouterModule.forChild([
                                {
                                    path: 'loaded',
                                    component: LazyComponent1,
                                    resolve: { e1: 'resolveEmpty', e2: 'resolveEmpty' },
                                },
                            ]),
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedModule = _classThis;
            })();
            router.resetConfig([{ path: 'lazy', loadChildren: () => LoadedModule }]);
            const recordedEvents = [];
            router.events.subscribe((e) => e instanceof src_1.RouterEvent && recordedEvents.push(e));
            let e = null;
            router.navigateByUrl('lazy/loaded').catch((error) => (e = error));
            yield (0, integration_helpers_1.advance)(fixture);
            (0, integration_helpers_1.expectEvents)(recordedEvents, [
                [src_1.NavigationStart, '/lazy/loaded'],
                [src_1.RoutesRecognized, '/lazy/loaded'],
                [src_1.GuardsCheckStart, '/lazy/loaded'],
                [src_1.GuardsCheckEnd, '/lazy/loaded'],
                [src_1.ResolveStart, '/lazy/loaded'],
                [src_1.NavigationCancel, '/lazy/loaded'],
            ]);
            expect(e).toEqual(null);
        }));
        it('should not navigate when at least one resolver for a child route from forChild() returns empty result', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            let LazyComponent1 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy-cmp',
                        template: 'lazy-loaded-1',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyComponent1 = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyComponent1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyComponent1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyComponent1 = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyComponent1],
                        imports: [
                            src_1.RouterModule.forChild([
                                {
                                    path: 'loaded',
                                    component: LazyComponent1,
                                    resolve: { e1: 'resolveTwo', e2: 'resolveEmpty' },
                                },
                            ]),
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedModule = _classThis;
            })();
            router.resetConfig([{ path: 'lazy', loadChildren: () => LoadedModule }]);
            const recordedEvents = [];
            router.events.subscribe((e) => e instanceof src_1.RouterEvent && recordedEvents.push(e));
            let e = null;
            router.navigateByUrl('lazy/loaded').catch((error) => (e = error));
            yield (0, integration_helpers_1.advance)(fixture);
            (0, integration_helpers_1.expectEvents)(recordedEvents, [
                [src_1.NavigationStart, '/lazy/loaded'],
                [src_1.RoutesRecognized, '/lazy/loaded'],
                [src_1.GuardsCheckStart, '/lazy/loaded'],
                [src_1.GuardsCheckEnd, '/lazy/loaded'],
                [src_1.ResolveStart, '/lazy/loaded'],
                [src_1.NavigationCancel, '/lazy/loaded'],
            ]);
            expect(e).toEqual(null);
        }));
        it('should include target snapshot in NavigationError when resolver throws', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const errorMessage = 'throwing resolver';
            let ThrowingResolver = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ThrowingResolver = _classThis = class {
                    resolve() {
                        throw new Error(errorMessage);
                    }
                };
                __setFunctionName(_classThis, "ThrowingResolver");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ThrowingResolver = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ThrowingResolver = _classThis;
            })();
            let caughtError;
            router.events.subscribe((e) => {
                if (e instanceof src_1.NavigationError) {
                    caughtError = e;
                }
            });
            router.resetConfig([
                { path: 'throwing', resolve: { thrower: ThrowingResolver }, component: integration_helpers_1.BlankCmp },
            ]);
            try {
                yield router.navigateByUrl('/throwing');
                fail('navigation should throw');
            }
            catch (e) {
                expect(e.message).toEqual(errorMessage);
            }
            expect(caughtError).toBeDefined();
            expect(caughtError === null || caughtError === void 0 ? void 0 : caughtError.target).toBeDefined();
        }));
        it('should preserve resolved data', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'parent',
                    resolve: { two: 'resolveTwo' },
                    children: [
                        { path: 'child1', component: integration_helpers_1.CollectParamsCmp },
                        { path: 'child2', component: integration_helpers_1.CollectParamsCmp },
                    ],
                },
            ]);
            router.navigateByUrl('/parent/child1');
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('/parent/child2');
            yield (0, integration_helpers_1.advance)(fixture);
            const cmp = fixture.debugElement.children[1].componentInstance;
            expect(cmp.route.snapshot.data).toEqual({ two: 2 });
        }));
        it('should override route static data with resolved data', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: '',
                    component: NestedComponentWithData,
                    resolve: { prop: 'resolveTwo' },
                    data: { prop: 'static' },
                },
            ]);
            router.navigateByUrl('/');
            yield (0, integration_helpers_1.advance)(fixture);
            const cmp = fixture.debugElement.children[1].componentInstance;
            expect(cmp.data).toEqual([{ prop: 2 }]);
        }));
        it('should correctly override inherited route static data with resolved data', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'a',
                    component: integration_helpers_1.WrapperCmp,
                    resolve: { prop2: 'resolveTwo' },
                    data: { prop: 'wrapper-a' },
                    children: [
                        // will inherit data from this child route because it has `path` and its parent has
                        // component
                        {
                            path: 'b',
                            data: { prop: 'nested-b' },
                            resolve: { prop3: 'resolveFour' },
                            children: [
                                {
                                    path: 'c',
                                    children: [
                                        { path: '', component: NestedComponentWithData, data: { prop3: 'nested' } },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/a/b/c');
            yield (0, integration_helpers_1.advance)(fixture);
            const pInj = fixture.debugElement.queryAll(by_1.By.directive(NestedComponentWithData))[0]
                .injector;
            const cmp = pInj.get(NestedComponentWithData);
            expect(cmp.data).toEqual([{ prop: 'nested-b', prop3: 'nested' }]);
        }));
        it('should not override inherited resolved data with inherited static data', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'a',
                    component: integration_helpers_1.WrapperCmp,
                    resolve: { prop2: 'resolveTwo' },
                    data: { prop: 'wrapper-a' },
                    children: [
                        // will inherit data from this child route because it has `path` and its parent has
                        // component
                        {
                            path: 'b',
                            data: { prop2: 'parent-b', prop: 'parent-b' },
                            children: [
                                {
                                    path: 'c',
                                    resolve: { prop2: 'resolveFour' },
                                    children: [
                                        {
                                            path: '',
                                            component: NestedComponentWithData,
                                            data: { prop: 'nested-d' },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/a/b/c');
            yield (0, integration_helpers_1.advance)(fixture);
            const pInj = fixture.debugElement.queryAll(by_1.By.directive(NestedComponentWithData))[0]
                .injector;
            const cmp = pInj.get(NestedComponentWithData);
            expect(cmp.data).toEqual([{ prop: 'nested-d', prop2: 4 }]);
        }));
        it('should not override nested route static data when both are using resolvers', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'child',
                    component: integration_helpers_1.WrapperCmp,
                    resolve: { prop: 'resolveTwo' },
                    children: [
                        {
                            path: '',
                            pathMatch: 'full',
                            component: NestedComponentWithData,
                            resolve: { prop: 'resolveFour' },
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/child');
            yield (0, integration_helpers_1.advance)(fixture);
            const pInj = fixture.debugElement.query(by_1.By.directive(NestedComponentWithData)).injector;
            const cmp = pInj.get(NestedComponentWithData);
            expect(cmp.data).toEqual([{ prop: 4 }]);
        }));
        it("should not override child route's static data when both are using static data", () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'child',
                    component: integration_helpers_1.WrapperCmp,
                    data: { prop: 'wrapper' },
                    children: [
                        {
                            path: '',
                            pathMatch: 'full',
                            component: NestedComponentWithData,
                            data: { prop: 'inner' },
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/child');
            yield (0, integration_helpers_1.advance)(fixture);
            const pInj = fixture.debugElement.query(by_1.By.directive(NestedComponentWithData)).injector;
            const cmp = pInj.get(NestedComponentWithData);
            expect(cmp.data).toEqual([{ prop: 'inner' }]);
        }));
        it("should not override child route's static data when wrapper is using resolved data and the child route static data", () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'nested',
                    component: integration_helpers_1.WrapperCmp,
                    resolve: { prop: 'resolveTwo', prop2: 'resolveSix' },
                    data: { prop3: 'wrapper-static', prop4: 'another-static' },
                    children: [
                        {
                            path: '',
                            pathMatch: 'full',
                            component: NestedComponentWithData,
                            data: { prop: 'nested', prop4: 'nested-static' },
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/nested');
            yield (0, integration_helpers_1.advance)(fixture);
            const pInj = fixture.debugElement.query(by_1.By.directive(NestedComponentWithData)).injector;
            const cmp = pInj.get(NestedComponentWithData);
            // Issue 34361 - `prop` should contain value defined in `data` object from the nested
            // route.
            expect(cmp.data).toEqual([
                { prop: 'nested', prop2: 6, prop3: 'wrapper-static', prop4: 'nested-static' },
            ]);
        }));
        it('should allow guards alter data resolved by routes', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'route',
                    component: NestedComponentWithData,
                    canActivate: [
                        (route) => {
                            route.data = { prop: 10 };
                            return true;
                        },
                    ],
                },
            ]);
            router.navigateByUrl('/route');
            yield (0, integration_helpers_1.advance)(fixture);
            const pInj = fixture.debugElement.query(by_1.By.directive(NestedComponentWithData)).injector;
            const cmp = pInj.get(NestedComponentWithData);
            expect(cmp.data).toEqual([{ prop: 10 }]);
        }));
        it('should rerun resolvers when the urls segments of a wildcard route change', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: '**',
                    component: integration_helpers_1.CollectParamsCmp,
                    resolve: { numberOfUrlSegments: 'numberOfUrlSegments' },
                },
            ]);
            router.navigateByUrl('/one/two');
            yield (0, integration_helpers_1.advance)(fixture);
            const cmp = fixture.debugElement.children[1].componentInstance;
            expect(cmp.route.snapshot.data).toEqual({ numberOfUrlSegments: 2 });
            router.navigateByUrl('/one/two/three');
            yield (0, integration_helpers_1.advance)(fixture);
            expect(cmp.route.snapshot.data).toEqual({ numberOfUrlSegments: 3 });
        }));
        describe('should run resolvers for the same route concurrently', () => {
            let log;
            let observer;
            beforeEach(() => {
                log = [];
                testing_1.TestBed.configureTestingModule({
                    providers: [
                        {
                            provide: 'resolver1',
                            useValue: () => {
                                const obs$ = new rxjs_1.Observable((obs) => {
                                    observer = obs;
                                    return () => { };
                                });
                                return obs$.pipe((0, operators_1.map)(() => log.push('resolver1')));
                            },
                        },
                        {
                            provide: 'resolver2',
                            useValue: () => {
                                return (0, rxjs_1.of)(null).pipe((0, operators_1.map)(() => {
                                    log.push('resolver2');
                                    observer.next(null);
                                    observer.complete();
                                }));
                            },
                        },
                    ],
                });
            });
            it('works', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'a',
                        resolve: {
                            one: 'resolver1',
                            two: 'resolver2',
                        },
                        component: integration_helpers_1.SimpleCmp,
                    },
                ]);
                router.navigateByUrl('/a');
                yield (0, integration_helpers_1.advance)(fixture);
                expect(log).toEqual(['resolver2', 'resolver1']);
            }));
        });
        it('can resolve symbol keys', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            const symbolKey = Symbol('key');
            router.resetConfig([
                { path: 'simple', component: integration_helpers_1.SimpleCmp, resolve: { [symbolKey]: 'resolveFour' } },
            ]);
            router.navigateByUrl('/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            expect(router.routerState.root.snapshot.firstChild.data[symbolKey]).toEqual(4);
        }));
        it('should allow resolvers as pure functions', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            const user = Symbol('user');
            const userResolver = (route) => route.params['user'];
            router.resetConfig([{ path: ':user', component: integration_helpers_1.SimpleCmp, resolve: { [user]: userResolver } }]);
            router.navigateByUrl('/atscott');
            yield (0, integration_helpers_1.advance)(fixture);
            expect(router.routerState.root.snapshot.firstChild.data[user]).toEqual('atscott');
        }));
        it('should allow DI in resolvers as pure functions', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            const user = Symbol('user');
            let LoginState = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoginState = _classThis = class {
                    constructor() {
                        this.user = 'atscott';
                    }
                };
                __setFunctionName(_classThis, "LoginState");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoginState = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoginState = _classThis;
            })();
            router.resetConfig([
                {
                    path: '**',
                    component: integration_helpers_1.SimpleCmp,
                    resolve: {
                        [user]: () => (0, core_1.inject)(LoginState).user,
                    },
                },
            ]);
            router.navigateByUrl('/');
            yield (0, integration_helpers_1.advance)(fixture);
            expect(router.routerState.root.snapshot.firstChild.data[user]).toEqual('atscott');
        }));
    });
}
