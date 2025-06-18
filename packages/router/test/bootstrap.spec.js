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
const platform_location_1 = require("@angular/common/src/location/platform_location");
const viewport_scroller_1 = require("@angular/common/src/viewport_scroller");
const testing_1 = require("@angular/common/testing");
const core_1 = require("@angular/core");
const testing_2 = require("@angular/core/testing");
const platform_browser_1 = require("@angular/platform-browser");
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const index_1 = require("../index");
describe('bootstrap', () => {
    let log = [];
    let testProviders = null;
    let SimpleCmp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                template: 'simple',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SimpleCmp = _classThis = class {
        };
        __setFunctionName(_classThis, "SimpleCmp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SimpleCmp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SimpleCmp = _classThis;
    })();
    let RootCmp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'test-app',
                template: 'root <router-outlet></router-outlet>',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var RootCmp = _classThis = class {
            constructor() {
                log.push('RootCmp');
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
    let SecondRootCmp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'test-app2',
                template: 'root <router-outlet></router-outlet>',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SecondRootCmp = _classThis = class {
        };
        __setFunctionName(_classThis, "SecondRootCmp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SecondRootCmp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SecondRootCmp = _classThis;
    })();
    let TestResolver = (() => {
        let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var TestResolver = _classThis = class {
            resolve() {
                let resolve;
                const res = new Promise((r) => (resolve = r));
                setTimeout(() => resolve('test-data'), 0);
                return res;
            }
        };
        __setFunctionName(_classThis, "TestResolver");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            TestResolver = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return TestResolver = _classThis;
    })();
    let navigationEndPromise;
    beforeEach(() => {
        (0, core_1.destroyPlatform)();
        const doc = testing_2.TestBed.inject(common_1.DOCUMENT);
        const oldRoots = doc.querySelectorAll('test-app,test-app2');
        for (let i = 0; i < oldRoots.length; i++) {
            (0, common_1.ɵgetDOM)().remove(oldRoots[i]);
        }
        const el1 = (0, common_1.ɵgetDOM)().createElement('test-app', doc);
        const el2 = (0, common_1.ɵgetDOM)().createElement('test-app2', doc);
        doc.body.appendChild(el1);
        doc.body.appendChild(el2);
        const { promise, resolveFn } = createPromise();
        navigationEndPromise = promise;
        log = [];
        testProviders = [
            (0, core_1.provideZonelessChangeDetection)(),
            { provide: common_1.DOCUMENT, useValue: doc },
            { provide: viewport_scroller_1.ViewportScroller, useClass: isNode ? viewport_scroller_1.NullViewportScroller : viewport_scroller_1.ViewportScroller },
            { provide: common_1.PlatformLocation, useClass: testing_1.MockPlatformLocation },
            provideNavigationEndAction(resolveFn),
        ];
    });
    afterEach(core_1.destroyPlatform);
    it('should complete when initial navigation fails and initialNavigation = enabledBlocking', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [platform_browser_1.BrowserModule],
                    declarations: [RootCmp],
                    bootstrap: [RootCmp],
                    providers: [
                        ...testProviders,
                        (0, index_1.provideRouter)([
                            {
                                matcher: () => {
                                    throw new Error('error in matcher');
                                },
                                children: [],
                            },
                        ], (0, index_1.withEnabledBlockingInitialNavigation)()),
                    ],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
                constructor(router) {
                    log.push('TestModule');
                    router.events.subscribe((e) => log.push(e.constructor.name));
                }
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        yield (0, platform_browser_dynamic_1.platformBrowserDynamic)([])
            .bootstrapModule(TestModule)
            .then((res) => {
            const router = res.injector.get(index_1.Router);
            expect(router.navigated).toEqual(false);
            expect(router.getCurrentNavigation()).toBeNull();
            expect(log).toContain('TestModule');
            expect(log).toContain('NavigationError');
        });
    }));
    it('should finish navigation when initial navigation is enabledBlocking and component renavigates on render', () => __awaiter(void 0, void 0, void 0, function* () {
        let Renavigate = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Renavigate = _classThis = class {
                constructor(router) {
                    router.navigateByUrl('/other');
                }
            };
            __setFunctionName(_classThis, "Renavigate");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Renavigate = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Renavigate = _classThis;
        })();
        let BlankCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    template: '',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var BlankCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "BlankCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                BlankCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return BlankCmp = _classThis;
        })();
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [platform_browser_1.BrowserModule, index_1.RouterOutlet],
                    declarations: [RootCmp],
                    bootstrap: [RootCmp],
                    providers: [
                        ...testProviders,
                        (0, index_1.provideRouter)([
                            { path: '', component: Renavigate },
                            { path: 'other', component: BlankCmp },
                        ], (0, index_1.withEnabledBlockingInitialNavigation)()),
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        yield expectAsync(Promise.all([(0, platform_browser_dynamic_1.platformBrowserDynamic)([]).bootstrapModule(TestModule), navigationEndPromise])).toBeResolved();
    }));
    it('should wait for redirect when initialNavigation = enabledBlocking', () => __awaiter(void 0, void 0, void 0, function* () {
        let Redirect = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Redirect = _classThis = class {
                constructor(router) {
                    this.router = router;
                }
                canActivate() {
                    this.router.navigateByUrl('redirectToMe');
                    return false;
                }
            };
            __setFunctionName(_classThis, "Redirect");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Redirect = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Redirect = _classThis;
        })();
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        platform_browser_1.BrowserModule,
                        index_1.RouterModule.forRoot([
                            { path: 'redirectToMe', children: [], resolve: { test: TestResolver } },
                            { path: '**', canActivate: [Redirect], children: [] },
                        ], { initialNavigation: 'enabledBlocking' }),
                    ],
                    declarations: [RootCmp],
                    bootstrap: [RootCmp],
                    providers: [...testProviders],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
                constructor() {
                    log.push('TestModule');
                }
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        const bootstrapPromise = (0, platform_browser_dynamic_1.platformBrowserDynamic)([])
            .bootstrapModule(TestModule)
            .then((ref) => {
            const router = ref.injector.get(index_1.Router);
            expect(router.navigated).toEqual(true);
            expect(router.url).toContain('redirectToMe');
            expect(log).toContain('TestModule');
        });
        yield Promise.all([bootstrapPromise, navigationEndPromise]);
    }));
    it('should wait for redirect with UrlTree when initialNavigation = enabledBlocking', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        platform_browser_1.BrowserModule,
                        index_1.RouterModule.forRoot([
                            { path: 'redirectToMe', children: [] },
                            {
                                path: '**',
                                canActivate: [() => (0, core_1.inject)(index_1.Router).createUrlTree(['redirectToMe'])],
                                children: [],
                            },
                        ], { initialNavigation: 'enabledBlocking' }),
                    ],
                    declarations: [RootCmp],
                    bootstrap: [RootCmp],
                    providers: [...testProviders],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
                constructor() {
                    log.push('TestModule');
                }
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        const bootstrapPromise = (0, platform_browser_dynamic_1.platformBrowserDynamic)([])
            .bootstrapModule(TestModule)
            .then((ref) => {
            const router = ref.injector.get(index_1.Router);
            expect(router.navigated).toEqual(true);
            expect(router.url).toContain('redirectToMe');
            expect(log).toContain('TestModule');
        });
        yield Promise.all([bootstrapPromise, navigationEndPromise]);
    }));
    it('should wait for resolvers to complete when initialNavigation = enabledBlocking', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestCmpEnabled = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: 'test',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmpEnabled = _classThis = class {
            };
            __setFunctionName(_classThis, "TestCmpEnabled");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmpEnabled = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmpEnabled = _classThis;
        })();
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        platform_browser_1.BrowserModule,
                        index_1.RouterModule.forRoot([{ path: '**', component: TestCmpEnabled, resolve: { test: TestResolver } }], { initialNavigation: 'enabledBlocking' }),
                    ],
                    declarations: [RootCmp, TestCmpEnabled],
                    bootstrap: [RootCmp],
                    providers: [...testProviders, TestResolver],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
                constructor(router) { }
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        const bootstrapPromise = (0, platform_browser_dynamic_1.platformBrowserDynamic)([])
            .bootstrapModule(TestModule)
            .then((ref) => {
            const router = ref.injector.get(index_1.Router);
            const data = router.routerState.snapshot.root.firstChild.data;
            expect(data['test']).toEqual('test-data');
            // Also ensure that the navigation completed. The navigation transition clears the
            // current navigation in its `finalize` operator.
            expect(router.getCurrentNavigation()).toBeNull();
        });
        yield Promise.all([bootstrapPromise, navigationEndPromise]);
    }));
    it('should NOT wait for resolvers to complete when initialNavigation = enabledNonBlocking', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestCmpLegacyEnabled = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: 'test',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmpLegacyEnabled = _classThis = class {
            };
            __setFunctionName(_classThis, "TestCmpLegacyEnabled");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmpLegacyEnabled = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmpLegacyEnabled = _classThis;
        })();
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        platform_browser_1.BrowserModule,
                        index_1.RouterModule.forRoot([{ path: '**', component: TestCmpLegacyEnabled, resolve: { test: TestResolver } }], { initialNavigation: 'enabledNonBlocking' }),
                    ],
                    declarations: [RootCmp, TestCmpLegacyEnabled],
                    bootstrap: [RootCmp],
                    providers: [...testProviders, TestResolver],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
                constructor(router) {
                    log.push('TestModule');
                    router.events.subscribe((e) => log.push(e.constructor.name));
                }
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        const bootstrapPromise = (0, platform_browser_dynamic_1.platformBrowserDynamic)([])
            .bootstrapModule(TestModule)
            .then((ref) => {
            const router = ref.injector.get(index_1.Router);
            expect(router.routerState.snapshot.root.firstChild).toBeNull();
            // ResolveEnd has not been emitted yet because bootstrap returned too early
            expect(log).toEqual([
                'TestModule',
                'RootCmp',
                'NavigationStart',
                'RoutesRecognized',
                'GuardsCheckStart',
                'ChildActivationStart',
                'ActivationStart',
                'GuardsCheckEnd',
                'ResolveStart',
            ]);
        });
        yield Promise.all([bootstrapPromise, navigationEndPromise]);
    }));
    it('should NOT wait for resolvers to complete when initialNavigation is not set', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestCmpLegacyEnabled = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: 'test',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmpLegacyEnabled = _classThis = class {
            };
            __setFunctionName(_classThis, "TestCmpLegacyEnabled");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmpLegacyEnabled = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmpLegacyEnabled = _classThis;
        })();
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        platform_browser_1.BrowserModule,
                        index_1.RouterModule.forRoot([
                            { path: '**', component: TestCmpLegacyEnabled, resolve: { test: TestResolver } },
                        ]),
                    ],
                    declarations: [RootCmp, TestCmpLegacyEnabled],
                    bootstrap: [RootCmp],
                    providers: [...testProviders, TestResolver],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
                constructor(router) {
                    log.push('TestModule');
                    router.events.subscribe((e) => log.push(e.constructor.name));
                }
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        const bootstrapPromise = (0, platform_browser_dynamic_1.platformBrowserDynamic)([])
            .bootstrapModule(TestModule)
            .then((ref) => {
            const router = ref.injector.get(index_1.Router);
            expect(router.routerState.snapshot.root.firstChild).toBeNull();
            // ResolveEnd has not been emitted yet because bootstrap returned too early
            expect(log).toEqual([
                'TestModule',
                'RootCmp',
                'NavigationStart',
                'RoutesRecognized',
                'GuardsCheckStart',
                'ChildActivationStart',
                'ActivationStart',
                'GuardsCheckEnd',
                'ResolveStart',
            ]);
        });
        yield Promise.all([bootstrapPromise, navigationEndPromise]);
    }));
    it('should not run navigation when initialNavigation = disabled', (done) => {
        let TestCmpDiabled = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test',
                    template: 'test',
                    standalone: false,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestCmpDiabled = _classThis = class {
            };
            __setFunctionName(_classThis, "TestCmpDiabled");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestCmpDiabled = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestCmpDiabled = _classThis;
        })();
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        platform_browser_1.BrowserModule,
                        index_1.RouterModule.forRoot([{ path: '**', component: TestCmpDiabled, resolve: { test: TestResolver } }], { initialNavigation: 'disabled' }),
                    ],
                    declarations: [RootCmp, TestCmpDiabled],
                    bootstrap: [RootCmp],
                    providers: [...testProviders, TestResolver],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
                constructor(router) {
                    log.push('TestModule');
                    router.events.subscribe((e) => log.push(e.constructor.name));
                }
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        (0, platform_browser_dynamic_1.platformBrowserDynamic)([])
            .bootstrapModule(TestModule)
            .then((res) => {
            const router = res.injector.get(index_1.Router);
            expect(log).toEqual(['TestModule', 'RootCmp']);
            done();
        });
    });
    it('should not init router navigation listeners if a non root component is bootstrapped', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [platform_browser_1.BrowserModule, index_1.RouterModule.forRoot([])],
                    declarations: [SecondRootCmp, RootCmp],
                    bootstrap: [RootCmp],
                    providers: testProviders,
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        yield (0, platform_browser_dynamic_1.platformBrowserDynamic)([])
            .bootstrapModule(TestModule)
            .then((res) => {
            const router = res.injector.get(index_1.Router);
            spyOn(router, 'resetRootComponentType').and.callThrough();
            const appRef = res.injector.get(core_1.ApplicationRef);
            appRef.bootstrap(SecondRootCmp);
            expect(router.resetRootComponentType).not.toHaveBeenCalled();
        });
    }));
    it('should reinit router navigation listeners if a previously bootstrapped root component is destroyed', () => __awaiter(void 0, void 0, void 0, function* () {
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [platform_browser_1.BrowserModule, index_1.RouterModule.forRoot([])],
                    declarations: [SecondRootCmp, RootCmp],
                    bootstrap: [RootCmp],
                    providers: testProviders,
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        yield (0, platform_browser_dynamic_1.platformBrowserDynamic)([])
            .bootstrapModule(TestModule)
            .then((res) => {
            const router = res.injector.get(index_1.Router);
            spyOn(router, 'resetRootComponentType').and.callThrough();
            const appRef = res.injector.get(core_1.ApplicationRef);
            const { promise, resolveFn } = createPromise();
            appRef.components[0].onDestroy(() => {
                appRef.bootstrap(SecondRootCmp);
                expect(router.resetRootComponentType).toHaveBeenCalled();
                resolveFn();
            });
            appRef.components[0].destroy();
            return promise;
        });
    }));
    if (!isNode) {
        it('should restore the scrolling position', () => __awaiter(void 0, void 0, void 0, function* () {
            let TallComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'component-a',
                        template: `
           <div style="height: 3000px;"></div>
           <div id="marker1"></div>
           <div style="height: 3000px;"></div>
           <div id="marker2"></div>
           <div style="height: 3000px;"></div>
           <a name="marker3"></a>
           <div style="height: 3000px;"></div>
      `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TallComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "TallComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TallComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TallComponent = _classThis;
            })();
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [
                            platform_browser_1.BrowserModule,
                            index_1.RouterModule.forRoot([
                                { path: '', pathMatch: 'full', redirectTo: '/aa' },
                                { path: 'aa', component: TallComponent },
                                { path: 'bb', component: TallComponent },
                                { path: 'cc', component: TallComponent },
                                { path: 'fail', component: TallComponent, canActivate: [() => false] },
                            ], {
                                scrollPositionRestoration: 'enabled',
                                anchorScrolling: 'enabled',
                                scrollOffset: [0, 100],
                                onSameUrlNavigation: 'ignore',
                            }),
                        ],
                        declarations: [TallComponent, RootCmp],
                        bootstrap: [RootCmp],
                        providers: [...testProviders],
                        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestModule = _classThis = class {
                };
                __setFunctionName(_classThis, "TestModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestModule = _classThis;
            })();
            function resolveAfter(milliseconds) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, milliseconds);
                });
            }
            const res = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)([]).bootstrapModule(TestModule);
            const router = res.injector.get(index_1.Router);
            yield router.navigateByUrl('/aa');
            window.scrollTo(0, 5000);
            yield router.navigateByUrl('/fail');
            expect(window.pageYOffset).toEqual(5000);
            yield router.navigateByUrl('/bb');
            window.scrollTo(0, 3000);
            expect(window.pageYOffset).toEqual(3000);
            yield router.navigateByUrl('/cc');
            yield resolveAfter(100);
            expect(window.pageYOffset).toEqual(0);
            yield router.navigateByUrl('/aa#marker2');
            yield resolveAfter(100);
            expect(window.scrollY).toBeGreaterThanOrEqual(5900);
            expect(window.scrollY).toBeLessThan(6000); // offset
            // Scroll somewhere else, then navigate to the hash again. Even though the same url navigation
            // is ignored by the Router, we should still scroll.
            window.scrollTo(0, 3000);
            yield router.navigateByUrl('/aa#marker2');
            yield resolveAfter(100);
            expect(window.scrollY).toBeGreaterThanOrEqual(5900);
            expect(window.scrollY).toBeLessThan(6000); // offset
        }));
        it('should cleanup "popstate" and "hashchange" listeners', () => __awaiter(void 0, void 0, void 0, function* () {
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [platform_browser_1.BrowserModule, index_1.RouterModule.forRoot([])],
                        declarations: [RootCmp],
                        bootstrap: [RootCmp],
                        providers: [
                            ...testProviders,
                            { provide: common_1.PlatformLocation, useClass: platform_location_1.BrowserPlatformLocation },
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var TestModule = _classThis = class {
                };
                __setFunctionName(_classThis, "TestModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    TestModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return TestModule = _classThis;
            })();
            spyOn(window, 'addEventListener').and.callThrough();
            spyOn(window, 'removeEventListener').and.callThrough();
            const ngModuleRef = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)().bootstrapModule(TestModule);
            ngModuleRef.destroy();
            expect(window.addEventListener).toHaveBeenCalledTimes(2);
            expect(window.addEventListener).toHaveBeenCalledWith('popstate', jasmine.any(Function), jasmine.any(Boolean));
            expect(window.addEventListener).toHaveBeenCalledWith('hashchange', jasmine.any(Function), jasmine.any(Boolean));
            expect(window.removeEventListener).toHaveBeenCalledWith('popstate', jasmine.any(Function));
            expect(window.removeEventListener).toHaveBeenCalledWith('hashchange', jasmine.any(Function));
        }));
    }
    it('can schedule a navigation from the NavigationEnd event #37460', (done) => {
        let TestModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        platform_browser_1.BrowserModule,
                        index_1.RouterModule.forRoot([
                            { path: 'a', component: SimpleCmp },
                            { path: 'b', component: SimpleCmp },
                        ]),
                    ],
                    declarations: [RootCmp, SimpleCmp],
                    bootstrap: [RootCmp],
                    providers: [...testProviders],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var TestModule = _classThis = class {
            };
            __setFunctionName(_classThis, "TestModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                TestModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return TestModule = _classThis;
        })();
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, platform_browser_dynamic_1.platformBrowserDynamic)([]).bootstrapModule(TestModule);
            const router = res.injector.get(index_1.Router);
            router.events.subscribe((e) => __awaiter(void 0, void 0, void 0, function* () {
                if (e instanceof index_1.NavigationEnd && e.url === '/b') {
                    yield router.navigate(['a']);
                    done();
                }
            }));
            yield router.navigateByUrl('/b');
        }))();
    });
});
function onNavigationEnd(router, fn) {
    router.events.subscribe((e) => {
        if (e instanceof index_1.NavigationEnd) {
            fn();
        }
    });
}
function provideNavigationEndAction(fn) {
    return {
        provide: core_1.ENVIRONMENT_INITIALIZER,
        multi: true,
        useValue: () => {
            onNavigationEnd((0, core_1.inject)(index_1.Router), fn);
        },
    };
}
function createPromise() {
    let resolveFn;
    const promise = new Promise((r) => {
        resolveFn = r;
    });
    return { resolveFn: () => resolveFn(), promise };
}
