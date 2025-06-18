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
exports.lazyLoadingIntegrationSuite = lazyLoadingIntegrationSuite;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const index_1 = require("../../index");
const router_devtools_1 = require("../../src/router_devtools");
const integration_helpers_1 = require("./integration_helpers");
function lazyLoadingIntegrationSuite() {
    describe('lazy loading', () => {
        it('works', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            let ParentLazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded-parent [<router-outlet></router-outlet>]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentLazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentLazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentLazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentLazyLoadedComponent = _classThis;
            })();
            let ChildLazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded-child',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildLazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildLazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildLazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildLazyLoadedComponent = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [ParentLazyLoadedComponent, ChildLazyLoadedComponent],
                        imports: [
                            index_1.RouterModule.forChild([
                                {
                                    path: 'loaded',
                                    component: ParentLazyLoadedComponent,
                                    children: [{ path: 'child', component: ChildLazyLoadedComponent }],
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
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: () => LoadedModule }]);
            router.navigateByUrl('/lazy/loaded/child');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/lazy/loaded/child');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('lazy-loaded-parent [lazy-loaded-child]');
        }));
        it('should have 2 injector trees: module and element', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'parent[<router-outlet></router-outlet>]',
                        viewProviders: [{ provide: 'shadow', useValue: 'from parent component' }],
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
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
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'child',
                        standalone: false,
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
            let ParentModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Parent],
                        imports: [
                            index_1.RouterModule.forChild([
                                {
                                    path: 'parent',
                                    component: Parent,
                                    children: [{ path: 'child', loadChildren: () => ChildModule }],
                                },
                            ]),
                        ],
                        providers: [
                            { provide: 'moduleName', useValue: 'parent' },
                            { provide: 'fromParent', useValue: 'from parent' },
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentModule = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentModule = _classThis;
            })();
            let ChildModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Child],
                        imports: [index_1.RouterModule.forChild([{ path: '', component: Child }])],
                        providers: [
                            { provide: 'moduleName', useValue: 'child' },
                            { provide: 'fromChild', useValue: 'from child' },
                            { provide: 'shadow', useValue: 'from child module' },
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildModule = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildModule = _classThis;
            })();
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: () => ParentModule }]);
            router.navigateByUrl('/lazy/parent/child');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/lazy/parent/child');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('parent[child]');
            const pInj = fixture.debugElement.query(by_1.By.directive(Parent)).injector;
            const cInj = fixture.debugElement.query(by_1.By.directive(Child)).injector;
            (0, matchers_1.expect)(pInj.get('moduleName')).toEqual('parent');
            (0, matchers_1.expect)(pInj.get('fromParent')).toEqual('from parent');
            (0, matchers_1.expect)(pInj.get(Parent)).toBeInstanceOf(Parent);
            (0, matchers_1.expect)(pInj.get('fromChild', null)).toEqual(null);
            (0, matchers_1.expect)(pInj.get(Child, null)).toEqual(null);
            (0, matchers_1.expect)(cInj.get('moduleName')).toEqual('child');
            (0, matchers_1.expect)(cInj.get('fromParent')).toEqual('from parent');
            (0, matchers_1.expect)(cInj.get('fromChild')).toEqual('from child');
            (0, matchers_1.expect)(cInj.get(Parent)).toBeInstanceOf(Parent);
            (0, matchers_1.expect)(cInj.get(Child)).toBeInstanceOf(Child);
            // The child module can not shadow the parent component
            (0, matchers_1.expect)(cInj.get('shadow')).toEqual('from parent component');
            const pmInj = pInj.get(core_1.NgModuleRef).injector;
            const cmInj = cInj.get(core_1.NgModuleRef).injector;
            (0, matchers_1.expect)(pmInj.get('moduleName')).toEqual('parent');
            (0, matchers_1.expect)(cmInj.get('moduleName')).toEqual('child');
            (0, matchers_1.expect)(pmInj.get(Parent, '-')).toEqual('-');
            (0, matchers_1.expect)(cmInj.get(Parent, '-')).toEqual('-');
            (0, matchers_1.expect)(pmInj.get(Child, '-')).toEqual('-');
            (0, matchers_1.expect)(cmInj.get(Child, '-')).toEqual('-');
        }));
        // https://github.com/angular/angular/issues/12889
        it('should create a single instance of lazy-loaded modules', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            let ParentLazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded-parent [<router-outlet></router-outlet>]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentLazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentLazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentLazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentLazyLoadedComponent = _classThis;
            })();
            let ChildLazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded-child',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildLazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildLazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildLazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildLazyLoadedComponent = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [ParentLazyLoadedComponent, ChildLazyLoadedComponent],
                        imports: [
                            index_1.RouterModule.forChild([
                                {
                                    path: 'loaded',
                                    component: ParentLazyLoadedComponent,
                                    children: [{ path: 'child', component: ChildLazyLoadedComponent }],
                                },
                            ]),
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LoadedModule = _classThis = class {
                    constructor() {
                        LoadedModule.instances++;
                    }
                };
                __setFunctionName(_classThis, "LoadedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LoadedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                })();
                _classThis.instances = 0;
                (() => {
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LoadedModule = _classThis;
            })();
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: () => LoadedModule }]);
            router.navigateByUrl('/lazy/loaded/child');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('lazy-loaded-parent [lazy-loaded-child]');
            (0, matchers_1.expect)(LoadedModule.instances).toEqual(1);
        }));
        // https://github.com/angular/angular/issues/13870
        it('should create a single instance of guards for lazy-loaded modules', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            let Service = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Service = _classThis = class {
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
            let Resolver = (() => {
                let _classDecorators = [(0, core_1.Injectable)()];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Resolver = _classThis = class {
                    constructor(service) {
                        this.service = service;
                    }
                    resolve() {
                        return this.service;
                    }
                };
                __setFunctionName(_classThis, "Resolver");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Resolver = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Resolver = _classThis;
            })();
            let LazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedComponent = _classThis = class {
                    constructor(injectedService, route) {
                        this.injectedService = injectedService;
                        this.resolvedService = route.snapshot.data['service'];
                    }
                };
                __setFunctionName(_classThis, "LazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedComponent = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyLoadedComponent],
                        providers: [Service, Resolver],
                        imports: [
                            index_1.RouterModule.forChild([
                                {
                                    path: 'loaded',
                                    component: LazyLoadedComponent,
                                    resolve: { 'service': () => (0, core_1.inject)(Resolver).resolve() },
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
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: () => LoadedModule }]);
            router.navigateByUrl('/lazy/loaded');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('lazy');
            const lzc = fixture.debugElement.query(by_1.By.directive(LazyLoadedComponent)).componentInstance;
            (0, matchers_1.expect)(lzc.injectedService).toBe(lzc.resolvedService);
        }));
        it('should emit RouteConfigLoadStart and RouteConfigLoadEnd event when route is lazy loaded', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            let ParentLazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded-parent [<router-outlet></router-outlet>]',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ParentLazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "ParentLazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ParentLazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ParentLazyLoadedComponent = _classThis;
            })();
            let ChildLazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded-child',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildLazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildLazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildLazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildLazyLoadedComponent = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [ParentLazyLoadedComponent, ChildLazyLoadedComponent],
                        imports: [
                            index_1.RouterModule.forChild([
                                {
                                    path: 'loaded',
                                    component: ParentLazyLoadedComponent,
                                    children: [{ path: 'child', component: ChildLazyLoadedComponent }],
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
            const events = [];
            router.events.subscribe((e) => {
                if (e instanceof index_1.RouteConfigLoadStart || e instanceof index_1.RouteConfigLoadEnd) {
                    events.push(e);
                }
            });
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: () => LoadedModule }]);
            router.navigateByUrl('/lazy/loaded/child');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(events.length).toEqual(2);
            (0, matchers_1.expect)(events[0].toString()).toEqual('RouteConfigLoadStart(path: lazy)');
            (0, matchers_1.expect)(events[1].toString()).toEqual('RouteConfigLoadEnd(path: lazy)');
        }));
        it('throws an error when forRoot() is used in a lazy context', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            let LazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'should not show',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedComponent = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyLoadedComponent],
                        imports: [index_1.RouterModule.forRoot([{ path: 'loaded', component: LazyLoadedComponent }])],
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
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: () => LoadedModule }]);
            let recordedError = null;
            router.navigateByUrl('/lazy/loaded').catch((err) => (recordedError = err));
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(recordedError.message).toContain(`NG04007`);
        }));
        it('should combine routes from multiple modules into a single configuration', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            let LazyComponent2 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded-2',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyComponent2 = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyComponent2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyComponent2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyComponent2 = _classThis;
            })();
            let SiblingOfLoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyComponent2],
                        imports: [index_1.RouterModule.forChild([{ path: 'loaded', component: LazyComponent2 }])],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var SiblingOfLoadedModule = _classThis = class {
                };
                __setFunctionName(_classThis, "SiblingOfLoadedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    SiblingOfLoadedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return SiblingOfLoadedModule = _classThis;
            })();
            let LazyComponent1 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
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
                            index_1.RouterModule.forChild([{ path: 'loaded', component: LazyComponent1 }]),
                            SiblingOfLoadedModule,
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
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'lazy1', loadChildren: () => LoadedModule },
                { path: 'lazy2', loadChildren: () => SiblingOfLoadedModule },
            ]);
            router.navigateByUrl('/lazy1/loaded');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/lazy1/loaded');
            router.navigateByUrl('/lazy2/loaded');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/lazy2/loaded');
        }));
        it('should allow lazy loaded module in named outlet', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            let LazyComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyComponent = _classThis;
            })();
            let LazyLoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyComponent],
                        imports: [index_1.RouterModule.forChild([{ path: '', component: LazyComponent }])],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyLoadedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedModule = _classThis;
            })();
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'user/:name', component: integration_helpers_1.UserCmp },
                        { path: 'lazy', loadChildren: () => LazyLoadedModule, outlet: 'right' },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/user/john');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ user john, right:  ]');
            router.navigateByUrl('/team/22/(user/john//right:lazy)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ user john, right: lazy-loaded ]');
        }));
        it('should allow componentless named outlet to render children', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'user/:name', component: integration_helpers_1.UserCmp },
                        { path: 'simple', outlet: 'right', children: [{ path: '', component: integration_helpers_1.SimpleCmp }] },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/user/john');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ user john, right:  ]');
            router.navigateByUrl('/team/22/(user/john//right:simple)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ user john, right: simple ]');
        }));
        it('should render loadComponent named outlet with children', () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const router = testing_1.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            let RightComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [index_1.RouterModule],
                        template: '[right outlet component: <router-outlet></router-outlet>]',
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RightComponent = _classThis = class {
                    constructor(route) {
                        this.route = route;
                    }
                };
                __setFunctionName(_classThis, "RightComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RightComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RightComponent = _classThis;
            })();
            const loadSpy = jasmine.createSpy();
            loadSpy.and.returnValue(RightComponent);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'user/:name', component: integration_helpers_1.UserCmp },
                        {
                            path: 'simple',
                            loadComponent: loadSpy,
                            outlet: 'right',
                            children: [{ path: '', component: integration_helpers_1.SimpleCmp }],
                        },
                    ],
                },
                { path: '', component: integration_helpers_1.SimpleCmp },
            ]);
            router.navigateByUrl('/team/22/(user/john//right:simple)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ user john, right: [right outlet component: simple] ]');
            const rightCmp = fixture.debugElement.query(by_1.By.directive(RightComponent)).componentInstance;
            // Ensure we don't accidentally add `EmptyOutletComponent` via `standardizeConfig`
            (0, matchers_1.expect)((_a = rightCmp.route.routeConfig) === null || _a === void 0 ? void 0 : _a.component).not.toBeDefined();
            // Ensure we can navigate away and come back
            router.navigateByUrl('/');
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('/team/22/(user/john//right:simple)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ user john, right: [right outlet component: simple] ]');
            (0, matchers_1.expect)(loadSpy.calls.count()).toEqual(1);
        }));
        describe('should use the injector of the lazily-loaded configuration', () => {
            class LazyLoadedServiceDefinedInModule {
            }
            let EagerParentComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'eager-parent',
                        template: 'eager-parent <router-outlet></router-outlet>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var EagerParentComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "EagerParentComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    EagerParentComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return EagerParentComponent = _classThis;
            })();
            let LazyParentComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy-parent',
                        template: 'lazy-parent <router-outlet></router-outlet>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyParentComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyParentComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyParentComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyParentComponent = _classThis;
            })();
            let LazyChildComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy-child',
                        template: 'lazy-child',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyChildComponent = _classThis = class {
                    constructor(lazy, // should be able to inject lazy/direct parent
                    lazyService, // should be able to inject lazy service
                    eager) { }
                };
                __setFunctionName(_classThis, "LazyChildComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyChildComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyChildComponent = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyParentComponent, LazyChildComponent],
                        imports: [
                            index_1.RouterModule.forChild([
                                {
                                    path: '',
                                    children: [
                                        {
                                            path: 'lazy-parent',
                                            component: LazyParentComponent,
                                            children: [{ path: 'lazy-child', component: LazyChildComponent }],
                                        },
                                    ],
                                },
                            ]),
                        ],
                        providers: [LazyLoadedServiceDefinedInModule],
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
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [EagerParentComponent], imports: [index_1.RouterModule.forRoot([])] })];
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
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({
                    imports: [TestModule],
                });
            });
            it('should use the injector of the lazily-loaded configuration', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(index_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'eager-parent',
                        component: EagerParentComponent,
                        children: [{ path: 'lazy', loadChildren: () => LoadedModule }],
                    },
                ]);
                router.navigateByUrl('/eager-parent/lazy/lazy-parent/lazy-child');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/eager-parent/lazy/lazy-parent/lazy-child');
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('eager-parent lazy-parent lazy-child');
            }));
        });
        it('works when given a callback', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            let LazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedComponent = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyLoadedComponent],
                        imports: [index_1.RouterModule.forChild([{ path: 'loaded', component: LazyLoadedComponent }])],
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
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: () => LoadedModule }]);
            router.navigateByUrl('/lazy/loaded');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/lazy/loaded');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('lazy-loaded');
        }));
        it('error emit an error when cannot load a config', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'lazy',
                    loadChildren: () => {
                        throw new Error('invalid');
                    },
                },
            ]);
            const recordedEvents = [];
            router.events.forEach((e) => recordedEvents.push(e));
            router.navigateByUrl('/lazy/loaded').catch((s) => { });
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('');
            (0, integration_helpers_1.expectEvents)(recordedEvents, [
                [index_1.NavigationStart, '/lazy/loaded'],
                [index_1.RouteConfigLoadStart],
                [index_1.NavigationError, '/lazy/loaded'],
            ]);
        }));
        it('should emit an error when the lazily-loaded config is not valid', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ imports: [index_1.RouterModule.forChild([{ path: 'loaded' }])] })];
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
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: () => LoadedModule }]);
            let recordedError = null;
            router.navigateByUrl('/lazy/loaded').catch((err) => (recordedError = err));
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(recordedError.message).toContain(`Invalid configuration of route 'lazy/loaded'. One of the following must be provided: component, loadComponent, redirectTo, children or loadChildren`);
        }));
        it('should work with complex redirect rules', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            let LazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedComponent = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyLoadedComponent],
                        imports: [index_1.RouterModule.forChild([{ path: 'loaded', component: LazyLoadedComponent }])],
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
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'lazy', loadChildren: () => LoadedModule },
                { path: '**', redirectTo: 'lazy' },
            ]);
            router.navigateByUrl('/lazy/loaded');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/lazy/loaded');
        }));
        it('should work with wildcard route', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            let LazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'lazy-loaded',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedComponent = _classThis;
            })();
            let LazyLoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyLoadedComponent],
                        imports: [index_1.RouterModule.forChild([{ path: '', component: LazyLoadedComponent }])],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyLoadedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedModule = _classThis;
            })();
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: '**', loadChildren: () => LazyLoadedModule }]);
            router.navigateByUrl('/lazy');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/lazy');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('lazy-loaded');
        }));
        describe('preloading', () => {
            let log = [];
            let LazyLoadedComponent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'lazy',
                        template: 'should not show',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedComponent = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyLoadedComponent");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedComponent = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedComponent = _classThis;
            })();
            let LoadedModule2 = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [LazyLoadedComponent],
                        imports: [index_1.RouterModule.forChild([{ path: 'LoadedModule2', component: LazyLoadedComponent }])],
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
                log.length = 0;
                testing_1.TestBed.configureTestingModule({
                    providers: [{ provide: index_1.PreloadingStrategy, useExisting: index_1.PreloadAllModules }],
                });
                const preloader = testing_1.TestBed.inject(index_1.RouterPreloader);
                preloader.setUpPreloading();
            });
            it('should work', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(index_1.Router);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    { path: 'blank', component: integration_helpers_1.BlankCmp },
                    { path: 'lazy', loadChildren: () => LoadedModule1 },
                ]);
                router.navigateByUrl('/blank');
                yield (0, integration_helpers_1.advance)(fixture);
                const config = router.config;
                const firstRoutes = (0, router_devtools_1.getLoadedRoutes)(config[1]);
                (0, matchers_1.expect)(firstRoutes).toBeDefined();
                (0, matchers_1.expect)(firstRoutes[0].path).toEqual('LoadedModule1');
                const secondRoutes = (0, router_devtools_1.getLoadedRoutes)(firstRoutes[0]);
                (0, matchers_1.expect)(secondRoutes).toBeDefined();
                (0, matchers_1.expect)(secondRoutes[0].path).toEqual('LoadedModule2');
            }));
            it('should not preload when canLoad is present and does not execute guard', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(index_1.Router);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    { path: 'blank', component: integration_helpers_1.BlankCmp },
                    {
                        path: 'lazy',
                        loadChildren: () => LoadedModule1,
                        canLoad: [
                            () => {
                                log.push('loggingReturnsTrue');
                                return true;
                            },
                        ],
                    },
                ]);
                router.navigateByUrl('/blank');
                yield (0, integration_helpers_1.advance)(fixture);
                const config = router.config;
                const firstRoutes = (0, router_devtools_1.getLoadedRoutes)(config[1]);
                (0, matchers_1.expect)(firstRoutes).toBeUndefined();
                (0, matchers_1.expect)(log.length).toBe(0);
            }));
            it('should allow navigation to modules with no routes', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(index_1.Router);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([{ path: 'lazy', loadChildren: () => EmptyModule }]);
                router.navigateByUrl('/lazy');
                yield (0, integration_helpers_1.advance)(fixture);
            }));
        });
        describe('custom url handling strategies', () => {
            class CustomUrlHandlingStrategy {
                shouldProcessUrl(url) {
                    return url.toString().startsWith('/include') || url.toString() === '/';
                }
                extract(url) {
                    const oldRoot = url.root;
                    const children = {};
                    if (oldRoot.children[index_1.PRIMARY_OUTLET]) {
                        children[index_1.PRIMARY_OUTLET] = oldRoot.children[index_1.PRIMARY_OUTLET];
                    }
                    const root = new index_1.UrlSegmentGroup(oldRoot.segments, children);
                    return new index_1.UrlTree(root, url.queryParams, url.fragment);
                }
                merge(newUrlPart, wholeUrl) {
                    const oldRoot = newUrlPart.root;
                    const children = {};
                    if (oldRoot.children[index_1.PRIMARY_OUTLET]) {
                        children[index_1.PRIMARY_OUTLET] = oldRoot.children[index_1.PRIMARY_OUTLET];
                    }
                    Object.entries(wholeUrl.root.children).forEach(([k, v]) => {
                        if (k !== index_1.PRIMARY_OUTLET) {
                            children[k] = v;
                        }
                        v.parent = this;
                    });
                    const root = new index_1.UrlSegmentGroup(oldRoot.segments, children);
                    return new index_1.UrlTree(root, newUrlPart.queryParams, newUrlPart.fragment);
                }
            }
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({
                    providers: [
                        { provide: index_1.UrlHandlingStrategy, useClass: CustomUrlHandlingStrategy },
                        { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
                    ],
                });
            });
            it('should work', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(index_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'include',
                        component: integration_helpers_1.TeamCmp,
                        children: [
                            { path: 'user/:name', component: integration_helpers_1.UserCmp },
                            { path: 'simple', component: integration_helpers_1.SimpleCmp },
                        ],
                    },
                ]);
                const events = [];
                router.events.subscribe((e) => e instanceof index_1.RouterEvent && events.push(e));
                // supported URL
                router.navigateByUrl('/include/user/kate');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/include/user/kate');
                (0, integration_helpers_1.expectEvents)(events, [
                    [index_1.NavigationStart, '/include/user/kate'],
                    [index_1.RoutesRecognized, '/include/user/kate'],
                    [index_1.GuardsCheckStart, '/include/user/kate'],
                    [index_1.GuardsCheckEnd, '/include/user/kate'],
                    [index_1.ResolveStart, '/include/user/kate'],
                    [index_1.ResolveEnd, '/include/user/kate'],
                    [index_1.NavigationEnd, '/include/user/kate'],
                ]);
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team  [ user kate, right:  ]');
                events.splice(0);
                // unsupported URL
                router.navigateByUrl('/exclude/one');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/exclude/one');
                (0, matchers_1.expect)(Object.keys(router.routerState.root.children).length).toEqual(0);
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
                (0, integration_helpers_1.expectEvents)(events, [
                    [index_1.NavigationStart, '/exclude/one'],
                    [index_1.GuardsCheckStart, '/exclude/one'],
                    [index_1.GuardsCheckEnd, '/exclude/one'],
                    [index_1.NavigationEnd, '/exclude/one'],
                ]);
                events.splice(0);
                // another unsupported URL
                location.go('/exclude/two');
                location.historyGo(0);
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/exclude/two');
                (0, integration_helpers_1.expectEvents)(events, [[index_1.NavigationSkipped, '/exclude/two']]);
                events.splice(0);
                // back to a supported URL
                location.go('/include/simple');
                location.historyGo(0);
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/include/simple');
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team  [ simple, right:  ]');
                (0, integration_helpers_1.expectEvents)(events, [
                    [index_1.NavigationStart, '/include/simple'],
                    [index_1.RoutesRecognized, '/include/simple'],
                    [index_1.GuardsCheckStart, '/include/simple'],
                    [index_1.GuardsCheckEnd, '/include/simple'],
                    [index_1.ResolveStart, '/include/simple'],
                    [index_1.ResolveEnd, '/include/simple'],
                    [index_1.NavigationEnd, '/include/simple'],
                ]);
            }));
            it('should handle the case when the router takes only the primary url', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(index_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'include',
                        component: integration_helpers_1.TeamCmp,
                        children: [
                            { path: 'user/:name', component: integration_helpers_1.UserCmp },
                            { path: 'simple', component: integration_helpers_1.SimpleCmp },
                        ],
                    },
                ]);
                const events = [];
                router.events.subscribe((e) => e instanceof index_1.RouterEvent && events.push(e));
                location.go('/include/user/kate(aux:excluded)');
                location.historyGo(0);
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/include/user/kate(aux:excluded)');
                (0, integration_helpers_1.expectEvents)(events, [
                    [index_1.NavigationStart, '/include/user/kate'],
                    [index_1.RoutesRecognized, '/include/user/kate'],
                    [index_1.GuardsCheckStart, '/include/user/kate'],
                    [index_1.GuardsCheckEnd, '/include/user/kate'],
                    [index_1.ResolveStart, '/include/user/kate'],
                    [index_1.ResolveEnd, '/include/user/kate'],
                    [index_1.NavigationEnd, '/include/user/kate'],
                ]);
                events.splice(0);
                location.go('/include/user/kate(aux:excluded2)');
                location.historyGo(0);
                yield (0, integration_helpers_1.advance)(fixture);
                (0, integration_helpers_1.expectEvents)(events, [[index_1.NavigationSkipped, '/include/user/kate(aux:excluded2)']]);
                events.splice(0);
                router.navigateByUrl('/include/simple');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/include/simple(aux:excluded2)');
                (0, integration_helpers_1.expectEvents)(events, [
                    [index_1.NavigationStart, '/include/simple'],
                    [index_1.RoutesRecognized, '/include/simple'],
                    [index_1.GuardsCheckStart, '/include/simple'],
                    [index_1.GuardsCheckEnd, '/include/simple'],
                    [index_1.ResolveStart, '/include/simple'],
                    [index_1.ResolveEnd, '/include/simple'],
                    [index_1.NavigationEnd, '/include/simple'],
                ]);
            }));
            it('should not remove parts of the URL that are not handled by the router when "eager"', () => __awaiter(this, void 0, void 0, function* () {
                testing_1.TestBed.configureTestingModule({
                    providers: [(0, index_1.provideRouter)([], (0, index_1.withRouterConfig)({ urlUpdateStrategy: 'eager' }))],
                });
                const router = testing_1.TestBed.inject(index_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'include',
                        component: integration_helpers_1.TeamCmp,
                        children: [{ path: 'user/:name', component: integration_helpers_1.UserCmp }],
                    },
                ]);
                location.go('/include/user/kate(aux:excluded)');
                location.historyGo(0);
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/include/user/kate(aux:excluded)');
            }));
        });
        it('can use `relativeTo` `route.parent` in `routerLink` to close secondary outlet', () => __awaiter(this, void 0, void 0, function* () {
            // Given
            let ChildRootCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<router-outlet name="secondary"></router-outlet>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ChildRootCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "ChildRootCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ChildRootCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ChildRootCmp = _classThis;
            })();
            let RelativeLinkCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'link-cmp',
                        template: `<a [relativeTo]="route.parent" [routerLink]="[{outlets: {'secondary': null}}]">link</a>
            <button [relativeTo]="route.parent" [routerLink]="[{outlets: {'secondary': null}}]">link</button>
            `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                let _links_decorators;
                let _links_initializers = [];
                let _links_extraInitializers = [];
                var RelativeLinkCmp = _classThis = class {
                    constructor(route) {
                        this.route = route;
                        this.links = __runInitializers(this, _links_initializers, void 0);
                        __runInitializers(this, _links_extraInitializers);
                        this.route = route;
                    }
                };
                __setFunctionName(_classThis, "RelativeLinkCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _links_decorators = [(0, core_1.ViewChildren)(index_1.RouterLink)];
                    __esDecorate(null, null, _links_decorators, { kind: "field", name: "links", static: false, private: false, access: { has: obj => "links" in obj, get: obj => obj.links, set: (obj, value) => { obj.links = value; } }, metadata: _metadata }, _links_initializers, _links_extraInitializers);
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RelativeLinkCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RelativeLinkCmp = _classThis;
            })();
            let LazyLoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [RelativeLinkCmp, ChildRootCmp],
                        imports: [
                            index_1.RouterModule.forChild([
                                {
                                    path: 'childRoot',
                                    component: ChildRootCmp,
                                    children: [{ path: 'popup', outlet: 'secondary', component: RelativeLinkCmp }],
                                },
                            ]),
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyLoadedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedModule = _classThis;
            })();
            const router = testing_1.TestBed.inject(index_1.Router);
            router.resetConfig([{ path: 'root', loadChildren: () => LazyLoadedModule }]);
            // When
            router.navigateByUrl('/root/childRoot/(secondary:popup)');
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            yield (0, integration_helpers_1.advance)(fixture);
            // Then
            const relativeLinkCmp = fixture.debugElement.query(by_1.By.directive(RelativeLinkCmp)).componentInstance;
            (0, matchers_1.expect)(relativeLinkCmp.links.first.urlTree.toString()).toEqual('/root/childRoot');
            (0, matchers_1.expect)(relativeLinkCmp.links.last.urlTree.toString()).toEqual('/root/childRoot');
        }));
        it('should ignore empty path for relative links', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(index_1.Router);
            let RelativeLinkCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'link-cmp',
                        template: `<a [routerLink]="['../simple']">link</a>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RelativeLinkCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "RelativeLinkCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RelativeLinkCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RelativeLinkCmp = _classThis;
            })();
            let LazyLoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [RelativeLinkCmp],
                        imports: [
                            index_1.RouterModule.forChild([
                                { path: 'foo/bar', children: [{ path: '', component: RelativeLinkCmp }] },
                            ]),
                        ],
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var LazyLoadedModule = _classThis = class {
                };
                __setFunctionName(_classThis, "LazyLoadedModule");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    LazyLoadedModule = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return LazyLoadedModule = _classThis;
            })();
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: () => LazyLoadedModule }]);
            router.navigateByUrl('/lazy/foo/bar');
            yield (0, integration_helpers_1.advance)(fixture);
            const link = fixture.nativeElement.querySelector('a');
            (0, matchers_1.expect)(link.getAttribute('href')).toEqual('/lazy/foo/simple');
        }));
    });
}
