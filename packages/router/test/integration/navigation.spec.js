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
exports.navigationIntegrationTestSuite = navigationIntegrationTestSuite;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const testing_1 = require("@angular/core/testing");
const src_1 = require("../../src");
const integration_helpers_1 = require("./integration_helpers");
const rxjs_1 = require("rxjs");
const testing_2 = require("@angular/router/testing");
const helpers_1 = require("../helpers");
function navigationIntegrationTestSuite() {
    describe('navigation', () => {
        it('should navigate to the current URL', () => __awaiter(this, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ onSameUrlNavigation: 'reload' }))],
            });
            const router = testing_1.TestBed.inject(src_1.Router);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
            ]);
            const events = [];
            router.events.subscribe((e) => (0, integration_helpers_1.onlyNavigationStartAndEnd)(e) && events.push(e));
            router.navigateByUrl('/simple');
            yield (0, helpers_1.timeout)();
            router.navigateByUrl('/simple');
            yield (0, helpers_1.timeout)();
            (0, integration_helpers_1.expectEvents)(events, [
                [src_1.NavigationStart, '/simple'],
                [src_1.NavigationEnd, '/simple'],
                [src_1.NavigationStart, '/simple'],
                [src_1.NavigationEnd, '/simple'],
            ]);
        }));
        it('should override default onSameUrlNavigation with extras', () => __awaiter(this, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ onSameUrlNavigation: 'ignore' }))],
            });
            const router = testing_1.TestBed.inject(src_1.Router);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
            ]);
            const events = [];
            router.events.subscribe((e) => (0, integration_helpers_1.onlyNavigationStartAndEnd)(e) && events.push(e));
            yield router.navigateByUrl('/simple');
            yield router.navigateByUrl('/simple');
            // By default, the second navigation is ignored
            (0, integration_helpers_1.expectEvents)(events, [
                [src_1.NavigationStart, '/simple'],
                [src_1.NavigationEnd, '/simple'],
            ]);
            yield router.navigateByUrl('/simple', { onSameUrlNavigation: 'reload' });
            // We overrode the `onSameUrlNavigation` value. This navigation should be processed.
            (0, integration_helpers_1.expectEvents)(events, [
                [src_1.NavigationStart, '/simple'],
                [src_1.NavigationEnd, '/simple'],
                [src_1.NavigationStart, '/simple'],
                [src_1.NavigationEnd, '/simple'],
            ]);
        }));
        it('should override default onSameUrlNavigation with extras', () => __awaiter(this, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ onSameUrlNavigation: 'reload' }))],
            });
            const router = testing_1.TestBed.inject(src_1.Router);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
            ]);
            const events = [];
            router.events.subscribe((e) => (0, integration_helpers_1.onlyNavigationStartAndEnd)(e) && events.push(e));
            yield router.navigateByUrl('/simple');
            yield router.navigateByUrl('/simple');
            (0, integration_helpers_1.expectEvents)(events, [
                [src_1.NavigationStart, '/simple'],
                [src_1.NavigationEnd, '/simple'],
                [src_1.NavigationStart, '/simple'],
                [src_1.NavigationEnd, '/simple'],
            ]);
            events.length = 0;
            yield router.navigateByUrl('/simple', { onSameUrlNavigation: 'ignore' });
            (0, integration_helpers_1.expectEvents)(events, []);
        }));
        it('should set transient navigation info', () => __awaiter(this, void 0, void 0, function* () {
            let observedInfo;
            const router = testing_1.TestBed.inject(src_1.Router);
            router.resetConfig([
                {
                    path: 'simple',
                    component: integration_helpers_1.SimpleCmp,
                    canActivate: [
                        () => {
                            var _a, _b;
                            observedInfo = (_b = (_a = (0, core_1.inject)(src_1.Router).getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.extras) === null || _b === void 0 ? void 0 : _b.info;
                            return true;
                        },
                    ],
                },
            ]);
            yield router.navigateByUrl('/simple', { info: 'navigation info' });
            expect(observedInfo).toEqual('navigation info');
        }));
        it('should set transient navigation info for routerlink', () => __awaiter(this, void 0, void 0, function* () {
            let observedInfo;
            const router = testing_1.TestBed.inject(src_1.Router);
            router.resetConfig([
                {
                    path: 'simple',
                    component: integration_helpers_1.SimpleCmp,
                    canActivate: [
                        () => {
                            var _a, _b;
                            observedInfo = (_b = (_a = (0, core_1.inject)(src_1.Router).getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.extras) === null || _b === void 0 ? void 0 : _b.info;
                            return true;
                        },
                    ],
                },
            ]);
            let App = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        imports: [src_1.RouterLink],
                        template: `<a #simpleLink [routerLink]="'/simple'" [info]="simpleLink"></a>`,
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
            const fixture = testing_1.TestBed.createComponent(App);
            fixture.autoDetectChanges();
            const anchor = fixture.nativeElement.querySelector('a');
            anchor.click();
            yield fixture.whenStable();
            // An example use-case might be to pass the clicked link along with the navigation
            // information
            expect(observedInfo).toBeInstanceOf(HTMLAnchorElement);
        }));
        it('should make transient navigation info available in redirect', () => __awaiter(this, void 0, void 0, function* () {
            let observedInfo;
            const router = testing_1.TestBed.inject(src_1.Router);
            router.resetConfig([
                {
                    path: 'redirect',
                    component: integration_helpers_1.SimpleCmp,
                    canActivate: [() => (0, core_1.inject)(src_1.Router).parseUrl('/simple')],
                },
                {
                    path: 'simple',
                    component: integration_helpers_1.SimpleCmp,
                    canActivate: [
                        () => {
                            var _a, _b;
                            observedInfo = (_b = (_a = (0, core_1.inject)(src_1.Router).getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.extras) === null || _b === void 0 ? void 0 : _b.info;
                            return true;
                        },
                    ],
                },
            ]);
            yield router.navigateByUrl('/redirect', { info: 'navigation info' });
            expect(observedInfo).toBe('navigation info');
            expect(router.url).toEqual('/simple');
        }));
        it('should ignore empty paths in relative links', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            router.resetConfig([
                {
                    path: 'foo',
                    children: [{ path: 'bar', children: [{ path: '', component: integration_helpers_1.RelativeLinkCmp }] }],
                },
            ]);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.navigateByUrl('/foo/bar');
            yield (0, integration_helpers_1.advance)(fixture);
            const link = fixture.nativeElement.querySelector('a');
            expect(link.getAttribute('href')).toEqual('/foo/simple');
        }));
        it('should set the restoredState to null when executing imperative navigations', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
            ]);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            let event;
            router.events.subscribe((e) => {
                if (e instanceof src_1.NavigationStart) {
                    event = e;
                }
            });
            router.navigateByUrl('/simple');
            yield (0, helpers_1.timeout)();
            expect(event.navigationTrigger).toEqual('imperative');
            expect(event.restoredState).toEqual(null);
        }));
        it('should set history.state if passed using imperative navigation', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
            ]);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            let navigation = null;
            router.events.subscribe((e) => {
                if (e instanceof src_1.NavigationStart) {
                    navigation = router.getCurrentNavigation();
                }
            });
            router.navigateByUrl('/simple', { state: { foo: 'bar' } });
            yield (0, helpers_1.timeout)();
            const state = location.getState();
            expect(state.foo).toBe('bar');
            expect(state).toEqual({ foo: 'bar', navigationId: 2 });
            expect(navigation.extras.state).toBeDefined();
            expect(navigation.extras.state).toEqual({ foo: 'bar' });
        }));
        it('should set history.state when navigation with browser back and forward', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
            ]);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            let navigation = null;
            router.events.subscribe((e) => {
                if (e instanceof src_1.NavigationStart) {
                    navigation = router.getCurrentNavigation();
                }
            });
            let state = { foo: 'bar' };
            router.navigateByUrl('/simple', { state });
            yield (0, helpers_1.timeout)();
            location.back();
            yield (0, helpers_1.timeout)();
            location.forward();
            yield (0, helpers_1.timeout)();
            expect(navigation.extras.state).toBeDefined();
            expect(navigation.extras.state).toEqual(state);
            // Manually set state rather than using navigate()
            state = { bar: 'foo' };
            location.replaceState(location.path(), '', state);
            location.back();
            yield (0, helpers_1.timeout)();
            location.forward();
            yield (0, helpers_1.timeout)();
            expect(navigation.extras.state).toBeDefined();
            expect(navigation.extras.state).toEqual(state);
        }));
        it('should navigate correctly when using `Location#historyGo', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: 'first', component: integration_helpers_1.SimpleCmp },
                { path: 'second', component: integration_helpers_1.SimpleCmp },
            ]);
            yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.navigateByUrl('/first');
            yield (0, helpers_1.timeout)();
            router.navigateByUrl('/second');
            yield (0, helpers_1.timeout)();
            expect(router.url).toEqual('/second');
            location.historyGo(-1);
            yield (0, helpers_1.timeout)();
            expect(router.url).toEqual('/first');
            location.historyGo(1);
            yield (0, helpers_1.timeout)();
            expect(router.url).toEqual('/second');
            location.historyGo(-100);
            yield (0, helpers_1.timeout)();
            expect(router.url).toEqual('/second');
            location.historyGo(100);
            yield (0, helpers_1.timeout)();
            expect(router.url).toEqual('/second');
            location.historyGo(0);
            yield (0, helpers_1.timeout)();
            expect(router.url).toEqual('/second');
            location.historyGo();
            yield (0, helpers_1.timeout)();
            expect(router.url).toEqual('/second');
        }));
        it('should not error if state is not {[key: string]: any}', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
            ]);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            let navigation = null;
            router.events.subscribe((e) => {
                if (e instanceof src_1.NavigationStart) {
                    navigation = router.getCurrentNavigation();
                }
            });
            location.replaceState('', '', 42);
            router.navigateByUrl('/simple');
            yield (0, helpers_1.timeout)();
            location.back();
            yield (0, integration_helpers_1.advance)(fixture);
            // Angular does not support restoring state to the primitive.
            expect(navigation.extras.state).toEqual(undefined);
            expect(location.getState()).toEqual({ navigationId: 3 });
        }));
        it('should not pollute browser history when replaceUrl is set to true', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'a', component: integration_helpers_1.SimpleCmp },
                { path: 'b', component: integration_helpers_1.SimpleCmp },
            ]);
            yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            const replaceSpy = spyOn(location, 'replaceState');
            router.navigateByUrl('/a', { replaceUrl: true });
            router.navigateByUrl('/b', { replaceUrl: true });
            yield (0, helpers_1.timeout)();
            expect(replaceSpy.calls.count()).toEqual(1);
        }));
        it('should skip navigation if another navigation is already scheduled', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'a', component: integration_helpers_1.SimpleCmp },
                { path: 'b', component: integration_helpers_1.SimpleCmp },
            ]);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.navigate(['/a'], {
                queryParams: { a: true },
                queryParamsHandling: 'merge',
                replaceUrl: true,
            });
            router.navigate(['/b'], {
                queryParams: { b: true },
                queryParamsHandling: 'merge',
                replaceUrl: true,
            });
            yield (0, helpers_1.timeout)();
            /**
             * Why do we have '/b?b=true' and not '/b?a=true&b=true'?
             *
             * This is because the router has the right to stop a navigation mid-flight if another
             * navigation has been already scheduled. This is why we can use a top-level guard
             * to perform redirects. Calling `navigate` in such a guard will stop the navigation, and
             * the components won't be instantiated.
             *
             * This is a fundamental property of the router: it only cares about its latest state.
             *
             * This means that components should only map params to something else, not reduce them.
             * In other words, the following component is asking for trouble:
             *
             * ```
             * class MyComponent {
             *  constructor(a: ActivatedRoute) {
             *    a.params.scan(...)
             *  }
             * }
             * ```
             *
             * This also means "queryParamsHandling: 'merge'" should only be used to merge with
             * long-living query parameters (e.g., debug).
             */
            expect(router.url).toEqual('/b?b=true');
        }));
    });
    describe('should execute navigations serially', () => {
        let log = [];
        beforeEach(() => {
            log = [];
        });
        describe('route activation', () => {
            let Parent = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: '<router-outlet></router-outlet>',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Parent = _classThis = class {
                    constructor(route) {
                        route.params.subscribe((s) => {
                            log.push(s);
                        });
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
            let NamedOutletHost = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: `
         <router-outlet (deactivate)="logDeactivate('primary')"></router-outlet>
         <router-outlet name="first" (deactivate)="logDeactivate('first')"></router-outlet>
         <router-outlet name="second" (deactivate)="logDeactivate('second')"></router-outlet>
         `,
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var NamedOutletHost = _classThis = class {
                    logDeactivate(route) {
                        log.push(route + ' deactivate');
                    }
                };
                __setFunctionName(_classThis, "NamedOutletHost");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    NamedOutletHost = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return NamedOutletHost = _classThis;
            })();
            let Child1 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'child1',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child1 = _classThis = class {
                    constructor() {
                        log.push('child1 constructor');
                    }
                    ngOnDestroy() {
                        log.push('child1 destroy');
                    }
                };
                __setFunctionName(_classThis, "Child1");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child1 = _classThis;
            })();
            let Child2 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'child2',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child2 = _classThis = class {
                    constructor() {
                        log.push('child2 constructor');
                    }
                    ngOnDestroy() {
                        log.push('child2 destroy');
                    }
                };
                __setFunctionName(_classThis, "Child2");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child2 = _classThis;
            })();
            let Child3 = (() => {
                let _classDecorators = [(0, core_1.Component)({
                        template: 'child3',
                        standalone: false,
                    })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Child3 = _classThis = class {
                    constructor() {
                        log.push('child3 constructor');
                    }
                    ngOnDestroy() {
                        log.push('child3 destroy');
                    }
                };
                __setFunctionName(_classThis, "Child3");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Child3 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Child3 = _classThis;
            })();
            let TestModule = (() => {
                let _classDecorators = [(0, core_1.NgModule)({
                        declarations: [Parent, NamedOutletHost, Child1, Child2, Child3],
                        imports: [src_1.RouterModule.forRoot([])],
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
            it('should advance the parent route after deactivating its children', () => __awaiter(this, void 0, void 0, function* () {
                testing_1.TestBed.configureTestingModule({ imports: [TestModule] });
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'parent/:id',
                        component: Parent,
                        children: [
                            { path: 'child1', component: Child1 },
                            { path: 'child2', component: Child2 },
                        ],
                    },
                ]);
                router.navigateByUrl('/parent/1/child1');
                yield (0, integration_helpers_1.advance)(fixture);
                router.navigateByUrl('/parent/2/child2');
                yield (0, integration_helpers_1.advance)(fixture);
                expect(location.path()).toEqual('/parent/2/child2');
                expect(log).toEqual([
                    { id: '1' },
                    'child1 constructor',
                    'child1 destroy',
                    { id: '2' },
                    'child2 constructor',
                ]);
            }));
            it('should deactivate outlet children with componentless parent', () => __awaiter(this, void 0, void 0, function* () {
                testing_1.TestBed.configureTestingModule({ imports: [TestModule] });
                const router = testing_1.TestBed.inject(src_1.Router);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'named-outlets',
                        component: NamedOutletHost,
                        children: [
                            {
                                path: 'home',
                                children: [
                                    { path: '', component: Child1, outlet: 'first' },
                                    { path: '', component: Child2, outlet: 'second' },
                                    { path: 'primary', component: Child3 },
                                ],
                            },
                            {
                                path: 'about',
                                children: [
                                    { path: '', component: Child1, outlet: 'first' },
                                    { path: '', component: Child2, outlet: 'second' },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'other',
                        component: Parent,
                    },
                ]);
                router.navigateByUrl('/named-outlets/home/primary');
                yield (0, integration_helpers_1.advance)(fixture);
                expect(log).toEqual([
                    'child3 constructor', // primary outlet always first
                    'child1 constructor',
                    'child2 constructor',
                ]);
                log.length = 0;
                router.navigateByUrl('/named-outlets/about');
                yield (0, integration_helpers_1.advance)(fixture);
                expect(log).toEqual([
                    'child3 destroy',
                    'primary deactivate',
                    'child1 destroy',
                    'first deactivate',
                    'child2 destroy',
                    'second deactivate',
                    'child1 constructor',
                    'child2 constructor',
                ]);
                log.length = 0;
                router.navigateByUrl('/other');
                yield (0, integration_helpers_1.advance)(fixture);
                expect(log).toEqual([
                    'child1 destroy',
                    'first deactivate',
                    'child2 destroy',
                    'second deactivate',
                    // route param subscription from 'Parent' component
                    {},
                ]);
            }));
            it('should work between aux outlets under two levels of empty path parents', () => __awaiter(this, void 0, void 0, function* () {
                testing_1.TestBed.configureTestingModule({ imports: [TestModule] });
                const router = testing_1.TestBed.inject(src_1.Router);
                router.resetConfig([
                    {
                        path: '',
                        children: [
                            {
                                path: '',
                                component: NamedOutletHost,
                                children: [
                                    { path: 'one', component: Child1, outlet: 'first' },
                                    { path: 'two', component: Child2, outlet: 'first' },
                                ],
                            },
                        ],
                    },
                ]);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.navigateByUrl('/(first:one)');
                yield (0, integration_helpers_1.advance)(fixture);
                expect(log).toEqual(['child1 constructor']);
                log.length = 0;
                router.navigateByUrl('/(first:two)');
                yield (0, integration_helpers_1.advance)(fixture);
                expect(log).toEqual(['child1 destroy', 'first deactivate', 'child2 constructor']);
            }));
        });
        it('should not wait for prior navigations to start a new navigation', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            const trueRightAway = () => {
                log.push('trueRightAway');
                return true;
            };
            const trueIn2Seconds = () => {
                log.push('trueIn2Seconds-start');
                return new Promise((res) => {
                    setTimeout(() => {
                        log.push('trueIn2Seconds-end');
                        res(true);
                    }, 20);
                });
            };
            router.resetConfig([
                { path: 'a', component: integration_helpers_1.SimpleCmp, canActivate: [trueRightAway, trueIn2Seconds] },
                { path: 'b', component: integration_helpers_1.SimpleCmp, canActivate: [trueRightAway, trueIn2Seconds] },
            ]);
            router.navigateByUrl('/a');
            yield (0, helpers_1.timeout)(1);
            fixture.detectChanges();
            router.navigateByUrl('/b');
            yield (0, helpers_1.timeout)(1); // 2
            fixture.detectChanges();
            expect(log).toEqual([
                'trueRightAway',
                'trueIn2Seconds-start',
                'trueRightAway',
                'trueIn2Seconds-start',
            ]);
            yield (0, helpers_1.timeout)(20); // 22
            fixture.detectChanges();
            expect(log).toEqual([
                'trueRightAway',
                'trueIn2Seconds-start',
                'trueRightAway',
                'trueIn2Seconds-start',
                'trueIn2Seconds-end',
                'trueIn2Seconds-end',
            ]);
        }));
    });
    describe('abort an ongoing navigation', () => {
        let router;
        function setup(routes) {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, src_1.provideRouter)(routes !== null && routes !== void 0 ? routes : [
                        {
                            path: '**',
                            component: class {
                            },
                        },
                    ]),
                ],
            });
            router = testing_1.TestBed.inject(src_1.Router);
        }
        it('resolves the promise, clears current navigation, and send NavigationCancel', () => __awaiter(this, void 0, void 0, function* () {
            setup();
            const replay = new rxjs_1.BehaviorSubject(null);
            router.events.subscribe(replay);
            const navigationPromise = router.navigateByUrl('a');
            router.getCurrentNavigation().abort();
            expect(router.getCurrentNavigation()).toBe(null);
            yield expectAsync(navigationPromise).toBeResolvedTo(false);
            expect(replay.value).toBeInstanceOf(src_1.NavigationCancel);
        }));
        it('does not result in errors if the navigation enters activation stage or has finished', () => __awaiter(this, void 0, void 0, function* () {
            let Aborting = (() => {
                let _classDecorators = [(0, core_1.Component)({ template: '' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var Aborting = _classThis = class {
                    constructor() {
                        (0, core_1.inject)(src_1.Router).getCurrentNavigation().abort();
                    }
                };
                __setFunctionName(_classThis, "Aborting");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    Aborting = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return Aborting = _classThis;
            })();
            setup([{ path: '**', component: Aborting }]);
            const events = [];
            router.events.subscribe({ next: (e) => void events.push(e) });
            const navigationPromise = (yield testing_2.RouterTestingHarness.create()).navigateByUrl('/abc');
            const navigation = router.getCurrentNavigation();
            yield navigationPromise;
            expect(events.at(-1)).toBeInstanceOf(src_1.NavigationEnd);
            expect(events.some((e) => e instanceof src_1.NavigationCancel)).toBeFalse();
            expect(events.some((e) => e instanceof src_1.NavigationError)).toBeFalse();
            expect(router.url).toEqual('/abc');
            // Aborting after navigation complete does not result in new events or errors
            const currentEventsLength = events.length;
            navigation.abort();
            navigation.abort();
            navigation.abort();
            navigation.abort();
            expect(events.length).toEqual(currentEventsLength);
        }));
        it('does not result in errors if the navigation enters navigation already canceled from guards', () => __awaiter(this, void 0, void 0, function* () {
            setup([{ path: '**', component: class {
                    }, canActivate: [() => false] }]);
            const events = [];
            router.events.subscribe({ next: (e) => void events.push(e) });
            const navigationPromise = router.navigateByUrl('/abc');
            const navigation = router.getCurrentNavigation();
            yield navigationPromise;
            expect(events.at(-1)).toBeInstanceOf(src_1.NavigationCancel);
            // Aborting after navigation complete does not result in new events or errors
            const currentEventsLength = events.length;
            navigation.abort();
            navigation.abort();
            navigation.abort();
            navigation.abort();
            expect(events.length).toEqual(currentEventsLength);
        }));
        it('does not result in double cancellation if activate guard aborts and returns', () => __awaiter(this, void 0, void 0, function* () {
            setup([
                {
                    path: '**',
                    component: class {
                    },
                    canActivate: [
                        () => {
                            (0, core_1.inject)(src_1.Router).getCurrentNavigation().abort();
                            return false;
                        },
                    ],
                },
            ]);
            const events = [];
            router.events.subscribe({ next: (e) => void events.push(e) });
            yield router.navigateByUrl('/abc');
            expect(events.at(-2)).toBeInstanceOf(src_1.ActivationStart);
            expect(events.at(-1)).toBeInstanceOf(src_1.NavigationCancel);
        }));
        it('does not result in double cancellation if match guard aborts and returns', () => __awaiter(this, void 0, void 0, function* () {
            setup([
                {
                    path: '**',
                    component: class {
                    },
                    canMatch: [
                        () => {
                            (0, core_1.inject)(src_1.Router).getCurrentNavigation().abort();
                            return false;
                        },
                    ],
                },
            ]);
            const events = [];
            router.events.subscribe({ next: (e) => void events.push(e) });
            yield router.navigateByUrl('/abc');
            expect(events.length).toBe(2);
            expect(events[0]).toBeInstanceOf(src_1.NavigationStart);
            expect(events[1]).toBeInstanceOf(src_1.NavigationCancel);
        }));
        it('does not result in cancelation if the navigation was already redirected', () => __awaiter(this, void 0, void 0, function* () {
            setup([
                {
                    path: 'initial',
                    component: class {
                    },
                    canActivate: [() => new src_1.RedirectCommand(router.parseUrl('/other'))],
                },
                {
                    path: 'other',
                    component: class {
                    },
                },
            ]);
            const events = [];
            router.events.subscribe({ next: (e) => void events.push(e) });
            const navigationPromise = router.navigateByUrl('/initial');
            const navigation = router.getCurrentNavigation();
            // wait for NavigationStart from the redirecting navigation
            yield (0, rxjs_1.firstValueFrom)(router.events.pipe((0, rxjs_1.filter)((e) => e instanceof src_1.NavigationStart)));
            // abort the original navigation
            navigation.abort();
            yield navigationPromise;
            expect(events.at(-1)).toBeInstanceOf(src_1.NavigationEnd);
            expect(router.url).toEqual('/other');
            const cancellations = events.filter((e) => e instanceof src_1.NavigationCancel);
            expect(cancellations.length).toBe(1);
            expect(cancellations[0].code).toEqual(src_1.NavigationCancellationCode.Redirect);
            expect(events.some((e) => e instanceof src_1.NavigationError)).toBeFalse();
        }));
        it('can abort in while guards are executing and prevents later guards and resolvers from running', () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let canActivateCalled = false;
            let resolveCalled = false;
            setup([
                {
                    path: '**',
                    canMatch: [() => new Promise(() => { })],
                    component: class {
                    },
                    canActivate: [
                        () => {
                            canActivateCalled = true;
                        },
                    ],
                    resolve: {
                        someData: () => {
                            resolveCalled = true;
                        },
                    },
                },
            ]);
            const events = [];
            router.events.subscribe({ next: (e) => void events.push(e) });
            const navigationPromise = router.navigateByUrl('/abc123');
            // wait one macrotask to ensure we're in the canMatch guard
            yield new Promise((resolve) => setTimeout(resolve));
            (_a = router.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.abort();
            expect(events.at(-1)).toBeInstanceOf(src_1.NavigationCancel);
            yield expectAsync(navigationPromise).toBeResolvedTo(false);
            expect(canActivateCalled).toBe(false);
            expect(resolveCalled).toBe(false);
        }));
    });
}
