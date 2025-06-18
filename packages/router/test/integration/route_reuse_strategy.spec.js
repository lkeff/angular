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
exports.routeReuseIntegrationSuite = routeReuseIntegrationSuite;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const src_1 = require("../../src");
const operators_1 = require("rxjs/operators");
const by_1 = require("@angular/platform-browser/src/dom/debug/by");
const integration_helpers_1 = require("./integration_helpers");
function routeReuseIntegrationSuite() {
    describe('Custom Route Reuse Strategy', () => {
        class AttachDetachReuseStrategy {
            constructor() {
                this.stored = {};
                this.pathsToDetach = ['a'];
            }
            shouldDetach(route) {
                return (typeof route.routeConfig.path !== 'undefined' &&
                    this.pathsToDetach.includes(route.routeConfig.path));
            }
            store(route, detachedTree) {
                this.stored[route.routeConfig.path] = detachedTree;
            }
            shouldAttach(route) {
                return !!this.stored[route.routeConfig.path];
            }
            retrieve(route) {
                return this.stored[route.routeConfig.path];
            }
            shouldReuseRoute(future, curr) {
                return future.routeConfig === curr.routeConfig;
            }
        }
        class ShortLifecycle {
            shouldDetach(route) {
                return false;
            }
            store(route, detachedTree) { }
            shouldAttach(route) {
                return false;
            }
            retrieve(route) {
                return null;
            }
            shouldReuseRoute(future, curr) {
                if (future.routeConfig !== curr.routeConfig) {
                    return false;
                }
                if (Object.keys(future.params).length !== Object.keys(curr.params).length) {
                    return false;
                }
                return Object.keys(future.params).every((k) => future.params[k] === curr.params[k]);
            }
        }
        it('should be injectable', () => {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: src_1.RouteReuseStrategy, useClass: AttachDetachReuseStrategy },
                    (0, src_1.provideRouter)([]),
                ],
            });
            const router = testing_1.TestBed.inject(src_1.Router);
            (0, matchers_1.expect)(router.routeReuseStrategy).toBeInstanceOf(AttachDetachReuseStrategy);
        });
        it('should emit an event when an outlet gets attached/detached', () => __awaiter(this, void 0, void 0, function* () {
            let Container = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'container',
                        template: `<router-outlet (attach)="recordAttached($event)" (detach)="recordDetached($event)"></router-outlet>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Container = _classThis = class {
                    constructor() {
                        this.attachedComponents = [];
                        this.detachedComponents = [];
                    }
                    recordAttached(component) {
                        this.attachedComponents.push(component);
                    }
                    recordDetached(component) {
                        this.detachedComponents.push(component);
                    }
                };
                __setFunctionName(_classThis, "Container");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Container = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Container = _classThis;
            })();
            testing_1.TestBed.configureTestingModule({
                declarations: [Container],
                providers: [{ provide: src_1.RouteReuseStrategy, useClass: AttachDetachReuseStrategy }],
            });
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, Container);
            const cmp = fixture.componentInstance;
            router.resetConfig([
                { path: 'a', component: integration_helpers_1.BlankCmp },
                { path: 'b', component: integration_helpers_1.SimpleCmp },
            ]);
            cmp.attachedComponents = [];
            cmp.detachedComponents = [];
            router.navigateByUrl('/a');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(cmp.attachedComponents.length).toEqual(0);
            (0, matchers_1.expect)(cmp.detachedComponents.length).toEqual(0);
            router.navigateByUrl('/b');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(cmp.attachedComponents.length).toEqual(0);
            (0, matchers_1.expect)(cmp.detachedComponents.length).toEqual(1);
            (0, matchers_1.expect)(cmp.detachedComponents[0] instanceof integration_helpers_1.BlankCmp).toBe(true);
            // the route will be reused by the `RouteReuseStrategy`
            router.navigateByUrl('/a');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(cmp.attachedComponents.length).toEqual(1);
            (0, matchers_1.expect)(cmp.attachedComponents[0] instanceof integration_helpers_1.BlankCmp).toBe(true);
            (0, matchers_1.expect)(cmp.detachedComponents.length).toEqual(1);
            (0, matchers_1.expect)(cmp.detachedComponents[0] instanceof integration_helpers_1.BlankCmp).toBe(true);
        }));
        it('should support attaching & detaching fragments', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.routeReuseStrategy = new AttachDetachReuseStrategy();
            router.routeReuseStrategy.pathsToDetach = ['a', 'b'];
            spyOn(router.routeReuseStrategy, 'retrieve').and.callThrough();
            router.resetConfig([
                {
                    path: 'a',
                    component: integration_helpers_1.TeamCmp,
                    children: [{ path: 'b', component: integration_helpers_1.SimpleCmp }],
                },
                { path: 'c', component: integration_helpers_1.UserCmp },
            ]);
            router.navigateByUrl('/a/b');
            yield (0, integration_helpers_1.advance)(fixture);
            const teamCmp = fixture.debugElement.children[1].componentInstance;
            const simpleCmp = fixture.debugElement.children[1].children[1].componentInstance;
            (0, matchers_1.expect)(location.path()).toEqual('/a/b');
            (0, matchers_1.expect)(teamCmp).toBeDefined();
            (0, matchers_1.expect)(simpleCmp).toBeDefined();
            (0, matchers_1.expect)(router.routeReuseStrategy.retrieve).not.toHaveBeenCalled();
            router.navigateByUrl('/c');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/c');
            (0, matchers_1.expect)(fixture.debugElement.children[1].componentInstance).toBeInstanceOf(integration_helpers_1.UserCmp);
            // We have still not encountered a route that should be reattached
            (0, matchers_1.expect)(router.routeReuseStrategy.retrieve).not.toHaveBeenCalled();
            router.navigateByUrl('/a;p=1/b;p=2');
            yield (0, integration_helpers_1.advance)(fixture);
            // We retrieve both the stored route snapshots
            (0, matchers_1.expect)(router.routeReuseStrategy.retrieve).toHaveBeenCalledTimes(4);
            const teamCmp2 = fixture.debugElement.children[1].componentInstance;
            const simpleCmp2 = fixture.debugElement.children[1].children[1].componentInstance;
            (0, matchers_1.expect)(location.path()).toEqual('/a;p=1/b;p=2');
            (0, matchers_1.expect)(teamCmp2).toBe(teamCmp);
            (0, matchers_1.expect)(simpleCmp2).toBe(simpleCmp);
            (0, matchers_1.expect)(teamCmp.route).toBe(router.routerState.root.firstChild);
            (0, matchers_1.expect)(teamCmp.route.snapshot).toBe(router.routerState.snapshot.root.firstChild);
            (0, matchers_1.expect)(teamCmp.route.snapshot.params).toEqual({ p: '1' });
            (0, matchers_1.expect)(teamCmp.route.firstChild.snapshot.params).toEqual({ p: '2' });
            (0, matchers_1.expect)(teamCmp.recordedParams).toEqual([{}, { p: '1' }]);
        }));
        it('should support shorter lifecycles', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.routeReuseStrategy = new ShortLifecycle();
            router.resetConfig([{ path: 'a', component: integration_helpers_1.SimpleCmp }]);
            router.navigateByUrl('/a');
            yield (0, integration_helpers_1.advance)(fixture);
            const simpleCmp1 = fixture.debugElement.children[1].componentInstance;
            (0, matchers_1.expect)(location.path()).toEqual('/a');
            router.navigateByUrl('/a;p=1');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/a;p=1');
            const simpleCmp2 = fixture.debugElement.children[1].componentInstance;
            (0, matchers_1.expect)(simpleCmp1).not.toBe(simpleCmp2);
        }));
        it('should not mount the component of the previously reused route when the outlet was not instantiated at the time of route activation', () => __awaiter(this, void 0, void 0, function* () {
            let RootCmpWithCondOutlet = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-cmp',
                        template: '<div *ngIf="isToolpanelShowing()"><router-outlet name="toolpanel"></router-outlet></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmpWithCondOutlet = _classThis = class {
                    constructor(router) {
                        this.isToolpanelShowing = (0, core_1.signal)(false);
                        this.subscription = router.events
                            .pipe((0, operators_1.filter)((event) => event instanceof src_1.NavigationEnd))
                            .subscribe(() => this.isToolpanelShowing.set(!!router.parseUrl(router.url).root.children['toolpanel']));
                    }
                    ngOnDestroy() {
                        this.subscription.unsubscribe();
                    }
                };
                __setFunctionName(_classThis, "RootCmpWithCondOutlet");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmpWithCondOutlet = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmpWithCondOutlet = _classThis;
            })();
            let Tool1Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'tool-1-cmp',
                        template: 'Tool 1 showing',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Tool1Component = _classThis = class {
                };
                __setFunctionName(_classThis, "Tool1Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Tool1Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Tool1Component = _classThis;
            })();
            let Tool2Component = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'tool-2-cmp',
                        template: 'Tool 2 showing',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Tool2Component = _classThis = class {
                };
                __setFunctionName(_classThis, "Tool2Component");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Tool2Component = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Tool2Component = _classThis;
            })();
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [RootCmpWithCondOutlet, Tool1Component, Tool2Component],
                        imports: [common_1.CommonModule, ...integration_helpers_1.ROUTER_DIRECTIVES],
                        providers: [
                            (0, src_1.provideRouter)([
                                { path: 'a', outlet: 'toolpanel', component: Tool1Component },
                                { path: 'b', outlet: 'toolpanel', component: Tool2Component },
                            ]),
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
            testing_1.TestBed.configureTestingModule({ imports: [TestModule] });
            const router = testing_1.TestBed.inject(src_1.Router);
            router.routeReuseStrategy = new AttachDetachReuseStrategy();
            const fixture = yield (0, integration_helpers_1.createRoot)(router, RootCmpWithCondOutlet);
            // Activate 'tool-1'
            router.navigate([{ outlets: { toolpanel: 'a' } }]);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture).toContainComponent(Tool1Component, '(a)');
            // Deactivate 'tool-1'
            router.navigate([{ outlets: { toolpanel: null } }]);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture).not.toContainComponent(Tool1Component, '(b)');
            // Activate 'tool-1'
            router.navigate([{ outlets: { toolpanel: 'a' } }]);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture).toContainComponent(Tool1Component, '(c)');
            // Deactivate 'tool-1'
            router.navigate([{ outlets: { toolpanel: null } }]);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture).not.toContainComponent(Tool1Component, '(d)');
            // Activate 'tool-2'
            router.navigate([{ outlets: { toolpanel: 'b' } }]);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture).toContainComponent(Tool2Component, '(e)');
        }));
        it('should not remount a destroyed component', () => __awaiter(this, void 0, void 0, function* () {
            let RootCmpWithCondOutlet = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-cmp',
                        template: '<div *ngIf="showRouterOutlet()"><router-outlet></router-outlet></div>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmpWithCondOutlet = _classThis = class {
                    constructor() {
                        this.showRouterOutlet = (0, core_1.signal)(true);
                    }
                };
                __setFunctionName(_classThis, "RootCmpWithCondOutlet");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmpWithCondOutlet = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmpWithCondOutlet = _classThis;
            })();
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [RootCmpWithCondOutlet],
                        imports: [common_1.CommonModule, ...integration_helpers_1.ROUTER_DIRECTIVES],
                        providers: [
                            { provide: src_1.RouteReuseStrategy, useClass: AttachDetachReuseStrategy },
                            (0, src_1.provideRouter)([
                                { path: 'a', component: integration_helpers_1.SimpleCmp },
                                { path: 'b', component: integration_helpers_1.BlankCmp },
                            ]),
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
            testing_1.TestBed.configureTestingModule({ imports: [TestModule] });
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, RootCmpWithCondOutlet);
            // Activate 'a'
            router.navigate(['a']);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.debugElement.query(by_1.By.directive(integration_helpers_1.SimpleCmp))).toBeTruthy();
            // Deactivate 'a' and detach the route
            router.navigate(['b']);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.debugElement.query(by_1.By.directive(integration_helpers_1.SimpleCmp))).toBeNull();
            // Activate 'a' again, the route should be re-attached
            router.navigate(['a']);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.debugElement.query(by_1.By.directive(integration_helpers_1.SimpleCmp))).toBeTruthy();
            // Hide the router-outlet, SimpleCmp should be destroyed
            fixture.componentInstance.showRouterOutlet.set(false);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.debugElement.query(by_1.By.directive(integration_helpers_1.SimpleCmp))).toBeNull();
            // Show the router-outlet, SimpleCmp should be re-created
            fixture.componentInstance.showRouterOutlet.set(true);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.debugElement.query(by_1.By.directive(integration_helpers_1.SimpleCmp))).toBeTruthy();
        }));
        it('should allow to attach parent route with fresh child route', () => __awaiter(this, void 0, void 0, function* () {
            const CREATED_COMPS = new core_1.InjectionToken('CREATED_COMPS');
            let Root = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root',
                        template: `<router-outlet></router-outlet>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Root = _classThis = class {
                };
                __setFunctionName(_classThis, "Root");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Root = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Root = _classThis;
            })();
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'parent',
                        template: `<router-outlet></router-outlet>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor(createdComps) {
                        createdComps.push('parent');
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
            let Child = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'child',
                        template: `child`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child = _classThis = class {
                    constructor(createdComps) {
                        createdComps.push('child');
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
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Root, Parent, Child],
                        imports: [common_1.CommonModule, ...integration_helpers_1.ROUTER_DIRECTIVES],
                        providers: [
                            { provide: src_1.RouteReuseStrategy, useClass: AttachDetachReuseStrategy },
                            { provide: CREATED_COMPS, useValue: [] },
                            (0, src_1.provideRouter)([
                                { path: 'a', component: Parent, children: [{ path: 'b', component: Child }] },
                                { path: 'c', component: integration_helpers_1.SimpleCmp },
                            ]),
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
            testing_1.TestBed.configureTestingModule({ imports: [TestModule] });
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, Root);
            const createdComps = testing_1.TestBed.inject(CREATED_COMPS);
            (0, matchers_1.expect)(createdComps).toEqual([]);
            router.navigateByUrl('/a/b');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(createdComps).toEqual(['parent', 'child']);
            router.navigateByUrl('/c');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(createdComps).toEqual(['parent', 'child']);
            // 'a' parent route will be reused by the `RouteReuseStrategy`, child 'b' should be
            // recreated
            router.navigateByUrl('/a/b');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(createdComps).toEqual(['parent', 'child', 'child']);
        }));
        it('should not try to detach the outlet of a route that does not get to attach a component', () => __awaiter(this, void 0, void 0, function* () {
            let Root = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root',
                        template: `<router-outlet></router-outlet>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Root = _classThis = class {
                };
                __setFunctionName(_classThis, "Root");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Root = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Root = _classThis;
            })();
            let ComponentA = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'component-a',
                        template: 'Component A',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ComponentA = _classThis = class {
                };
                __setFunctionName(_classThis, "ComponentA");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentA = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentA = _classThis;
            })();
            let ComponentB = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'component-b',
                        template: 'Component B',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ComponentB = _classThis = class {
                };
                __setFunctionName(_classThis, "ComponentB");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ComponentB = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ComponentB = _classThis;
            })();
            let LoadedModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [ComponentA],
                        imports: [src_1.RouterModule.forChild([{ path: '', component: ComponentA }])],
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
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Root, ComponentB],
                        imports: [integration_helpers_1.ROUTER_DIRECTIVES],
                        providers: [
                            { provide: src_1.RouteReuseStrategy, useClass: AttachDetachReuseStrategy },
                            (0, src_1.provideRouter)([
                                { path: 'a', loadChildren: () => LoadedModule },
                                { path: 'b', component: ComponentB },
                            ]),
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
            testing_1.TestBed.configureTestingModule({ imports: [TestModule] });
            const router = testing_1.TestBed.inject(src_1.Router);
            const strategy = testing_1.TestBed.inject(src_1.RouteReuseStrategy);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, Root);
            spyOn(strategy, 'shouldDetach').and.callThrough();
            router.navigateByUrl('/a');
            yield (0, integration_helpers_1.advance)(fixture);
            // Deactivate 'a'
            // 'shouldDetach' should not be called for the componentless route
            router.navigateByUrl('/b');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(strategy.shouldDetach).toHaveBeenCalledTimes(1);
        }));
    });
}
