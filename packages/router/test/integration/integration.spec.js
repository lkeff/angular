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
const testing_1 = require("@angular/common/testing");
const core_1 = require("@angular/core");
const testing_2 = require("@angular/core/testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const index_1 = require("../../index");
const provide_router_1 = require("../../src/provide_router");
const integration_helpers_1 = require("./integration_helpers");
const guards_spec_1 = require("./guards.spec");
const lazy_loading_spec_1 = require("./lazy_loading.spec");
const route_data_spec_1 = require("./route_data.spec");
const route_reuse_strategy_spec_1 = require("./route_reuse_strategy.spec");
const router_link_active_spec_1 = require("./router_link_active.spec");
const router_events_spec_1 = require("./router_events.spec");
const redirects_spec_1 = require("./redirects.spec");
const router_links_spec_1 = require("./router_links.spec");
const navigation_spec_1 = require("./navigation.spec");
const eager_url_update_strategy_spec_1 = require("./eager_url_update_strategy.spec");
const duplicate_in_flight_navigations_spec_1 = require("./duplicate_in_flight_navigations.spec");
const navigation_errors_spec_1 = require("./navigation_errors.spec");
for (const browserAPI of ['navigation', 'history']) {
    describe(`${browserAPI}-based routing`, () => {
        const noopConsole = { log() { }, warn() { } };
        beforeEach(() => {
            testing_2.TestBed.configureTestingModule({
                imports: [...integration_helpers_1.ROUTER_DIRECTIVES, integration_helpers_1.TestModule],
                providers: [
                    { provide: core_1.ɵConsole, useValue: noopConsole },
                    (0, provide_router_1.provideRouter)([{ path: 'simple', component: integration_helpers_1.SimpleCmp }]),
                    browserAPI === 'navigation' ? (0, testing_1.ɵprovideFakePlatformNavigation)() : [],
                ],
            });
        });
        it('should navigate with a provided config', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.navigateByUrl('/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/simple');
        }));
        it('should navigate from ngOnInit hook', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'one', component: integration_helpers_1.RouteCmp },
            ]);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmpWithOnInit);
            (0, matchers_1.expect)(location.path()).toEqual('/one');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('route');
        }));
        it('Should work inside ChangeDetectionStrategy.OnPush components', () => __awaiter(void 0, void 0, void 0, function* () {
            let OnPushOutlet = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'root-cmp',
                        template: `<router-outlet></router-outlet>`,
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var OnPushOutlet = _classThis = class {
                };
                __setFunctionName(_classThis, "OnPushOutlet");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    OnPushOutlet = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return OnPushOutlet = _classThis;
            })();
            let NeedCdCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'need-cd',
                        template: `{{'it works!'}}`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NeedCdCmp = _classThis = class {
                };
                __setFunctionName(_classThis, "NeedCdCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NeedCdCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NeedCdCmp = _classThis;
            })();
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [OnPushOutlet, NeedCdCmp],
                        imports: [index_1.RouterModule.forRoot([])],
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
            testing_2.TestBed.configureTestingModule({ imports: [TestModule] });
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'on',
                    component: OnPushOutlet,
                    children: [
                        {
                            path: 'push',
                            component: NeedCdCmp,
                        },
                    ],
                },
            ]);
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('on');
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('on/push');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('it works!');
        }));
        it('should not error when no url left and no children are matching', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [{ path: 'simple', component: integration_helpers_1.SimpleCmp }],
                },
            ]);
            router.navigateByUrl('/team/33/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/33/simple');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 33 [ simple, right:  ]');
            router.navigateByUrl('/team/33');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/33');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 33 [ , right:  ]');
        }));
        it('should work when an outlet is in an ngIf', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'child',
                    component: integration_helpers_1.OutletInNgIf,
                    children: [{ path: 'simple', component: integration_helpers_1.SimpleCmp }],
                },
            ]);
            router.navigateByUrl('/child/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/child/simple');
        }));
        it('should work when an outlet is added/removed', () => __awaiter(void 0, void 0, void 0, function* () {
            let RootCmpWithLink = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'someRoot',
                        template: `[<div *ngIf="cond()"><router-outlet></router-outlet></div>]`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RootCmpWithLink = _classThis = class {
                    constructor() {
                        this.cond = (0, core_1.signal)(true);
                    }
                };
                __setFunctionName(_classThis, "RootCmpWithLink");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RootCmpWithLink = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RootCmpWithLink = _classThis;
            })();
            testing_2.TestBed.configureTestingModule({ declarations: [RootCmpWithLink] });
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, RootCmpWithLink);
            router.resetConfig([
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
                { path: 'blank', component: integration_helpers_1.BlankCmp },
            ]);
            router.navigateByUrl('/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('[simple]');
            fixture.componentInstance.cond.set(false);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('[]');
            fixture.componentInstance.cond.set(true);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('[simple]');
        }));
        it('should update location when navigating', () => __awaiter(void 0, void 0, void 0, function* () {
            let RecordLocationCmp = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `record`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var RecordLocationCmp = _classThis = class {
                    constructor(loc) {
                        this.storedPath = loc.path();
                    }
                };
                __setFunctionName(_classThis, "RecordLocationCmp");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    RecordLocationCmp = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return RecordLocationCmp = _classThis;
            })();
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({ declarations: [RecordLocationCmp] })];
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
            testing_2.TestBed.configureTestingModule({ imports: [TestModule] });
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'record/:id', component: RecordLocationCmp }]);
            router.navigateByUrl('/record/22');
            yield (0, integration_helpers_1.advance)(fixture);
            const c = fixture.debugElement.children[1].componentInstance;
            (0, matchers_1.expect)(location.path()).toEqual('/record/22');
            (0, matchers_1.expect)(c.storedPath).toEqual('/record/22');
            router.navigateByUrl('/record/33');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/record/33');
        }));
        it('should skip location update when using NavigationExtras.skipLocationChange with navigateByUrl', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = testing_2.TestBed.createComponent(integration_helpers_1.RootCmp);
            yield (0, integration_helpers_1.advance)(fixture);
            router.resetConfig([{ path: 'team/:id', component: integration_helpers_1.TeamCmp }]);
            router.navigateByUrl('/team/22');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ , right:  ]');
            router.navigateByUrl('/team/33', { skipLocationChange: true });
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 33 [ , right:  ]');
        }));
        it('should skip location update when using NavigationExtras.skipLocationChange with navigate', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = testing_2.TestBed.createComponent(integration_helpers_1.RootCmp);
            yield (0, integration_helpers_1.advance)(fixture);
            router.resetConfig([{ path: 'team/:id', component: integration_helpers_1.TeamCmp }]);
            router.navigate(['/team/22']);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ , right:  ]');
            router.navigate(['/team/33'], { skipLocationChange: true });
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 33 [ , right:  ]');
        }));
        it('should navigate after navigation with skipLocationChange', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = testing_2.TestBed.createComponent(integration_helpers_1.RootCmpWithNamedOutlet);
            yield (0, integration_helpers_1.advance)(fixture);
            router.resetConfig([{ path: 'show', outlet: 'main', component: integration_helpers_1.SimpleCmp }]);
            router.navigate([{ outlets: { main: 'show' } }], { skipLocationChange: true });
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('main [simple]');
            router.navigate([{ outlets: { main: null } }], { skipLocationChange: true });
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('main []');
        }));
        it('should navigate back and forward', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'simple', component: integration_helpers_1.SimpleCmp },
                        { path: 'user/:name', component: integration_helpers_1.UserCmp },
                    ],
                },
            ]);
            let event;
            router.events.subscribe((e) => {
                if (e instanceof index_1.NavigationStart) {
                    event = e;
                }
            });
            router.navigateByUrl('/team/33/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/33/simple');
            const simpleNavStart = event;
            router.navigateByUrl('/team/22/user/victor');
            yield (0, integration_helpers_1.advance)(fixture);
            const userVictorNavStart = event;
            location.back();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/33/simple');
            (0, matchers_1.expect)(event.navigationTrigger).toEqual('popstate');
            (0, matchers_1.expect)(event.restoredState.navigationId).toEqual(simpleNavStart.id);
            location.forward();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/22/user/victor');
            (0, matchers_1.expect)(event.navigationTrigger).toEqual('popstate');
            (0, matchers_1.expect)(event.restoredState.navigationId).toEqual(userVictorNavStart.id);
        }));
        it('should navigate to the same url when config changes', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'a', component: integration_helpers_1.SimpleCmp }]);
            router.navigate(['/a']);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/a');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('simple');
            router.resetConfig([{ path: 'a', component: integration_helpers_1.RouteCmp }]);
            router.navigate(['/a']);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/a');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('route');
        }));
        it('should navigate when locations changes', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [{ path: 'user/:name', component: integration_helpers_1.UserCmp }],
                },
            ]);
            const recordedEvents = [];
            router.events.forEach((e) => (0, integration_helpers_1.onlyNavigationStartAndEnd)(e) && recordedEvents.push(e));
            router.navigateByUrl('/team/22/user/victor');
            yield (0, integration_helpers_1.advance)(fixture);
            location.go('/team/22/user/fedor');
            location.historyGo(0);
            yield (0, integration_helpers_1.advance)(fixture);
            location.go('/team/22/user/fedor');
            location.historyGo(0);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ user fedor, right:  ]');
            (0, integration_helpers_1.expectEvents)(recordedEvents, [
                [index_1.NavigationStart, '/team/22/user/victor'],
                [index_1.NavigationEnd, '/team/22/user/victor'],
                [index_1.NavigationStart, '/team/22/user/fedor'],
                [index_1.NavigationEnd, '/team/22/user/fedor'],
            ]);
        }));
        it('should update the location when the matched route does not change', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: '**', component: integration_helpers_1.CollectParamsCmp }]);
            router.navigateByUrl('/one/two');
            yield (0, integration_helpers_1.advance)(fixture);
            const cmp = fixture.debugElement.children[1].componentInstance;
            (0, matchers_1.expect)(location.path()).toEqual('/one/two');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('collect-params');
            (0, matchers_1.expect)(cmp.recordedUrls()).toEqual(['one/two']);
            router.navigateByUrl('/three/four');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/three/four');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('collect-params');
            (0, matchers_1.expect)(cmp.recordedUrls()).toEqual(['one/two', 'three/four']);
        }));
        it('should support secondary routes', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'user/:name', component: integration_helpers_1.UserCmp },
                        { path: 'simple', component: integration_helpers_1.SimpleCmp, outlet: 'right' },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/(user/victor//right:simple)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ user victor, right: simple ]');
        }));
        it('should support secondary routes in separate commands', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'user/:name', component: integration_helpers_1.UserCmp },
                        { path: 'simple', component: integration_helpers_1.SimpleCmp, outlet: 'right' },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/user/victor');
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigate(['team/22', { outlets: { right: 'simple' } }]);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ user victor, right: simple ]');
        }));
        it('should support secondary routes as child of empty path parent', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: '',
                    component: integration_helpers_1.TeamCmp,
                    children: [{ path: 'simple', component: integration_helpers_1.SimpleCmp, outlet: 'right' }],
                },
            ]);
            router.navigateByUrl('/(right:simple)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team  [ , right: simple ]');
        }));
        it('should deactivate outlets', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'user/:name', component: integration_helpers_1.UserCmp },
                        { path: 'simple', component: integration_helpers_1.SimpleCmp, outlet: 'right' },
                    ],
                },
            ]);
            router.navigateByUrl('/team/22/(user/victor//right:simple)');
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('/team/22/user/victor');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ user victor, right:  ]');
        }));
        it('should deactivate nested outlets', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'user/:name', component: integration_helpers_1.UserCmp },
                        { path: 'simple', component: integration_helpers_1.SimpleCmp, outlet: 'right' },
                    ],
                },
                { path: '', component: integration_helpers_1.BlankCmp },
            ]);
            router.navigateByUrl('/team/22/(user/victor//right:simple)');
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('/');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('');
        }));
        it('should set query params and fragment', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'query', component: integration_helpers_1.QueryParamsAndFragmentCmp }]);
            router.navigateByUrl('/query?name=1#fragment1');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('query: 1 fragment: fragment1');
            router.navigateByUrl('/query?name=2#fragment2');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('query: 2 fragment: fragment2');
        }));
        it('should handle empty or missing fragments', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'query', component: integration_helpers_1.QueryParamsAndFragmentCmp }]);
            router.navigateByUrl('/query#');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('query:  fragment: ');
            router.navigateByUrl('/query');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('query:  fragment: null');
        }));
        it('should ignore null and undefined query params', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'query', component: integration_helpers_1.EmptyQueryParamsCmp }]);
            router.navigate(['query'], { queryParams: { name: 1, age: null, page: undefined } });
            yield (0, integration_helpers_1.advance)(fixture);
            const cmp = fixture.debugElement.children[1].componentInstance;
            (0, matchers_1.expect)(cmp.recordedParams).toEqual([{ name: '1' }]);
        }));
        it('should push params only when they change', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [{ path: 'user/:name', component: integration_helpers_1.UserCmp }],
                },
            ]);
            router.navigateByUrl('/team/22/user/victor');
            yield (0, integration_helpers_1.advance)(fixture);
            const team = fixture.debugElement.children[1].componentInstance;
            const user = fixture.debugElement.children[1].children[1].componentInstance;
            (0, matchers_1.expect)(team.recordedParams).toEqual([{ id: '22' }]);
            (0, matchers_1.expect)(team.snapshotParams).toEqual([{ id: '22' }]);
            (0, matchers_1.expect)(user.recordedParams).toEqual([{ name: 'victor' }]);
            (0, matchers_1.expect)(user.snapshotParams).toEqual([{ name: 'victor' }]);
            router.navigateByUrl('/team/22/user/fedor');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(team.recordedParams).toEqual([{ id: '22' }]);
            (0, matchers_1.expect)(team.snapshotParams).toEqual([{ id: '22' }]);
            (0, matchers_1.expect)(user.recordedParams).toEqual([{ name: 'victor' }, { name: 'fedor' }]);
            (0, matchers_1.expect)(user.snapshotParams).toEqual([{ name: 'victor' }, { name: 'fedor' }]);
        }));
        it('should work when navigating to /', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: '', pathMatch: 'full', component: integration_helpers_1.SimpleCmp },
                { path: 'user/:name', component: integration_helpers_1.UserCmp },
            ]);
            router.navigateByUrl('/user/victor');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('user victor');
            router.navigateByUrl('/');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('simple');
        }));
        it('should cancel in-flight navigations', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'user/:name', component: integration_helpers_1.UserCmp }]);
            const recordedEvents = [];
            router.events.forEach((e) => recordedEvents.push(e));
            router.navigateByUrl('/user/init');
            yield (0, integration_helpers_1.advance)(fixture);
            const user = fixture.debugElement.children[1].componentInstance;
            let r1, r2;
            router.navigateByUrl('/user/victor').then((_) => (r1 = _));
            router.navigateByUrl('/user/fedor').then((_) => (r2 = _));
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(r1).toEqual(false); // returns false because it was canceled
            (0, matchers_1.expect)(r2).toEqual(true); // returns true because it was successful
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('user fedor');
            (0, matchers_1.expect)(user.recordedParams).toEqual([{ name: 'init' }, { name: 'fedor' }]);
            (0, integration_helpers_1.expectEvents)(recordedEvents, [
                [index_1.NavigationStart, '/user/init'],
                [index_1.RoutesRecognized, '/user/init'],
                [index_1.GuardsCheckStart, '/user/init'],
                [index_1.ChildActivationStart],
                [index_1.ActivationStart],
                [index_1.GuardsCheckEnd, '/user/init'],
                [index_1.ResolveStart, '/user/init'],
                [index_1.ResolveEnd, '/user/init'],
                [index_1.ActivationEnd],
                [index_1.ChildActivationEnd],
                [index_1.NavigationEnd, '/user/init'],
                [index_1.NavigationStart, '/user/victor'],
                [index_1.NavigationCancel, '/user/victor'],
                [index_1.NavigationStart, '/user/fedor'],
                [index_1.RoutesRecognized, '/user/fedor'],
                [index_1.GuardsCheckStart, '/user/fedor'],
                [index_1.ChildActivationStart],
                [index_1.ActivationStart],
                [index_1.GuardsCheckEnd, '/user/fedor'],
                [index_1.ResolveStart, '/user/fedor'],
                [index_1.ResolveEnd, '/user/fedor'],
                [index_1.ActivationEnd],
                [index_1.ChildActivationEnd],
                [index_1.NavigationEnd, '/user/fedor'],
            ]);
        }));
        it('should properly set currentNavigation when cancelling in-flight navigations', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'user/:name', component: integration_helpers_1.UserCmp }]);
            router.navigateByUrl('/user/init');
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('/user/victor');
            (0, matchers_1.expect)(router.getCurrentNavigation()).not.toBe(null);
            router.navigateByUrl('/user/fedor');
            // Due to https://github.com/angular/angular/issues/29389, this would be `false`
            // when running a second navigation.
            (0, matchers_1.expect)(router.getCurrentNavigation()).not.toBe(null);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(router.getCurrentNavigation()).toBe(null);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('user fedor');
        }));
        it('should replace state when path is equal to current path', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.TeamCmp,
                    children: [
                        { path: 'simple', component: integration_helpers_1.SimpleCmp },
                        { path: 'user/:name', component: integration_helpers_1.UserCmp },
                    ],
                },
            ]);
            router.navigateByUrl('/team/33/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('/team/22/user/victor');
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('/team/22/user/victor');
            yield (0, integration_helpers_1.advance)(fixture);
            location.back();
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/33/simple');
        }));
        it('should handle componentless paths', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmpWithTwoOutlets);
            router.resetConfig([
                {
                    path: 'parent/:id',
                    children: [
                        { path: 'simple', component: integration_helpers_1.SimpleCmp },
                        { path: 'user/:name', component: integration_helpers_1.UserCmp, outlet: 'right' },
                    ],
                },
                { path: 'user/:name', component: integration_helpers_1.UserCmp },
            ]);
            // navigate to a componentless route
            router.navigateByUrl('/parent/11/(simple//right:user/victor)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/parent/11/(simple//right:user/victor)');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('primary [simple] right [user victor]');
            // navigate to the same route with different params (reuse)
            router.navigateByUrl('/parent/22/(simple//right:user/fedor)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/parent/22/(simple//right:user/fedor)');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('primary [simple] right [user fedor]');
            // navigate to a normal route (check deactivation)
            router.navigateByUrl('/user/victor');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/user/victor');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('primary [user victor] right []');
            // navigate back to a componentless route
            router.navigateByUrl('/parent/11/(simple//right:user/victor)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/parent/11/(simple//right:user/victor)');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('primary [simple] right [user victor]');
        }));
        it('should not deactivate aux routes when navigating from a componentless routes', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const location = testing_2.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.TwoOutletsCmp);
            router.resetConfig([
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
                { path: 'componentless', children: [{ path: 'simple', component: integration_helpers_1.SimpleCmp }] },
                { path: 'user/:name', outlet: 'aux', component: integration_helpers_1.UserCmp },
            ]);
            router.navigateByUrl('/componentless/simple(aux:user/victor)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/componentless/simple(aux:user/victor)');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('[ simple, aux: user victor ]');
            router.navigateByUrl('/simple(aux:user/victor)');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/simple(aux:user/victor)');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('[ simple, aux: user victor ]');
        }));
        it('should emit an event when an outlet gets activated', () => __awaiter(void 0, void 0, void 0, function* () {
            let Container = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        selector: 'container',
                        template: `<router-outlet (activate)="recordActivate($event)" (deactivate)="recordDeactivate($event)"></router-outlet>`,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Container = _classThis = class {
                    constructor() {
                        this.activations = [];
                        this.deactivations = [];
                    }
                    recordActivate(component) {
                        this.activations.push(component);
                    }
                    recordDeactivate(component) {
                        this.deactivations.push(component);
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
            testing_2.TestBed.configureTestingModule({ declarations: [Container] });
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, Container);
            const cmp = fixture.componentInstance;
            router.resetConfig([
                { path: 'blank', component: integration_helpers_1.BlankCmp },
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
            ]);
            cmp.activations = [];
            cmp.deactivations = [];
            router.navigateByUrl('/blank');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(cmp.activations.length).toEqual(1);
            (0, matchers_1.expect)(cmp.activations[0] instanceof integration_helpers_1.BlankCmp).toBe(true);
            router.navigateByUrl('/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(cmp.activations.length).toEqual(2);
            (0, matchers_1.expect)(cmp.activations[1] instanceof integration_helpers_1.SimpleCmp).toBe(true);
            (0, matchers_1.expect)(cmp.deactivations.length).toEqual(1);
            (0, matchers_1.expect)(cmp.deactivations[0] instanceof integration_helpers_1.BlankCmp).toBe(true);
        }));
        it('should update url and router state before activating components', () => __awaiter(void 0, void 0, void 0, function* () {
            const router = testing_2.TestBed.inject(index_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([{ path: 'cmp', component: integration_helpers_1.ComponentRecordingRoutePathAndUrl }]);
            router.navigateByUrl('/cmp');
            yield (0, integration_helpers_1.advance)(fixture);
            const cmp = fixture.debugElement.children[1].componentInstance;
            (0, matchers_1.expect)(cmp.url).toBe('/cmp');
            (0, matchers_1.expect)(cmp.path.length).toEqual(2);
        }));
        (0, navigation_errors_spec_1.navigationErrorsIntegrationSuite)();
        (0, eager_url_update_strategy_spec_1.eagerUrlUpdateStrategyIntegrationSuite)();
        (0, duplicate_in_flight_navigations_spec_1.duplicateInFlightNavigationsIntegrationSuite)();
        (0, navigation_spec_1.navigationIntegrationTestSuite)();
        (0, route_data_spec_1.routeDataIntegrationSuite)();
        (0, router_links_spec_1.routerLinkIntegrationSpec)();
        (0, redirects_spec_1.redirectsIntegrationSuite)();
        (0, guards_spec_1.guardsIntegrationSuite)();
        (0, router_events_spec_1.routerEventsIntegrationSuite)();
        (0, router_link_active_spec_1.routerLinkActiveIntegrationSuite)();
        (0, lazy_loading_spec_1.lazyLoadingIntegrationSuite)();
        (0, route_reuse_strategy_spec_1.routeReuseIntegrationSuite)();
    });
}
