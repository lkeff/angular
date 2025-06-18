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
const testing_1 = require("@angular/common/testing");
const core_1 = require("@angular/core");
const testing_2 = require("@angular/core/testing");
const index_1 = require("../index");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const provide_router_1 = require("../src/provide_router");
const config_1 = require("../src/utils/config");
const helpers_1 = require("./helpers");
describe('RouterPreloader', () => {
    let LazyLoadedCmp = (() => {
        let _classDecorators = [(0, core_1.Component)({
                template: '',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var LazyLoadedCmp = _classThis = class {
        };
        __setFunctionName(_classThis, "LazyLoadedCmp");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            LazyLoadedCmp = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return LazyLoadedCmp = _classThis;
    })();
    describe('should properly handle', () => {
        beforeEach(() => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, testing_1.provideLocationMocks)(),
                    (0, provide_router_1.provideRouter)([{ path: 'lazy', loadChildren: jasmine.createSpy('expected'), canLoad: [() => true] }], (0, index_1.withPreloading)(index_1.PreloadAllModules)),
                ],
            });
        });
        it('being destroyed before expected', () => {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            // Calling the RouterPreloader's ngOnDestroy method is done to simulate what would happen if
            // the containing NgModule is destroyed.
            expect(() => preloader.ngOnDestroy()).not.toThrow();
        });
    });
    describe('configurations with canLoad guard', () => {
        let LoadedModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [LazyLoadedCmp],
                    providers: [
                        {
                            provide: index_1.ROUTES,
                            multi: true,
                            useValue: [{ path: 'LoadedModule1', component: LazyLoadedCmp }],
                        },
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
        beforeEach(() => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, testing_1.provideLocationMocks)(),
                    (0, provide_router_1.provideRouter)([{ path: 'lazy', loadChildren: () => LoadedModule, canLoad: [() => true] }], (0, index_1.withPreloading)(index_1.PreloadAllModules)),
                ],
            });
        });
        it('should not load children', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)();
            const c = router.config;
            expect(c[0]._loadedRoutes).not.toBeDefined();
        }));
        it('should not call the preloading method because children will not be loaded anyways', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const preloadingStrategy = testing_2.TestBed.inject(index_1.PreloadingStrategy);
            spyOn(preloadingStrategy, 'preload').and.callThrough();
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)();
            expect(preloadingStrategy.preload).not.toHaveBeenCalled();
        }));
    });
    describe('should preload configurations', () => {
        let lazySpy;
        beforeEach(() => {
            lazySpy = jasmine.createSpy('expected');
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, testing_1.provideLocationMocks)(),
                    (0, provide_router_1.provideRouter)([{ path: 'lazy', loadChildren: lazySpy }], (0, index_1.withPreloading)(index_1.PreloadAllModules)),
                ],
            });
        });
        it('should work', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            const testModule = testing_2.TestBed.inject(core_1.NgModuleRef);
            const events = [];
            let LoadedModule2 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyLoadedCmp],
                        imports: [index_1.RouterModule.forChild([{ path: 'LoadedModule2', component: LazyLoadedCmp }])],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedModule2 = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedModule2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedModule2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedModule2 = _classThis;
            })();
            let LoadedModule1 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [
                            index_1.RouterModule.forChild([{ path: 'LoadedModule1', loadChildren: () => LoadedModule2 }]),
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedModule1 = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedModule1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedModule1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedModule1 = _classThis;
            })();
            router.events.subscribe((e) => {
                if (e instanceof index_1.RouteConfigLoadEnd || e instanceof index_1.RouteConfigLoadStart) {
                    events.push(e);
                }
            });
            lazySpy.and.returnValue(LoadedModule1);
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)();
            const c = router.config;
            const injector = (0, config_1.getLoadedInjector)(c[0]);
            const loadedRoutes = (0, config_1.getLoadedRoutes)(c[0]);
            expect(loadedRoutes[0].path).toEqual('LoadedModule1');
            expect(injector.parent).toBe(testModule._r3Injector);
            const injector2 = (0, config_1.getLoadedInjector)(loadedRoutes[0]);
            const loadedRoutes2 = (0, config_1.getLoadedRoutes)(loadedRoutes[0]);
            expect(loadedRoutes2[0].path).toEqual('LoadedModule2');
            expect(injector2.parent).toBe(injector);
            expect(events.map((e) => e.toString())).toEqual([
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadEnd(path: lazy)',
                'RouteConfigLoadStart(path: LoadedModule1)',
                'RouteConfigLoadEnd(path: LoadedModule1)',
            ]);
        }));
    });
    it('should handle providers on a route', () => __awaiter(void 0, void 0, void 0, function* () {
        const TOKEN = new core_1.InjectionToken('test token');
        const CHILD_TOKEN = new core_1.InjectionToken('test token for child');
        let Child = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [index_1.RouterModule.forChild([{ path: 'child', redirectTo: '' }])],
                    providers: [{ provide: CHILD_TOKEN, useValue: 'child' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Child = _classThis = class {
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
        testing_2.TestBed.configureTestingModule({
            providers: [
                (0, testing_1.provideLocationMocks)(),
                (0, provide_router_1.provideRouter)([
                    {
                        path: 'parent',
                        providers: [{ provide: TOKEN, useValue: 'parent' }],
                        loadChildren: () => Child,
                    },
                ], (0, index_1.withPreloading)(index_1.PreloadAllModules)),
            ],
        });
        testing_2.TestBed.inject(index_1.RouterPreloader)
            .preload()
            .subscribe(() => { });
        yield (0, helpers_1.timeout)();
        const parentConfig = testing_2.TestBed.inject(index_1.Router).config[0];
        // preloading needs to create the injector
        const providersInjector = (0, config_1.getProvidersInjector)(parentConfig);
        expect(providersInjector).toBeDefined();
        // Throws error because there is no provider for CHILD_TOKEN here
        expect(() => providersInjector === null || providersInjector === void 0 ? void 0 : providersInjector.get(CHILD_TOKEN)).toThrow();
        const loadedInjector = (0, config_1.getLoadedInjector)(parentConfig);
        // // The loaded injector should be a child of the one created from providers
        expect(loadedInjector.get(TOKEN)).toEqual('parent');
        expect(loadedInjector.get(CHILD_TOKEN)).toEqual('child');
    }));
    describe('should support modules that have already been loaded', () => {
        let lazySpy;
        beforeEach(() => {
            lazySpy = jasmine.createSpy('expected');
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, testing_1.provideLocationMocks)(),
                    (0, provide_router_1.provideRouter)([{ path: 'lazy', loadChildren: lazySpy }], (0, index_1.withPreloading)(index_1.PreloadAllModules)),
                ],
            });
        });
        it('should work', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            const testModule = testing_2.TestBed.inject(core_1.NgModuleRef);
            const compiler = testing_2.TestBed.inject(core_1.Compiler);
            let LoadedModule2 = (() => {
                let _classDecorators = [(0, core_1.NgModule)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedModule2 = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedModule2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedModule2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedModule2 = _classThis;
            })();
            const module2 = compiler.compileModuleSync(LoadedModule2).create(null);
            let LoadedModule1 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        imports: [
                            index_1.RouterModule.forChild([
                                {
                                    path: 'LoadedModule2',
                                    loadChildren: jasmine.createSpy('no'),
                                    _loadedRoutes: [{ path: 'LoadedModule3', loadChildren: () => LoadedModule3 }],
                                    _loadedInjector: module2.injector,
                                },
                            ]),
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedModule1 = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedModule1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedModule1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedModule1 = _classThis;
            })();
            let LoadedModule3 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [index_1.RouterModule.forChild([])] })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedModule3 = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedModule3");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedModule3 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedModule3 = _classThis;
            })();
            lazySpy.and.returnValue(LoadedModule1);
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)();
            const c = router.config;
            const injector = (0, config_1.getLoadedInjector)(c[0]);
            const loadedRoutes = (0, config_1.getLoadedRoutes)(c[0]);
            expect(injector.parent).toBe(testModule._r3Injector);
            const loadedRoutes2 = (0, config_1.getLoadedRoutes)(loadedRoutes[0]);
            const injector3 = (0, config_1.getLoadedInjector)(loadedRoutes2[0]);
            expect(injector3.parent).toBe(module2.injector);
        }));
    });
    describe('should support preloading strategies', () => {
        let delayLoadUnPaused;
        let delayLoadObserver$;
        let events;
        const subLoadChildrenSpy = jasmine.createSpy('submodule');
        const lazyLoadChildrenSpy = jasmine.createSpy('lazymodule');
        const mockPreloaderFactory = () => {
            class DelayedPreLoad {
                preload(route, fn) {
                    const routeName = route.loadChildren
                        ? route.loadChildren.and.identity
                        : 'noChildren';
                    return delayLoadObserver$.pipe((0, operators_1.filter)((unpauseList) => unpauseList.indexOf(routeName) !== -1), (0, operators_1.take)(1), (0, operators_1.switchMap)(() => {
                        return fn().pipe((0, operators_1.catchError)(() => (0, rxjs_1.of)(null)));
                    }));
                }
            }
            return new DelayedPreLoad();
        };
        let SharedModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [LazyLoadedCmp],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SharedModule = _classThis = class {
            };
            __setFunctionName(_classThis, "SharedModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SharedModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SharedModule = _classThis;
        })();
        let LoadedModule1 = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        SharedModule,
                        index_1.RouterModule.forChild([
                            { path: 'LoadedModule1', component: LazyLoadedCmp },
                            { path: 'sub', loadChildren: subLoadChildrenSpy },
                        ]),
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var LoadedModule1 = _classThis = class {
            };
            __setFunctionName(_classThis, "LoadedModule1");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                LoadedModule1 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return LoadedModule1 = _classThis;
        })();
        let LoadedModule2 = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [
                        SharedModule,
                        index_1.RouterModule.forChild([{ path: 'LoadedModule2', component: LazyLoadedCmp }]),
                    ],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var LoadedModule2 = _classThis = class {
            };
            __setFunctionName(_classThis, "LoadedModule2");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                LoadedModule2 = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return LoadedModule2 = _classThis;
        })();
        beforeEach(() => {
            delayLoadUnPaused = new rxjs_1.BehaviorSubject([]);
            delayLoadObserver$ = delayLoadUnPaused.asObservable();
            subLoadChildrenSpy.calls.reset();
            lazyLoadChildrenSpy.calls.reset();
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, testing_1.provideLocationMocks)(),
                    (0, provide_router_1.provideRouter)([{ path: 'lazy', loadChildren: lazyLoadChildrenSpy }]),
                    { provide: index_1.PreloadingStrategy, useFactory: mockPreloaderFactory },
                ],
            });
            events = [];
        });
        it('without reloading loaded modules', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            router.events.subscribe((e) => {
                if (e instanceof index_1.RouteConfigLoadEnd || e instanceof index_1.RouteConfigLoadStart) {
                    events.push(e);
                }
            });
            lazyLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(LoadedModule1));
            // App start activation of preloader
            preloader.preload().subscribe((x) => { });
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(0);
            // Initial navigation cause route load
            router.navigateByUrl('/lazy/LoadedModule1');
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(1);
            // Secondary load or navigation should use same loaded object (
            //   ie this is a noop as the module should already be loaded)
            delayLoadUnPaused.next(['lazymodule']);
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(1);
            expect(subLoadChildrenSpy).toHaveBeenCalledTimes(0);
            expect(events.map((e) => e.toString())).toEqual([
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadEnd(path: lazy)',
            ]);
        }));
        it('and cope with the loader throwing exceptions during module load but allow retry', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            router.events.subscribe((e) => {
                if (e instanceof index_1.RouteConfigLoadEnd || e instanceof index_1.RouteConfigLoadStart) {
                    events.push(e);
                }
            });
            lazyLoadChildrenSpy.and.returnValue((0, rxjs_1.throwError)('Error: Fake module load error (expectedreload)'));
            preloader.preload().subscribe((x) => { });
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(0);
            delayLoadUnPaused.next(['lazymodule']);
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(1);
            lazyLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(LoadedModule1));
            router.navigateByUrl('/lazy/LoadedModule1').catch(() => {
                fail('navigation should not throw');
            });
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(2);
            expect(subLoadChildrenSpy).toHaveBeenCalledTimes(0);
            expect(events.map((e) => e.toString())).toEqual([
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadEnd(path: lazy)',
            ]);
        }));
        it('and cope with the loader throwing exceptions but allow retry', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            router.events.subscribe((e) => {
                if (e instanceof index_1.RouteConfigLoadEnd || e instanceof index_1.RouteConfigLoadStart) {
                    events.push(e);
                }
            });
            lazyLoadChildrenSpy.and.returnValue((0, rxjs_1.throwError)('Error: Fake module load error (expectedreload)'));
            preloader.preload().subscribe((x) => { });
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(0);
            router.navigateByUrl('/lazy/LoadedModule1').catch((reason) => {
                expect(reason).toEqual('Error: Fake module load error (expectedreload)');
            });
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(1);
            lazyLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(LoadedModule1));
            router.navigateByUrl('/lazy/LoadedModule1').catch(() => {
                fail('navigation should not throw');
            });
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(2);
            expect(subLoadChildrenSpy).toHaveBeenCalledTimes(0);
            expect(events.map((e) => e.toString())).toEqual([
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadEnd(path: lazy)',
            ]);
        }));
        it('without autoloading loading submodules', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            router.events.subscribe((e) => {
                if (e instanceof index_1.RouteConfigLoadEnd || e instanceof index_1.RouteConfigLoadStart) {
                    events.push(e);
                }
            });
            lazyLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(LoadedModule1));
            subLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(LoadedModule2));
            preloader.preload().subscribe((x) => { });
            yield (0, helpers_1.timeout)();
            router.navigateByUrl('/lazy/LoadedModule1');
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(1);
            expect(subLoadChildrenSpy).toHaveBeenCalledTimes(0);
            expect(events.map((e) => e.toString())).toEqual([
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadEnd(path: lazy)',
            ]);
            // Release submodule to check it does in fact load
            delayLoadUnPaused.next(['lazymodule', 'submodule']);
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(1);
            expect(subLoadChildrenSpy).toHaveBeenCalledTimes(1);
            expect(events.map((e) => e.toString())).toEqual([
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadEnd(path: lazy)',
                'RouteConfigLoadStart(path: sub)',
                'RouteConfigLoadEnd(path: sub)',
            ]);
        }));
        it('and close the preload obsservable ', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            router.events.subscribe((e) => {
                if (e instanceof index_1.RouteConfigLoadEnd || e instanceof index_1.RouteConfigLoadStart) {
                    events.push(e);
                }
            });
            lazyLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(LoadedModule1));
            subLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(LoadedModule2));
            const preloadSubscription = preloader.preload().subscribe((x) => { });
            router.navigateByUrl('/lazy/LoadedModule1');
            yield (0, helpers_1.timeout)();
            delayLoadUnPaused.next(['lazymodule', 'submodule']);
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(1);
            expect(subLoadChildrenSpy).toHaveBeenCalledTimes(1);
            expect(preloadSubscription.closed).toBeTruthy();
        }));
        it('with overlapping loads from navigation and the preloader', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            router.events.subscribe((e) => {
                if (e instanceof index_1.RouteConfigLoadEnd || e instanceof index_1.RouteConfigLoadStart) {
                    events.push(e);
                }
            });
            lazyLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(LoadedModule1));
            subLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(LoadedModule2).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 5)).then(() => v))));
            preloader.preload().subscribe((x) => { });
            yield (0, helpers_1.timeout)();
            // Load the out modules at start of test and ensure it and only
            // it is loaded
            delayLoadUnPaused.next(['lazymodule']);
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(1);
            expect(events.map((e) => e.toString())).toEqual([
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadEnd(path: lazy)',
            ]);
            // Cause the load from router to start (has 5 tick delay)
            router.navigateByUrl('/lazy/sub/LoadedModule2');
            yield (0, helpers_1.timeout)(); // T1
            // Cause the load from preloader to start
            delayLoadUnPaused.next(['lazymodule', 'submodule']);
            yield (0, helpers_1.timeout)(); // T2
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(1);
            expect(subLoadChildrenSpy).toHaveBeenCalledTimes(1);
            yield (0, helpers_1.timeout)(5); // T2 to T7 enough time for mutiple loads to finish
            expect(subLoadChildrenSpy).toHaveBeenCalledTimes(1);
            expect(events.map((e) => e.toString())).toEqual([
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadEnd(path: lazy)',
                'RouteConfigLoadStart(path: sub)',
                'RouteConfigLoadEnd(path: sub)',
            ]);
        }));
        it('cope with factory fail from broken modules', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            router.events.subscribe((e) => {
                if (e instanceof index_1.RouteConfigLoadEnd || e instanceof index_1.RouteConfigLoadStart) {
                    events.push(e);
                }
            });
            class BrokenModuleFactory extends core_1.NgModuleFactory {
                constructor() {
                    super();
                    this.moduleType = LoadedModule1;
                }
                create(_parentInjector) {
                    throw 'Error: Broken module';
                }
            }
            lazyLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(new BrokenModuleFactory()));
            preloader.preload().subscribe((x) => { });
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(0);
            router.navigateByUrl('/lazy/LoadedModule1').catch((reason) => {
                expect(reason).toEqual('Error: Broken module');
            });
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(1);
            lazyLoadChildrenSpy.and.returnValue((0, rxjs_1.of)(LoadedModule1));
            router.navigateByUrl('/lazy/LoadedModule1').catch(() => {
                fail('navigation should not throw');
            });
            yield (0, helpers_1.timeout)();
            expect(lazyLoadChildrenSpy).toHaveBeenCalledTimes(2);
            expect(subLoadChildrenSpy).toHaveBeenCalledTimes(0);
            expect(events.map((e) => e.toString())).toEqual([
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadEnd(path: lazy)',
                'RouteConfigLoadStart(path: lazy)',
                'RouteConfigLoadEnd(path: lazy)',
            ]);
        }));
    });
    describe('should ignore errors', () => {
        let LoadedModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [LazyLoadedCmp],
                    imports: [index_1.RouterModule.forChild([{ path: 'LoadedModule1', component: LazyLoadedCmp }])],
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
        beforeEach(() => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    {
                        provide: index_1.ROUTES,
                        multi: true,
                        useValue: [
                            { path: 'lazy1', loadChildren: jasmine.createSpy('expected1') },
                            { path: 'lazy2', loadChildren: () => LoadedModule },
                        ],
                    },
                    { provide: index_1.PreloadingStrategy, useExisting: index_1.PreloadAllModules },
                ],
            });
        });
        it('should work', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)();
            const c = router.config;
            expect((0, config_1.getLoadedRoutes)(c[0])).not.toBeDefined();
            expect((0, config_1.getLoadedRoutes)(c[1])).toBeDefined();
        }));
    });
    describe('should copy loaded configs', () => {
        const configs = [{ path: 'LoadedModule1', component: LazyLoadedCmp }];
        let LoadedModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [LazyLoadedCmp],
                    providers: [{ provide: index_1.ROUTES, multi: true, useValue: configs }],
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
        beforeEach(() => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, testing_1.provideLocationMocks)(),
                    (0, provide_router_1.provideRouter)([{ path: 'lazy1', loadChildren: () => LoadedModule }], (0, index_1.withPreloading)(index_1.PreloadAllModules)),
                ],
            });
        });
        it('should work', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            const router = testing_2.TestBed.inject(index_1.Router);
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)();
            const c = router.config;
            expect((0, config_1.getLoadedRoutes)(c[0])).toBeDefined();
            expect((0, config_1.getLoadedRoutes)(c[0])).not.toBe(configs);
            expect((0, config_1.getLoadedRoutes)(c[0])[0]).not.toBe(configs[0]);
            expect((0, config_1.getLoadedRoutes)(c[0])[0].component).toBe(configs[0].component);
        }));
    });
    describe("should work with lazy loaded modules that don't provide RouterModule.forChild()", () => {
        let LoadedModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    declarations: [LazyLoadedCmp],
                    providers: [
                        {
                            provide: index_1.ROUTES,
                            multi: true,
                            useValue: [{ path: 'LoadedModule1', component: LazyLoadedCmp }],
                        },
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
        let EmptyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({})];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var EmptyModule = _classThis = class {
            };
            __setFunctionName(_classThis, "EmptyModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                EmptyModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return EmptyModule = _classThis;
        })();
        beforeEach(() => {
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, testing_1.provideLocationMocks)(),
                    (0, provide_router_1.provideRouter)([{ path: 'lazyEmptyModule', loadChildren: () => EmptyModule }], (0, index_1.withPreloading)(index_1.PreloadAllModules)),
                ],
            });
        });
        it('should work', () => __awaiter(void 0, void 0, void 0, function* () {
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            preloader.preload().subscribe();
        }));
    });
    describe('should preload loadComponent configs', () => {
        let lazyComponentSpy;
        beforeEach(() => {
            lazyComponentSpy = jasmine.createSpy('expected');
            testing_2.TestBed.configureTestingModule({
                providers: [
                    (0, testing_1.provideLocationMocks)(),
                    (0, provide_router_1.provideRouter)([{ path: 'lazy', loadComponent: lazyComponentSpy }], (0, index_1.withPreloading)(index_1.PreloadAllModules)),
                ],
            });
        });
        it('base case', () => __awaiter(void 0, void 0, void 0, function* () {
            let LoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedComponent = _classThis;
            })();
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            lazyComponentSpy.and.returnValue(LoadedComponent);
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)();
            const component = (0, config_1.getLoadedComponent)(testing_2.TestBed.inject(index_1.Router).config[0]);
            expect(component).toEqual(LoadedComponent);
        }));
        it('throws error when loadComponent is not standalone', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            let LoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '', standalone: false })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedComponent = _classThis;
            })();
            let ErrorTrackingPreloadAllModules = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ErrorTrackingPreloadAllModules = _classThis = class {
                    constructor() {
                        this.errors = [];
                    }
                    preload(route, fn) {
                        return fn().pipe((0, operators_1.catchError)((e) => {
                            this.errors.push(e);
                            return (0, rxjs_1.of)(null);
                        }));
                    }
                };
                __setFunctionName(_classThis, "ErrorTrackingPreloadAllModules");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ErrorTrackingPreloadAllModules = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ErrorTrackingPreloadAllModules = _classThis;
            })();
            testing_2.TestBed.overrideProvider(index_1.PreloadingStrategy, {
                useFactory: () => new ErrorTrackingPreloadAllModules(),
            });
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            lazyComponentSpy.and.returnValue(LoadedComponent);
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)();
            const strategy = testing_2.TestBed.inject(index_1.PreloadingStrategy);
            expect((_a = strategy.errors[0]) === null || _a === void 0 ? void 0 : _a.message).toMatch(/.*lazy.*must be standalone/);
        }));
        it('should recover from errors', () => __awaiter(void 0, void 0, void 0, function* () {
            let LoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedComponent = _classThis;
            })();
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            lazyComponentSpy.and.returnValue((0, rxjs_1.throwError)('error loading chunk'));
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)();
            const router = testing_2.TestBed.inject(index_1.Router);
            const c = router.config;
            expect(lazyComponentSpy.calls.count()).toBe(1);
            expect((0, config_1.getLoadedComponent)(c[0])).not.toBeDefined();
            lazyComponentSpy.and.returnValue(LoadedComponent);
            router.navigateByUrl('/lazy');
            yield (0, helpers_1.timeout)();
            expect(lazyComponentSpy.calls.count()).toBe(2);
            expect((0, config_1.getLoadedComponent)(c[0])).toBeDefined();
        }));
        it('works when there is both loadComponent and loadChildren', () => __awaiter(void 0, void 0, void 0, function* () {
            let LoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedComponent = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [
                            (0, testing_1.provideLocationMocks)(),
                            (0, provide_router_1.provideRouter)([{ path: 'child', component: LoadedComponent }]),
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
            const router = testing_2.TestBed.inject(index_1.Router);
            router.config[0].loadChildren = () => LoadedModule;
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            lazyComponentSpy.and.returnValue(LoadedComponent);
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)();
            const component = (0, config_1.getLoadedComponent)(router.config[0]);
            expect(component).toEqual(LoadedComponent);
            const childRoutes = (0, config_1.getLoadedRoutes)(router.config[0]);
            expect(childRoutes).toBeDefined();
            expect(childRoutes[0].path).toEqual('child');
        }));
        it('loadComponent does not block loadChildren', () => __awaiter(void 0, void 0, void 0, function* () {
            let LoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedComponent = _classThis;
            })();
            lazyComponentSpy.and.returnValue((0, rxjs_1.of)(LoadedComponent).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 10)).then(() => v))));
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        providers: [
                            (0, testing_1.provideLocationMocks)(),
                            (0, provide_router_1.provideRouter)([
                                {
                                    path: 'child',
                                    loadChildren: () => (0, rxjs_1.of)([{ path: 'grandchild', children: [] }]).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 1)).then(() => v))),
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
            const router = testing_2.TestBed.inject(index_1.Router);
            const baseRoute = router.config[0];
            baseRoute.loadChildren = () => (0, rxjs_1.of)(LoadedModule).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 1)).then(() => v)));
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            preloader.preload().subscribe(() => { });
            yield (0, helpers_1.timeout)(1);
            // Loading should have started but not completed yet
            expect((0, config_1.getLoadedComponent)(baseRoute)).not.toBeDefined();
            const childRoutes = (0, config_1.getLoadedRoutes)(baseRoute);
            expect(childRoutes).toBeDefined();
            // Loading should have started but not completed yet
            expect((0, config_1.getLoadedRoutes)(childRoutes[0])).not.toBeDefined();
            yield (0, helpers_1.timeout)(1);
            // Loading should have started but not completed yet
            expect((0, config_1.getLoadedComponent)(baseRoute)).not.toBeDefined();
            expect((0, config_1.getLoadedRoutes)(childRoutes[0])).toBeDefined();
            yield (0, helpers_1.timeout)(10);
            expect((0, config_1.getLoadedComponent)(baseRoute)).toBeDefined();
        }));
        it('loads nested components', () => {
            let LoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedComponent = _classThis;
            })();
            lazyComponentSpy.and.returnValue(LoadedComponent);
            testing_2.TestBed.inject(index_1.Router).resetConfig([
                {
                    path: 'a',
                    loadComponent: lazyComponentSpy,
                    children: [
                        {
                            path: 'b',
                            loadComponent: lazyComponentSpy,
                            children: [
                                {
                                    path: 'c',
                                    loadComponent: lazyComponentSpy,
                                    children: [
                                        {
                                            path: 'd',
                                            loadComponent: lazyComponentSpy,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ]);
            const preloader = testing_2.TestBed.inject(index_1.RouterPreloader);
            preloader.preload().subscribe(() => { });
            expect(lazyComponentSpy).toHaveBeenCalledTimes(4);
        });
    });
});
