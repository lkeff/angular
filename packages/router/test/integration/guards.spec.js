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
exports.guardsIntegrationSuite = guardsIntegrationSuite;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const src_1 = require("../../src");
const collection_1 = require("../../src/utils/collection");
const testing_2 = require("../../testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const integration_helpers_1 = require("./integration_helpers");
const helpers_1 = require("../helpers");
function guardsIntegrationSuite() {
    describe('guards', () => {
        describe('CanActivate', () => {
            describe('guard completes before emitting a value', () => {
                let CompletesBeforeEmitting = (() => {
                    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var CompletesBeforeEmitting = _classThis = class {
                        constructor(destroyRef) {
                            this.subject$ = new rxjs_1.Subject();
                            destroyRef.onDestroy(() => this.subject$.complete());
                        }
                        // Note that this is a simple illustrative case of when an observable
                        // completes without emitting a value. In a real-world scenario, this
                        // might represent an HTTP request that never emits before the app is
                        // destroyed and then completes when the app is destroyed.
                        canActivate(route, state) {
                            return this.subject$;
                        }
                    };
                    __setFunctionName(_classThis, "CompletesBeforeEmitting");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        CompletesBeforeEmitting = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return CompletesBeforeEmitting = _classThis;
                })();
                it('should not thrown an unhandled promise rejection', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    const onUnhandledrejection = jasmine.createSpy();
                    window.addEventListener('unhandledrejection', onUnhandledrejection);
                    router.resetConfig([
                        { path: 'team/:id', component: integration_helpers_1.TeamCmp, canActivate: [CompletesBeforeEmitting] },
                    ]);
                    router.navigateByUrl('/team/22');
                    // This was previously throwing an error `NG0205: Injector has already been destroyed`.
                    fixture.destroy();
                    // Wait until the event task is dispatched.
                    yield new Promise((resolve) => setTimeout(resolve, 10));
                    window.removeEventListener('unhandledrejection', onUnhandledrejection);
                    (0, matchers_1.expect)(onUnhandledrejection).not.toHaveBeenCalled();
                }));
            });
            describe('should not activate a route when CanActivate returns false', () => {
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    const recordedEvents = [];
                    router.events.forEach((e) => recordedEvents.push(e));
                    router.resetConfig([{ path: 'team/:id', component: integration_helpers_1.TeamCmp, canActivate: [() => false] }]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('');
                    (0, integration_helpers_1.expectEvents)(recordedEvents, [
                        [src_1.NavigationStart, '/team/22'],
                        [src_1.RoutesRecognized, '/team/22'],
                        [src_1.GuardsCheckStart, '/team/22'],
                        [src_1.ChildActivationStart],
                        [src_1.ActivationStart],
                        [src_1.GuardsCheckEnd, '/team/22'],
                        [src_1.NavigationCancel, '/team/22'],
                    ]);
                    (0, matchers_1.expect)(recordedEvents[5].shouldActivate).toBe(false);
                }));
            });
            describe('should not activate a route when CanActivate returns false (componentless route)', () => {
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'parent',
                            canActivate: [() => false],
                            children: [{ path: 'team/:id', component: integration_helpers_1.TeamCmp }],
                        },
                    ]);
                    router.navigateByUrl('parent/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('');
                }));
            });
            describe('should activate a route when CanActivate returns true', () => {
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([{ path: 'team/:id', component: integration_helpers_1.TeamCmp, canActivate: [() => true] }]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                }));
            });
            describe('should work when given a class', () => {
                class AlwaysTrue {
                    canActivate(route, state) {
                        return true;
                    }
                }
                beforeEach(() => {
                    testing_1.TestBed.configureTestingModule({ providers: [AlwaysTrue] });
                });
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([{ path: 'team/:id', component: integration_helpers_1.TeamCmp, canActivate: [AlwaysTrue] }]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                }));
            });
            describe('should work when returns an observable', () => {
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'team/:id',
                            component: integration_helpers_1.TeamCmp,
                            canActivate: [
                                () => new rxjs_1.Observable((observer) => {
                                    observer.next(false);
                                }),
                            ],
                        },
                    ]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('');
                }));
            });
            describe('should work when returns a promise', () => {
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'team/:id',
                            component: integration_helpers_1.TeamCmp,
                            canActivate: [
                                (a) => {
                                    if (a.params['id'] === '22') {
                                        return Promise.resolve(true);
                                    }
                                    else {
                                        return Promise.resolve(false);
                                    }
                                },
                            ],
                        },
                    ]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                    router.navigateByUrl('/team/33');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                }));
            });
            describe('should reset the location when cancelling a navigation', () => {
                beforeEach(() => {
                    testing_1.TestBed.configureTestingModule({
                        providers: [{ provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }],
                    });
                });
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        { path: 'one', component: integration_helpers_1.SimpleCmp },
                        { path: 'two', component: integration_helpers_1.SimpleCmp, canActivate: [() => false] },
                    ]);
                    router.navigateByUrl('/one');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/one');
                    location.go('/two');
                    location.historyGo(0);
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/one');
                }));
            });
            describe('should redirect to / when guard returns false', () => {
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    router.resetConfig([
                        {
                            path: '',
                            component: integration_helpers_1.SimpleCmp,
                        },
                        {
                            path: 'one',
                            component: integration_helpers_1.RouteCmp,
                            canActivate: [
                                () => {
                                    (0, core_1.inject)(src_1.Router).navigate(['/']);
                                    return false;
                                },
                            ],
                        },
                    ]);
                    const fixture = testing_1.TestBed.createComponent(integration_helpers_1.RootCmp);
                    router.navigateByUrl('/one');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('');
                    (0, matchers_1.expect)(fixture.nativeElement).toHaveText('simple');
                }));
            });
            describe('should redirect when guard returns UrlTree', () => {
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const recordedEvents = [];
                    let cancelEvent = null;
                    router.events.forEach((e) => {
                        recordedEvents.push(e);
                        if (e instanceof src_1.NavigationCancel)
                            cancelEvent = e;
                    });
                    router.resetConfig([
                        { path: '', component: integration_helpers_1.SimpleCmp },
                        {
                            path: 'one',
                            component: integration_helpers_1.RouteCmp,
                            canActivate: [() => (0, core_1.inject)(src_1.Router).parseUrl('/redirected')],
                        },
                        { path: 'redirected', component: integration_helpers_1.SimpleCmp },
                    ]);
                    const fixture = testing_1.TestBed.createComponent(integration_helpers_1.RootCmp);
                    router.navigateByUrl('/one');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/redirected');
                    (0, matchers_1.expect)(fixture.nativeElement).toHaveText('simple');
                    (0, matchers_1.expect)(cancelEvent && cancelEvent.reason).toBe('NavigationCancelingError: Redirecting to "/redirected"');
                    (0, integration_helpers_1.expectEvents)(recordedEvents, [
                        [src_1.NavigationStart, '/one'],
                        [src_1.RoutesRecognized, '/one'],
                        [src_1.GuardsCheckStart, '/one'],
                        [src_1.ChildActivationStart, undefined],
                        [src_1.ActivationStart, undefined],
                        [src_1.NavigationCancel, '/one'],
                        [src_1.NavigationStart, '/redirected'],
                        [src_1.RoutesRecognized, '/redirected'],
                        [src_1.GuardsCheckStart, '/redirected'],
                        [src_1.ChildActivationStart, undefined],
                        [src_1.ActivationStart, undefined],
                        [src_1.GuardsCheckEnd, '/redirected'],
                        [src_1.ResolveStart, '/redirected'],
                        [src_1.ResolveEnd, '/redirected'],
                        [src_1.ActivationEnd, undefined],
                        [src_1.ChildActivationEnd, undefined],
                        [src_1.NavigationEnd, '/redirected'],
                    ]);
                }));
                it('works with root url', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const recordedEvents = [];
                    let cancelEvent = null;
                    router.events.forEach((e) => {
                        recordedEvents.push(e);
                        if (e instanceof src_1.NavigationCancel)
                            cancelEvent = e;
                    });
                    router.resetConfig([
                        { path: '', component: integration_helpers_1.SimpleCmp },
                        {
                            path: 'one',
                            component: integration_helpers_1.RouteCmp,
                            canActivate: [() => (0, core_1.inject)(src_1.Router).parseUrl('/')],
                        },
                    ]);
                    const fixture = testing_1.TestBed.createComponent(integration_helpers_1.RootCmp);
                    router.navigateByUrl('/one');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('');
                    (0, matchers_1.expect)(fixture.nativeElement).toHaveText('simple');
                    (0, matchers_1.expect)(cancelEvent && cancelEvent.reason).toBe('NavigationCancelingError: Redirecting to "/"');
                    (0, integration_helpers_1.expectEvents)(recordedEvents, [
                        [src_1.NavigationStart, '/one'],
                        [src_1.RoutesRecognized, '/one'],
                        [src_1.GuardsCheckStart, '/one'],
                        [src_1.ChildActivationStart, undefined],
                        [src_1.ActivationStart, undefined],
                        [src_1.NavigationCancel, '/one'],
                        [src_1.NavigationStart, '/'],
                        [src_1.RoutesRecognized, '/'],
                        [src_1.GuardsCheckStart, '/'],
                        [src_1.ChildActivationStart, undefined],
                        [src_1.ActivationStart, undefined],
                        [src_1.GuardsCheckEnd, '/'],
                        [src_1.ResolveStart, '/'],
                        [src_1.ResolveEnd, '/'],
                        [src_1.ActivationEnd, undefined],
                        [src_1.ChildActivationEnd, undefined],
                        [src_1.NavigationEnd, '/'],
                    ]);
                }));
                it('replaces URL when URL is updated eagerly so back button can still work', () => __awaiter(this, void 0, void 0, function* () {
                    testing_1.TestBed.configureTestingModule({
                        providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ urlUpdateStrategy: 'eager' }))],
                    });
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    router.resetConfig([
                        { path: '', component: integration_helpers_1.SimpleCmp },
                        {
                            path: 'one',
                            component: integration_helpers_1.RouteCmp,
                            canActivate: [() => (0, core_1.inject)(src_1.Router).parseUrl('/redirected')],
                        },
                        { path: 'redirected', component: integration_helpers_1.SimpleCmp },
                    ]);
                    yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.navigateByUrl('/one');
                    const urlChanges = [];
                    location.onUrlChange((change) => {
                        urlChanges.push(change);
                    });
                    yield (0, helpers_1.timeout)();
                    (0, matchers_1.expect)(location.path()).toEqual('/redirected');
                    (0, matchers_1.expect)(urlChanges).toEqual(['/one', '/redirected']);
                    location.back();
                    yield (0, helpers_1.timeout)();
                    (0, matchers_1.expect)(location.path()).toEqual('');
                }));
                it('should resolve navigateByUrl promise after redirect finishes', () => __awaiter(this, void 0, void 0, function* () {
                    testing_1.TestBed.configureTestingModule({
                        providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ urlUpdateStrategy: 'eager' }))],
                    });
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    let resolvedPath = '';
                    router.resetConfig([
                        { path: '', component: integration_helpers_1.SimpleCmp },
                        {
                            path: 'one',
                            component: integration_helpers_1.RouteCmp,
                            canActivate: [() => (0, core_1.inject)(src_1.Router).parseUrl('/redirected')],
                        },
                        { path: 'redirected', component: integration_helpers_1.SimpleCmp },
                    ]);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.navigateByUrl('/one').then((v) => {
                        resolvedPath = location.path();
                    });
                    yield (0, helpers_1.timeout)();
                    (0, matchers_1.expect)(resolvedPath).toBe('/redirected');
                }));
                it('can redirect to 404 without changing the URL', () => __awaiter(this, void 0, void 0, function* () {
                    testing_1.TestBed.configureTestingModule({
                        providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ urlUpdateStrategy: 'eager' }))],
                    });
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    router.resetConfig([
                        { path: '', component: integration_helpers_1.SimpleCmp },
                        {
                            path: 'one',
                            component: integration_helpers_1.RouteCmp,
                            canActivate: [
                                () => new src_1.RedirectCommand(router.parseUrl('/404'), { skipLocationChange: true }),
                            ],
                        },
                        { path: '404', component: integration_helpers_1.SimpleCmp },
                    ]);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.navigateByUrl('/one');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/one');
                    (0, matchers_1.expect)(router.url.toString()).toEqual('/404');
                }));
                it('can redirect while changing state object', () => __awaiter(this, void 0, void 0, function* () {
                    testing_1.TestBed.configureTestingModule({
                        providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ urlUpdateStrategy: 'eager' }))],
                    });
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    router.resetConfig([
                        { path: '', component: integration_helpers_1.SimpleCmp },
                        {
                            path: 'one',
                            component: integration_helpers_1.RouteCmp,
                            canActivate: [
                                () => new src_1.RedirectCommand(router.parseUrl('/redirected'), { state: { test: 1 } }),
                            ],
                        },
                        { path: 'redirected', component: integration_helpers_1.SimpleCmp },
                    ]);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.navigateByUrl('/one');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/redirected');
                    (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ test: 1 }));
                }));
            });
            it('can redirect to 404 without changing the URL', () => __awaiter(this, void 0, void 0, function* () {
                testing_1.TestBed.configureTestingModule({
                    providers: [
                        (0, src_1.provideRouter)([
                            {
                                path: 'one',
                                component: integration_helpers_1.RouteCmp,
                                canActivate: [
                                    () => {
                                        var _a;
                                        const router = (0, core_1.inject)(src_1.Router);
                                        router.navigateByUrl('/404', {
                                            browserUrl: (_a = router.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.finalUrl,
                                        });
                                        return false;
                                    },
                                ],
                            },
                            { path: '404', component: integration_helpers_1.SimpleCmp },
                        ]),
                    ],
                });
                const location = testing_1.TestBed.inject(common_1.Location);
                yield testing_2.RouterTestingHarness.create('/one');
                (0, matchers_1.expect)(location.path()).toEqual('/one');
                (0, matchers_1.expect)(testing_1.TestBed.inject(src_1.Router).url.toString()).toEqual('/404');
            }));
            it('can navigate to same internal route with different browser url', () => __awaiter(this, void 0, void 0, function* () {
                testing_1.TestBed.configureTestingModule({
                    providers: [(0, src_1.provideRouter)([{ path: 'one', component: integration_helpers_1.RouteCmp }])],
                });
                const location = testing_1.TestBed.inject(common_1.Location);
                const router = testing_1.TestBed.inject(src_1.Router);
                yield testing_2.RouterTestingHarness.create('/one');
                yield router.navigateByUrl('/one', { browserUrl: '/two' });
                (0, matchers_1.expect)(location.path()).toEqual('/two');
                (0, matchers_1.expect)(router.url.toString()).toEqual('/one');
            }));
            it('retains browserUrl through UrlTree redirects', () => __awaiter(this, void 0, void 0, function* () {
                testing_1.TestBed.configureTestingModule({
                    providers: [
                        (0, src_1.provideRouter)([
                            {
                                path: 'one',
                                component: integration_helpers_1.RouteCmp,
                                canActivate: [() => (0, core_1.inject)(src_1.Router).parseUrl('/404')],
                            },
                            { path: '404', component: integration_helpers_1.SimpleCmp },
                        ]),
                    ],
                });
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                yield testing_2.RouterTestingHarness.create();
                yield router.navigateByUrl('/one', { browserUrl: router.parseUrl('abc123') });
                (0, matchers_1.expect)(location.path()).toEqual('/abc123');
                (0, matchers_1.expect)(testing_1.TestBed.inject(src_1.Router).url.toString()).toEqual('/404');
            }));
            describe('runGuardsAndResolvers', () => {
                let guardRunCount = 0;
                let resolverRunCount = 0;
                beforeEach(() => {
                    guardRunCount = 0;
                    resolverRunCount = 0;
                    testing_1.TestBed.configureTestingModule({
                        providers: [{ provide: 'resolver', useValue: () => resolverRunCount++ }],
                    });
                });
                function configureRouter(router, runGuardsAndResolvers) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmpWithTwoOutlets);
                        router.resetConfig([
                            {
                                path: 'a',
                                runGuardsAndResolvers,
                                component: integration_helpers_1.RouteCmp,
                                canActivate: [
                                    () => {
                                        guardRunCount++;
                                        return true;
                                    },
                                ],
                                resolve: { data: 'resolver' },
                            },
                            { path: 'b', component: integration_helpers_1.SimpleCmp, outlet: 'right' },
                            {
                                path: 'c/:param',
                                runGuardsAndResolvers,
                                component: integration_helpers_1.RouteCmp,
                                canActivate: [
                                    () => {
                                        guardRunCount++;
                                        return true;
                                    },
                                ],
                                resolve: { data: 'resolver' },
                            },
                            {
                                path: 'd/:param',
                                component: integration_helpers_1.WrapperCmp,
                                runGuardsAndResolvers,
                                children: [
                                    {
                                        path: 'e/:param',
                                        component: integration_helpers_1.SimpleCmp,
                                        canActivate: [
                                            () => {
                                                guardRunCount++;
                                                return true;
                                            },
                                        ],
                                        resolve: { data: 'resolver' },
                                    },
                                ],
                            },
                            {
                                path: 'throwing',
                                runGuardsAndResolvers,
                                component: integration_helpers_1.ThrowingCmp,
                                canActivate: [
                                    () => {
                                        guardRunCount++;
                                        return true;
                                    },
                                ],
                                resolve: { data: 'resolver' },
                            },
                        ]);
                        router.navigateByUrl('/a');
                        yield (0, integration_helpers_1.advance)(fixture);
                        return fixture;
                    });
                }
                it('should rerun guards and resolvers when params change', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const fixture = yield configureRouter(router, 'paramsChange');
                    const cmp = fixture.debugElement.children[1].componentInstance;
                    const recordedData = [];
                    cmp.route.data.subscribe((data) => recordedData.push(data));
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    router.navigateByUrl('/a;p=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(2);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }]);
                    router.navigateByUrl('/a;p=2');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(3);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }, { data: 2 }]);
                    router.navigateByUrl('/a;p=2?q=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(3);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }, { data: 2 }]);
                }));
                it('should rerun guards and resolvers when query params change', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const fixture = yield configureRouter(router, 'paramsOrQueryParamsChange');
                    const cmp = fixture.debugElement.children[1].componentInstance;
                    const recordedData = [];
                    cmp.route.data.subscribe((data) => recordedData.push(data));
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    router.navigateByUrl('/a;p=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(2);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }]);
                    router.navigateByUrl('/a;p=2');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(3);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }, { data: 2 }]);
                    router.navigateByUrl('/a;p=2?q=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(4);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }, { data: 2 }, { data: 3 }]);
                    router.navigateByUrl('/a;p=2(right:b)?q=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(4);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }, { data: 2 }, { data: 3 }]);
                }));
                it('should always rerun guards and resolvers', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const fixture = yield configureRouter(router, 'always');
                    const cmp = fixture.debugElement.children[1].componentInstance;
                    const recordedData = [];
                    cmp.route.data.subscribe((data) => recordedData.push(data));
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    router.navigateByUrl('/a;p=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(2);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }]);
                    router.navigateByUrl('/a;p=2');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(3);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }, { data: 2 }]);
                    router.navigateByUrl('/a;p=2?q=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(4);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }, { data: 2 }, { data: 3 }]);
                    router.navigateByUrl('/a;p=2(right:b)?q=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(5);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }, { data: 2 }, { data: 3 }, { data: 4 }]);
                    // Issue #39030, always running guards and resolvers should not throw
                    // when navigating away from a component with a throwing constructor.
                    yield expectAsync((() => __awaiter(this, void 0, void 0, function* () {
                        router.navigateByUrl('/throwing').catch(() => { });
                        yield (0, integration_helpers_1.advance)(fixture);
                        router.navigateByUrl('/a;p=1');
                        yield (0, integration_helpers_1.advance)(fixture);
                    }))()).not.toBeRejected();
                }));
                it('should rerun rerun guards and resolvers when path params change', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const fixture = yield configureRouter(router, 'pathParamsChange');
                    const cmp = fixture.debugElement.children[1].componentInstance;
                    const recordedData = [];
                    cmp.route.data.subscribe((data) => recordedData.push(data));
                    // First navigation has already run
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    // Changing any optional params will not result in running guards or resolvers
                    router.navigateByUrl('/a;p=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    router.navigateByUrl('/a;p=2');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    router.navigateByUrl('/a;p=2?q=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    router.navigateByUrl('/a;p=2(right:b)?q=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    // Change to new route with path param should run guards and resolvers
                    router.navigateByUrl('/c/paramValue');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(2);
                    // Modifying a path param should run guards and resolvers
                    router.navigateByUrl('/c/paramValueChanged');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(3);
                    // Adding optional params should not cause guards/resolvers to run
                    router.navigateByUrl('/c/paramValueChanged;p=1?q=2');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(3);
                }));
                it('should rerun when a parent segment changes', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const fixture = yield configureRouter(router, 'pathParamsChange');
                    const cmp = fixture.debugElement.children[1].componentInstance;
                    // Land on an initial page
                    router.navigateByUrl('/d/1;dd=11/e/2;dd=22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(2);
                    // Changes cause re-run on the config with the guard
                    router.navigateByUrl('/d/1;dd=11/e/3;ee=22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(3);
                    // Changes to the parent also cause re-run
                    router.navigateByUrl('/d/2;dd=11/e/3;ee=22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(4);
                }));
                it('should rerun rerun guards and resolvers when path or query params change', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const fixture = yield configureRouter(router, 'pathParamsOrQueryParamsChange');
                    const cmp = fixture.debugElement.children[1].componentInstance;
                    const recordedData = [];
                    cmp.route.data.subscribe((data) => recordedData.push(data));
                    // First navigation has already run
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    // Changing matrix params will not result in running guards or resolvers
                    router.navigateByUrl('/a;p=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    router.navigateByUrl('/a;p=2');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    // Adding query params will re-run guards/resolvers
                    router.navigateByUrl('/a;p=2?q=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(2);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }]);
                    // Changing query params will re-run guards/resolvers
                    router.navigateByUrl('/a;p=2?q=2');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(3);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }, { data: 2 }]);
                }));
                it('should allow a predicate function to determine when to run guards and resolvers', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const fixture = yield configureRouter(router, (from, to) => to.paramMap.get('p') === '2');
                    const cmp = fixture.debugElement.children[1].componentInstance;
                    const recordedData = [];
                    cmp.route.data.subscribe((data) => recordedData.push(data));
                    // First navigation has already run
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    // Adding `p` param shouldn't cause re-run
                    router.navigateByUrl('/a;p=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(1);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }]);
                    // Re-run should trigger on p=2
                    router.navigateByUrl('/a;p=2');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(2);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }]);
                    // Any other changes don't pass the predicate
                    router.navigateByUrl('/a;p=3?q=1');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(2);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }]);
                    // Changing query params will re-run guards/resolvers
                    router.navigateByUrl('/a;p=3?q=2');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(guardRunCount).toEqual(2);
                    (0, matchers_1.expect)(recordedData).toEqual([{ data: 0 }, { data: 1 }]);
                }));
            });
            describe('should wait for parent to complete', () => {
                let log;
                beforeEach(() => {
                    log = [];
                });
                function delayPromise(delay) {
                    let resolve;
                    const promise = new Promise((res) => (resolve = res));
                    setTimeout(() => resolve(true), delay);
                    return promise;
                }
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'parent',
                            canActivate: [
                                () => delayPromise(10).then(() => {
                                    log.push('parent');
                                    return true;
                                }),
                            ],
                            children: [
                                {
                                    path: 'child',
                                    component: integration_helpers_1.SimpleCmp,
                                    canActivate: [
                                        () => {
                                            return delayPromise(5).then(() => {
                                                log.push('child');
                                                return true;
                                            });
                                        },
                                    ],
                                },
                            ],
                        },
                    ]);
                    yield router.navigateByUrl('/parent/child');
                    (0, matchers_1.expect)(log).toEqual(['parent', 'child']);
                }));
            });
        });
        describe('CanDeactivate', () => {
            let log;
            const recordingDeactivate = (c, a) => {
                log.push({ path: a.routeConfig.path, component: c });
                return true;
            };
            beforeEach(() => {
                log = [];
            });
            describe('should not deactivate a route when CanDeactivate returns false', () => {
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'team/:id',
                            component: integration_helpers_1.TeamCmp,
                            canDeactivate: [
                                (c, a) => {
                                    return a.params['id'] === '22';
                                },
                            ],
                        },
                    ]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                    let successStatus = false;
                    router.navigateByUrl('/team/33').then((res) => (successStatus = res));
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/33');
                    (0, matchers_1.expect)(successStatus).toEqual(true);
                    let canceledStatus = false;
                    router.navigateByUrl('/team/44').then((res) => (canceledStatus = res));
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/33');
                    (0, matchers_1.expect)(canceledStatus).toEqual(false);
                }));
                it('works with componentless routes', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'grandparent',
                            canDeactivate: [recordingDeactivate],
                            children: [
                                {
                                    path: 'parent',
                                    canDeactivate: [recordingDeactivate],
                                    children: [
                                        {
                                            path: 'child',
                                            canDeactivate: [recordingDeactivate],
                                            children: [
                                                {
                                                    path: 'simple',
                                                    component: integration_helpers_1.SimpleCmp,
                                                    canDeactivate: [recordingDeactivate],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        { path: 'simple', component: integration_helpers_1.SimpleCmp },
                    ]);
                    router.navigateByUrl('/grandparent/parent/child/simple');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/grandparent/parent/child/simple');
                    router.navigateByUrl('/simple');
                    yield (0, integration_helpers_1.advance)(fixture);
                    const child = fixture.debugElement.children[1].componentInstance;
                    (0, matchers_1.expect)(log.map((a) => a.path)).toEqual(['simple', 'child', 'parent', 'grandparent']);
                    (0, matchers_1.expect)(log[0].component instanceof integration_helpers_1.SimpleCmp).toBeTruthy();
                    [1, 2, 3].forEach((i) => (0, matchers_1.expect)(log[i].component).toBeNull());
                    (0, matchers_1.expect)(child instanceof integration_helpers_1.SimpleCmp).toBeTruthy();
                    (0, matchers_1.expect)(child).not.toBe(log[0].component);
                }));
                it('works with aux routes', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'two-outlets',
                            component: integration_helpers_1.TwoOutletsCmp,
                            children: [
                                { path: 'a', component: integration_helpers_1.BlankCmp },
                                {
                                    path: 'b',
                                    canDeactivate: [recordingDeactivate],
                                    component: integration_helpers_1.SimpleCmp,
                                    outlet: 'aux',
                                },
                            ],
                        },
                    ]);
                    router.navigateByUrl('/two-outlets/(a//aux:b)');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/two-outlets/(a//aux:b)');
                    router.navigate(['two-outlets', { outlets: { aux: null } }]);
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(log.map((a) => a.path)).toEqual(['b']);
                    (0, matchers_1.expect)(location.path()).toEqual('/two-outlets/a');
                }));
                it('works with a nested route', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'team/:id',
                            component: integration_helpers_1.TeamCmp,
                            children: [
                                { path: '', pathMatch: 'full', component: integration_helpers_1.SimpleCmp },
                                {
                                    path: 'user/:name',
                                    component: integration_helpers_1.UserCmp,
                                    canDeactivate: [
                                        (c, a, b) => {
                                            return a.params['name'] === 'victor';
                                        },
                                    ],
                                },
                            ],
                        },
                    ]);
                    router.navigateByUrl('/team/22/user/victor');
                    yield (0, integration_helpers_1.advance)(fixture);
                    // this works because we can deactivate victor
                    router.navigateByUrl('/team/33');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/33');
                    router.navigateByUrl('/team/33/user/fedor');
                    yield (0, integration_helpers_1.advance)(fixture);
                    // this doesn't work cause we cannot deactivate fedor
                    router.navigateByUrl('/team/44');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/33/user/fedor');
                }));
            });
            it('should use correct component to deactivate forChild route', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                let AdminComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'admin',
                            template: '',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var AdminComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "AdminComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        AdminComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return AdminComponent = _classThis;
                })();
                let LazyLoadedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [AdminComponent],
                            imports: [
                                src_1.RouterModule.forChild([
                                    {
                                        path: '',
                                        component: AdminComponent,
                                        canDeactivate: [recordingDeactivate],
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
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'a',
                        component: integration_helpers_1.WrapperCmp,
                        children: [{ path: '', pathMatch: 'full', loadChildren: () => LazyLoadedModule }],
                    },
                    { path: 'b', component: integration_helpers_1.SimpleCmp },
                ]);
                router.navigateByUrl('/a');
                yield (0, integration_helpers_1.advance)(fixture);
                router.navigateByUrl('/b');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(log[0].component).toBeInstanceOf(AdminComponent);
            }));
            it('should not create a route state if navigation is canceled', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'main',
                        component: integration_helpers_1.TeamCmp,
                        children: [
                            { path: 'component1', component: integration_helpers_1.SimpleCmp, canDeactivate: [() => false] },
                            { path: 'component2', component: integration_helpers_1.SimpleCmp },
                        ],
                    },
                ]);
                router.navigateByUrl('/main/component1');
                yield (0, integration_helpers_1.advance)(fixture);
                router.navigateByUrl('/main/component2');
                yield (0, integration_helpers_1.advance)(fixture);
                const teamCmp = fixture.debugElement.children[1].componentInstance;
                (0, matchers_1.expect)(teamCmp.route.firstChild.url.value[0].path).toEqual('component1');
                (0, matchers_1.expect)(location.path()).toEqual('/main/component1');
            }));
            it('should not run CanActivate when CanDeactivate returns false', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'main',
                        component: integration_helpers_1.TeamCmp,
                        children: [
                            {
                                path: 'component1',
                                component: integration_helpers_1.SimpleCmp,
                                canDeactivate: [
                                    () => {
                                        log.push('called');
                                        let resolve;
                                        const promise = new Promise((res) => (resolve = res));
                                        setTimeout(() => resolve(false), 0);
                                        return promise;
                                    },
                                ],
                            },
                            {
                                path: 'component2',
                                component: integration_helpers_1.SimpleCmp,
                                canActivate: [
                                    () => {
                                        log.push('canActivate called');
                                        return true;
                                    },
                                ],
                            },
                        ],
                    },
                ]);
                router.navigateByUrl('/main/component1');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/main/component1');
                router.navigateByUrl('/main/component2');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/main/component1');
                (0, matchers_1.expect)(log).toEqual(['called']);
            }));
            it('should call guards every time when navigating to the same url over and over again', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'simple',
                        component: integration_helpers_1.SimpleCmp,
                        canDeactivate: [
                            () => {
                                log.push('called');
                                return false;
                            },
                        ],
                    },
                    { path: 'blank', component: integration_helpers_1.BlankCmp },
                ]);
                router.navigateByUrl('/simple');
                yield (0, integration_helpers_1.advance)(fixture);
                router.navigateByUrl('/blank');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(log).toEqual(['called']);
                (0, matchers_1.expect)(location.path()).toEqual('/simple');
                router.navigateByUrl('/blank');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(log).toEqual(['called', 'called']);
                (0, matchers_1.expect)(location.path()).toEqual('/simple');
            }));
            describe('next state', () => {
                let log;
                class ClassWithNextState {
                    canDeactivate(component, currentRoute, currentState, nextState) {
                        log.push(currentState.url, nextState.url);
                        return true;
                    }
                }
                beforeEach(() => {
                    log = [];
                    testing_1.TestBed.configureTestingModule({
                        providers: [ClassWithNextState],
                    });
                });
                it('should pass next state as the 4 argument when guard is a class', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'team/:id',
                            component: integration_helpers_1.TeamCmp,
                            canDeactivate: [
                                (component, currentRoute, currentState, nextState) => (0, core_1.inject)(ClassWithNextState).canDeactivate(component, currentRoute, currentState, nextState),
                            ],
                        },
                    ]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                    router.navigateByUrl('/team/33');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/33');
                    (0, matchers_1.expect)(log).toEqual(['/team/22', '/team/33']);
                }));
                it('should pass next state as the 4 argument when guard is a function', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'team/:id',
                            component: integration_helpers_1.TeamCmp,
                            canDeactivate: [
                                (cmp, currentRoute, currentState, nextState) => {
                                    log.push(currentState.url, nextState.url);
                                    return true;
                                },
                            ],
                        },
                    ]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                    router.navigateByUrl('/team/33');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/33');
                    (0, matchers_1.expect)(log).toEqual(['/team/22', '/team/33']);
                }));
            });
            describe('should work when given a class', () => {
                class AlwaysTrue {
                    canDeactivate() {
                        return true;
                    }
                }
                beforeEach(() => {
                    testing_1.TestBed.configureTestingModule({ providers: [AlwaysTrue] });
                });
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'team/:id',
                            component: integration_helpers_1.TeamCmp,
                            canDeactivate: [() => (0, core_1.inject)(AlwaysTrue).canDeactivate()],
                        },
                    ]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                    router.navigateByUrl('/team/33');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/33');
                }));
            });
            describe('should work when returns an observable', () => {
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: 'team/:id',
                            component: integration_helpers_1.TeamCmp,
                            canDeactivate: [
                                () => {
                                    return new rxjs_1.Observable((observer) => {
                                        observer.next(false);
                                    });
                                },
                            ],
                        },
                    ]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                    router.navigateByUrl('/team/33');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                }));
            });
        });
        describe('CanActivateChild', () => {
            describe('should be invoked when activating a child', () => {
                it('works', () => __awaiter(this, void 0, void 0, function* () {
                    const router = testing_1.TestBed.inject(src_1.Router);
                    const location = testing_1.TestBed.inject(common_1.Location);
                    const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                    router.resetConfig([
                        {
                            path: '',
                            canActivateChild: [(a) => a.paramMap.get('id') === '22'],
                            children: [{ path: 'team/:id', component: integration_helpers_1.TeamCmp }],
                        },
                    ]);
                    router.navigateByUrl('/team/22');
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                    router.navigateByUrl('/team/33').catch(() => { });
                    yield (0, integration_helpers_1.advance)(fixture);
                    (0, matchers_1.expect)(location.path()).toEqual('/team/22');
                }));
            });
            it('should find the guard provided in lazy loaded module', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                let AdminComponent = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            selector: 'admin',
                            template: '<router-outlet></router-outlet>',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var AdminComponent = _classThis = class {
                    };
                    __setFunctionName(_classThis, "AdminComponent");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        AdminComponent = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return AdminComponent = _classThis;
                })();
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
                            declarations: [AdminComponent, LazyLoadedComponent],
                            imports: [
                                src_1.RouterModule.forChild([
                                    {
                                        path: '',
                                        component: AdminComponent,
                                        children: [
                                            {
                                                path: '',
                                                canActivateChild: [() => true],
                                                children: [{ path: '', component: LazyLoadedComponent }],
                                            },
                                        ],
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
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([{ path: 'admin', loadChildren: () => LazyLoadedModule }]);
                router.navigateByUrl('/admin');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/admin');
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('lazy-loaded');
            }));
        });
        describe('CanLoad', () => {
            let canLoadRunCount = 0;
            beforeEach(() => {
                canLoadRunCount = 0;
                testing_1.TestBed.configureTestingModule({
                    providers: [
                        {
                            provide: () => true,
                            useValue: () => {
                                canLoadRunCount++;
                                return true;
                            },
                        },
                    ],
                });
            });
            it('should not load children when CanLoad returns false', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
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
                            imports: [src_1.RouterModule.forChild([{ path: 'loaded', component: LazyLoadedComponent }])],
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
                    { path: 'lazyFalse', canLoad: [() => false], loadChildren: () => LoadedModule },
                    { path: 'lazyTrue', canLoad: [() => true], loadChildren: () => LoadedModule },
                ]);
                const recordedEvents = [];
                router.events.forEach((e) => recordedEvents.push(e));
                // failed navigation
                router.navigateByUrl('/lazyFalse/loaded');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('');
                (0, integration_helpers_1.expectEvents)(recordedEvents, [
                    [src_1.NavigationStart, '/lazyFalse/loaded'],
                    //  [GuardsCheckStart, '/lazyFalse/loaded'],
                    [src_1.NavigationCancel, '/lazyFalse/loaded'],
                ]);
                (0, matchers_1.expect)(recordedEvents[1].code).toBe(src_1.NavigationCancellationCode.GuardRejected);
                recordedEvents.splice(0);
                // successful navigation
                router.navigateByUrl('/lazyTrue/loaded');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/lazyTrue/loaded');
                (0, integration_helpers_1.expectEvents)(recordedEvents, [
                    [src_1.NavigationStart, '/lazyTrue/loaded'],
                    [src_1.RouteConfigLoadStart],
                    [src_1.RouteConfigLoadEnd],
                    [src_1.RoutesRecognized, '/lazyTrue/loaded'],
                    [src_1.GuardsCheckStart, '/lazyTrue/loaded'],
                    [src_1.ChildActivationStart],
                    [src_1.ActivationStart],
                    [src_1.ChildActivationStart],
                    [src_1.ActivationStart],
                    [src_1.GuardsCheckEnd, '/lazyTrue/loaded'],
                    [src_1.ResolveStart, '/lazyTrue/loaded'],
                    [src_1.ResolveEnd, '/lazyTrue/loaded'],
                    [src_1.ActivationEnd],
                    [src_1.ChildActivationEnd],
                    [src_1.ActivationEnd],
                    [src_1.ChildActivationEnd],
                    [src_1.NavigationEnd, '/lazyTrue/loaded'],
                ]);
            }));
            it('should support navigating from within the guard', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'lazyFalse',
                        canLoad: [
                            () => {
                                router.navigate(['blank']);
                                return false;
                            },
                        ],
                        loadChildren: jasmine.createSpy('lazyFalse'),
                    },
                    { path: 'blank', component: integration_helpers_1.BlankCmp },
                ]);
                const recordedEvents = [];
                router.events.forEach((e) => recordedEvents.push(e));
                router.navigateByUrl('/lazyFalse/loaded');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/blank');
                (0, integration_helpers_1.expectEvents)(recordedEvents, [
                    [src_1.NavigationStart, '/lazyFalse/loaded'],
                    // No GuardCheck events as `canLoad` is a special guard that's not actually part of
                    // the guard lifecycle.
                    [src_1.NavigationCancel, '/lazyFalse/loaded'],
                    [src_1.NavigationStart, '/blank'],
                    [src_1.RoutesRecognized, '/blank'],
                    [src_1.GuardsCheckStart, '/blank'],
                    [src_1.ChildActivationStart],
                    [src_1.ActivationStart],
                    [src_1.GuardsCheckEnd, '/blank'],
                    [src_1.ResolveStart, '/blank'],
                    [src_1.ResolveEnd, '/blank'],
                    [src_1.ActivationEnd],
                    [src_1.ChildActivationEnd],
                    [src_1.NavigationEnd, '/blank'],
                ]);
                (0, matchers_1.expect)(recordedEvents[1].code).toBe(src_1.NavigationCancellationCode.SupersededByNewNavigation);
            }));
            it('should support returning UrlTree from within the guard', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: 'lazyFalse',
                        canLoad: [() => (0, core_1.inject)(src_1.Router).createUrlTree(['blank'])],
                        loadChildren: jasmine.createSpy('lazyFalse'),
                    },
                    { path: 'blank', component: integration_helpers_1.BlankCmp },
                ]);
                const recordedEvents = [];
                router.events.forEach((e) => recordedEvents.push(e));
                router.navigateByUrl('/lazyFalse/loaded');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/blank');
                (0, integration_helpers_1.expectEvents)(recordedEvents, [
                    [src_1.NavigationStart, '/lazyFalse/loaded'],
                    // No GuardCheck events as `canLoad` is a special guard that's not actually part of
                    // the guard lifecycle.
                    [src_1.NavigationCancel, '/lazyFalse/loaded'],
                    [src_1.NavigationStart, '/blank'],
                    [src_1.RoutesRecognized, '/blank'],
                    [src_1.GuardsCheckStart, '/blank'],
                    [src_1.ChildActivationStart],
                    [src_1.ActivationStart],
                    [src_1.GuardsCheckEnd, '/blank'],
                    [src_1.ResolveStart, '/blank'],
                    [src_1.ResolveEnd, '/blank'],
                    [src_1.ActivationEnd],
                    [src_1.ChildActivationEnd],
                    [src_1.NavigationEnd, '/blank'],
                ]);
                (0, matchers_1.expect)(recordedEvents[1].code).toBe(src_1.NavigationCancellationCode.Redirect);
            }));
            // Regression where navigateByUrl with false CanLoad no longer resolved `false` value on
            // navigateByUrl promise: https://github.com/angular/angular/issues/26284
            it('should resolve navigateByUrl promise after CanLoad executes', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
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
                            imports: [src_1.RouterModule.forChild([{ path: 'loaded', component: LazyLoadedComponent }])],
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
                    { path: 'lazy-false', canLoad: [() => false], loadChildren: () => LazyLoadedModule },
                    { path: 'lazy-true', canLoad: [() => true], loadChildren: () => LazyLoadedModule },
                ]);
                let navFalseResult = true;
                let navTrueResult = false;
                router.navigateByUrl('/lazy-false').then((v) => {
                    navFalseResult = v;
                });
                yield (0, integration_helpers_1.advance)(fixture);
                router.navigateByUrl('/lazy-true').then((v) => {
                    navTrueResult = v;
                });
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(navFalseResult).toBe(false);
                (0, matchers_1.expect)(navTrueResult).toBe(true);
            }));
            it('should execute CanLoad only once', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
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
                            imports: [src_1.RouterModule.forChild([{ path: 'loaded', component: LazyLoadedComponent }])],
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
                        path: 'lazy',
                        canLoad: [
                            () => {
                                canLoadRunCount++;
                                return true;
                            },
                        ],
                        loadChildren: () => LazyLoadedModule,
                    },
                ]);
                router.navigateByUrl('/lazy/loaded');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/lazy/loaded');
                (0, matchers_1.expect)(canLoadRunCount).toEqual(1);
                router.navigateByUrl('/');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('');
                router.navigateByUrl('/lazy/loaded');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(location.path()).toEqual('/lazy/loaded');
                (0, matchers_1.expect)(canLoadRunCount).toEqual(1);
            }));
            it('cancels guard execution when a new navigation happens', () => __awaiter(this, void 0, void 0, function* () {
                let DelayedGuard = (() => {
                    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DelayedGuard = _classThis = class {
                        canLoad() {
                            DelayedGuard.canLoadCalls++;
                            return (0, rxjs_1.of)(true).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 10)).then(() => v)), (0, operators_1.tap)(() => {
                                DelayedGuard.delayedExecutions++;
                            }));
                        }
                    };
                    __setFunctionName(_classThis, "DelayedGuard");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DelayedGuard = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })();
                    _classThis.delayedExecutions = 0;
                    _classThis.canLoadCalls = 0;
                    (() => {
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DelayedGuard = _classThis;
                })();
                const router = testing_1.TestBed.inject(src_1.Router);
                router.resetConfig([
                    { path: 'a', canLoad: [DelayedGuard], loadChildren: () => [], component: integration_helpers_1.SimpleCmp },
                    { path: 'team/:id', component: integration_helpers_1.TeamCmp },
                ]);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.navigateByUrl('/a');
                yield (0, helpers_1.timeout)(1);
                // The delayed guard should have started
                (0, matchers_1.expect)(DelayedGuard.canLoadCalls).toEqual(1);
                yield router.navigateByUrl('/team/1');
                (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('team');
                // The delayed guard should not execute the delayed condition because a new navigation
                // cancels the current one and unsubscribes from intermediate results.
                (0, matchers_1.expect)(DelayedGuard.delayedExecutions).toEqual(0);
            }));
        });
        describe('should run CanLoad guards concurrently', () => {
            function delayObservable(delayMs) {
                return (0, rxjs_1.of)(delayMs).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, delayMs)).then(() => v)), (0, operators_1.mapTo)(true));
            }
            let log;
            const guard1 = () => {
                return delayObservable(5).pipe((0, operators_1.tap)({ next: () => log.push('guard1') }));
            };
            const guard2 = () => {
                return delayObservable(0).pipe((0, operators_1.tap)({ next: () => log.push('guard2') }));
            };
            const returnFalse = () => {
                log.push('returnFalse');
                return false;
            };
            const returnFalseAndNavigate = () => {
                log.push('returnFalseAndNavigate');
                (0, core_1.inject)(src_1.Router).navigateByUrl('/redirected');
                return false;
            };
            const returnUrlTree = () => {
                const router = (0, core_1.inject)(src_1.Router);
                return delayObservable(14).pipe((0, operators_1.mapTo)(router.parseUrl('/redirected')), (0, operators_1.tap)({ next: () => log.push('returnUrlTree') }));
            };
            beforeEach(() => {
                log = [];
            });
            it('should only execute canLoad guards of routes being activated', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                router.resetConfig([
                    {
                        path: 'lazy',
                        canLoad: [guard1],
                        loadChildren: () => (0, rxjs_1.of)(integration_helpers_1.ModuleWithBlankCmpAsRoute),
                    },
                    { path: 'redirected', component: integration_helpers_1.SimpleCmp },
                    // canLoad should not run for this route because 'lazy' activates first
                    {
                        path: '',
                        canLoad: [returnFalseAndNavigate],
                        loadChildren: () => (0, rxjs_1.of)(integration_helpers_1.ModuleWithBlankCmpAsRoute),
                    },
                ]);
                yield router.navigateByUrl('/lazy');
                (0, matchers_1.expect)(log.length).toEqual(1);
                (0, matchers_1.expect)(log).toEqual(['guard1']);
            }));
            it('should execute canLoad guards', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                router.resetConfig([
                    {
                        path: 'lazy',
                        canLoad: [guard1, guard2],
                        loadChildren: () => integration_helpers_1.ModuleWithBlankCmpAsRoute,
                    },
                ]);
                yield router.navigateByUrl('/lazy');
                (0, matchers_1.expect)(log.length).toEqual(2);
                (0, matchers_1.expect)(log).toEqual(['guard2', 'guard1']);
            }));
            it('should redirect with UrlTree if higher priority guards have resolved', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                router.resetConfig([
                    {
                        path: 'lazy',
                        canLoad: [returnUrlTree, guard1, guard2],
                        loadChildren: () => integration_helpers_1.ModuleWithBlankCmpAsRoute,
                    },
                    { path: 'redirected', component: integration_helpers_1.SimpleCmp },
                ]);
                yield router.navigateByUrl('/lazy');
                (0, matchers_1.expect)(log.length).toEqual(3);
                (0, matchers_1.expect)(log).toEqual(['guard2', 'guard1', 'returnUrlTree']);
                (0, matchers_1.expect)(location.path()).toEqual('/redirected');
            }));
            it('should redirect with UrlTree if UrlTree is lower priority', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const location = testing_1.TestBed.inject(common_1.Location);
                router.resetConfig([
                    {
                        path: 'lazy',
                        canLoad: [guard1, returnUrlTree],
                        loadChildren: () => integration_helpers_1.ModuleWithBlankCmpAsRoute,
                    },
                    { path: 'redirected', component: integration_helpers_1.SimpleCmp },
                ]);
                yield router.navigateByUrl('/lazy');
                (0, matchers_1.expect)(log.length).toEqual(2);
                (0, matchers_1.expect)(log).toEqual(['guard1', 'returnUrlTree']);
                (0, matchers_1.expect)(location.path()).toEqual('/redirected');
            }));
        });
        describe('order', () => {
            class Logger {
                constructor() {
                    this.logs = [];
                }
                add(thing) {
                    this.logs.push(thing);
                }
            }
            beforeEach(() => {
                testing_1.TestBed.configureTestingModule({
                    providers: [Logger],
                });
            });
            it('should call guards in the right order', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const logger = testing_1.TestBed.inject(Logger);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: '',
                        canActivateChild: [() => (logger.add('canActivateChild_parent'), true)],
                        children: [
                            {
                                path: 'team/:id',
                                canActivate: [() => (logger.add('canActivate_team'), true)],
                                canDeactivate: [() => (logger.add('canDeactivate_team'), true)],
                                component: integration_helpers_1.TeamCmp,
                            },
                        ],
                    },
                ]);
                router.navigateByUrl('/team/22');
                yield (0, integration_helpers_1.advance)(fixture);
                router.navigateByUrl('/team/33');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(logger.logs).toEqual([
                    'canActivateChild_parent',
                    'canActivate_team',
                    'canDeactivate_team',
                    'canActivateChild_parent',
                    'canActivate_team',
                ]);
            }));
            it('should call deactivate guards from bottom to top', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                const logger = testing_1.TestBed.inject(Logger);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.resetConfig([
                    {
                        path: '',
                        children: [
                            {
                                path: 'team/:id',
                                canDeactivate: [() => (logger.add('canDeactivate_team'), true)],
                                children: [
                                    {
                                        path: '',
                                        component: integration_helpers_1.SimpleCmp,
                                        canDeactivate: [() => (logger.add('canDeactivate_simple'), true)],
                                    },
                                ],
                                component: integration_helpers_1.TeamCmp,
                            },
                        ],
                    },
                ]);
                router.navigateByUrl('/team/22');
                yield (0, integration_helpers_1.advance)(fixture);
                router.navigateByUrl('/team/33');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(logger.logs).toEqual(['canDeactivate_simple', 'canDeactivate_team']);
            }));
        });
        describe('canMatch', () => {
            let ConfigurableGuard = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var ConfigurableGuard = _classThis = class {
                    constructor() {
                        this.result = false;
                    }
                    canMatch() {
                        return this.result;
                    }
                };
                __setFunctionName(_classThis, "ConfigurableGuard");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    ConfigurableGuard = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return ConfigurableGuard = _classThis;
            })();
            it('falls back to second route when canMatch returns false', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                router.resetConfig([
                    {
                        path: 'a',
                        canMatch: [() => (0, core_1.inject)(ConfigurableGuard).canMatch()],
                        component: integration_helpers_1.BlankCmp,
                    },
                    { path: 'a', component: integration_helpers_1.SimpleCmp },
                ]);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.navigateByUrl('/a');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('simple');
            }));
            it('uses route when canMatch returns true', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                testing_1.TestBed.inject(ConfigurableGuard).result = Promise.resolve(true);
                router.resetConfig([
                    {
                        path: 'a',
                        canMatch: [() => (0, core_1.inject)(ConfigurableGuard).canMatch()],
                        component: integration_helpers_1.SimpleCmp,
                    },
                    { path: 'a', component: integration_helpers_1.BlankCmp },
                ]);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.navigateByUrl('/a');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('simple');
            }));
            it('can return UrlTree from canMatch guard', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
                testing_1.TestBed.inject(ConfigurableGuard).result = Promise.resolve(router.createUrlTree(['/team/1']));
                router.resetConfig([
                    {
                        path: 'a',
                        canMatch: [() => (0, core_1.inject)(ConfigurableGuard).canMatch()],
                        component: integration_helpers_1.SimpleCmp,
                    },
                    { path: 'team/:id', component: integration_helpers_1.TeamCmp },
                ]);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.navigateByUrl('/a');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('team');
            }));
            it('can return UrlTree from CanMatchFn guard', () => __awaiter(this, void 0, void 0, function* () {
                const canMatchTeamSection = new core_1.InjectionToken('CanMatchTeamSection');
                const canMatchFactory = (router) => () => router.createUrlTree(['/team/1']);
                testing_1.TestBed.overrideProvider(canMatchTeamSection, {
                    useFactory: canMatchFactory,
                    deps: [src_1.Router],
                });
                const router = testing_1.TestBed.inject(src_1.Router);
                router.resetConfig([
                    { path: 'a', canMatch: [canMatchTeamSection], component: integration_helpers_1.SimpleCmp },
                    { path: 'team/:id', component: integration_helpers_1.TeamCmp },
                ]);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.navigateByUrl('/a');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('team');
            }));
            it('runs canMatch guards provided in lazy module', () => __awaiter(this, void 0, void 0, function* () {
                const router = testing_1.TestBed.inject(src_1.Router);
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
                let LazyCanMatchFalse = (() => {
                    let _classDecorators = [(0, core_1.Injectable)()];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var LazyCanMatchFalse = _classThis = class {
                        canMatch() {
                            return false;
                        }
                    };
                    __setFunctionName(_classThis, "LazyCanMatchFalse");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        LazyCanMatchFalse = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return LazyCanMatchFalse = _classThis;
                })();
                let Restricted = (() => {
                    let _classDecorators = [(0, core_1.Component)({
                            template: 'restricted',
                            standalone: false,
                        })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var Restricted = _classThis = class {
                    };
                    __setFunctionName(_classThis, "Restricted");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        Restricted = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return Restricted = _classThis;
                })();
                let LoadedModule = (() => {
                    let _classDecorators = [(0, core_1.NgModule)({
                            declarations: [ParentLazyLoadedComponent, ChildLazyLoadedComponent, Restricted],
                            providers: [LazyCanMatchFalse],
                            imports: [
                                src_1.RouterModule.forChild([
                                    {
                                        path: 'loaded',
                                        canMatch: [LazyCanMatchFalse],
                                        component: Restricted,
                                        children: [{ path: 'child', component: Restricted }],
                                    },
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
                (0, matchers_1.expect)(testing_1.TestBed.inject(common_1.Location).path()).toEqual('/lazy/loaded/child');
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('lazy-loaded-parent [lazy-loaded-child]');
            }));
            it('cancels guard execution when a new navigation happens', () => __awaiter(this, void 0, void 0, function* () {
                let DelayedGuard = (() => {
                    let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                    let _classDescriptor;
                    let _classExtraInitializers = [];
                    let _classThis;
                    var DelayedGuard = _classThis = class {
                        canMatch() {
                            return (0, rxjs_1.of)(true).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 10)).then(() => v)), (0, operators_1.tap)(() => {
                                DelayedGuard.delayedExecutions++;
                            }));
                        }
                    };
                    __setFunctionName(_classThis, "DelayedGuard");
                    (() => {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        DelayedGuard = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    })();
                    _classThis.delayedExecutions = 0;
                    (() => {
                        __runInitializers(_classThis, _classExtraInitializers);
                    })();
                    return DelayedGuard = _classThis;
                })();
                const router = testing_1.TestBed.inject(src_1.Router);
                const delayedGuardSpy = spyOn(testing_1.TestBed.inject(DelayedGuard), 'canMatch');
                delayedGuardSpy.and.callThrough();
                const configurableMatchSpy = spyOn(testing_1.TestBed.inject(ConfigurableGuard), 'canMatch');
                configurableMatchSpy.and.callFake(() => {
                    router.navigateByUrl('/team/1');
                    return false;
                });
                router.resetConfig([
                    { path: 'a', canMatch: [ConfigurableGuard, DelayedGuard], component: integration_helpers_1.SimpleCmp },
                    { path: 'a', canMatch: [ConfigurableGuard, DelayedGuard], component: integration_helpers_1.SimpleCmp },
                    { path: 'a', canMatch: [ConfigurableGuard, DelayedGuard], component: integration_helpers_1.SimpleCmp },
                    { path: 'team/:id', component: integration_helpers_1.TeamCmp },
                ]);
                const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
                router.navigateByUrl('/a');
                yield (0, integration_helpers_1.advance)(fixture);
                (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('team');
                (0, matchers_1.expect)(configurableMatchSpy.calls.count()).toEqual(1);
                // The delayed guard should not execute the delayed condition because the other guard
                // initiates a new navigation, which cancels the current one and unsubscribes from
                // intermediate results.
                (0, matchers_1.expect)(DelayedGuard.delayedExecutions).toEqual(0);
                // The delayed guard should still have executed once because guards are executed at the
                // same time
                (0, matchers_1.expect)(delayedGuardSpy.calls.count()).toEqual(1);
            }));
        });
        it('should allow guards as functions', () => __awaiter(this, void 0, void 0, function* () {
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
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            const guards = {
                canActivate() {
                    return true;
                },
                canDeactivate() {
                    return true;
                },
                canActivateChild() {
                    return true;
                },
                canMatch() {
                    return true;
                },
                canLoad() {
                    return true;
                },
            };
            spyOn(guards, 'canActivate').and.callThrough();
            spyOn(guards, 'canActivateChild').and.callThrough();
            spyOn(guards, 'canDeactivate').and.callThrough();
            spyOn(guards, 'canLoad').and.callThrough();
            spyOn(guards, 'canMatch').and.callThrough();
            router.resetConfig([
                {
                    path: '',
                    component: BlankCmp,
                    loadChildren: () => [{ path: '', component: BlankCmp }],
                    canActivate: [guards.canActivate],
                    canActivateChild: [guards.canActivateChild],
                    canLoad: [guards.canLoad],
                    canDeactivate: [guards.canDeactivate],
                    canMatch: [guards.canMatch],
                },
                {
                    path: 'other',
                    component: BlankCmp,
                },
            ]);
            router.navigateByUrl('/');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(guards.canMatch).toHaveBeenCalled();
            (0, matchers_1.expect)(guards.canLoad).toHaveBeenCalled();
            (0, matchers_1.expect)(guards.canActivate).toHaveBeenCalled();
            (0, matchers_1.expect)(guards.canActivateChild).toHaveBeenCalled();
            router.navigateByUrl('/other');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(guards.canDeactivate).toHaveBeenCalled();
        }));
        it('should allow DI in plain function guards', () => __awaiter(this, void 0, void 0, function* () {
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
            let State = (() => {
                let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var State = _classThis = class {
                    constructor() {
                        this.value = true;
                    }
                };
                __setFunctionName(_classThis, "State");
                (() => {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    State = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                })();
                return State = _classThis;
            })();
            const router = testing_1.TestBed.inject(src_1.Router);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            const guards = {
                canActivate() {
                    return (0, core_1.inject)(State).value;
                },
                canDeactivate() {
                    return (0, core_1.inject)(State).value;
                },
                canActivateChild() {
                    return (0, core_1.inject)(State).value;
                },
                canMatch() {
                    return (0, core_1.inject)(State).value;
                },
                canLoad() {
                    return (0, core_1.inject)(State).value;
                },
            };
            spyOn(guards, 'canActivate').and.callThrough();
            spyOn(guards, 'canActivateChild').and.callThrough();
            spyOn(guards, 'canDeactivate').and.callThrough();
            spyOn(guards, 'canLoad').and.callThrough();
            spyOn(guards, 'canMatch').and.callThrough();
            router.resetConfig([
                {
                    path: '',
                    component: BlankCmp,
                    loadChildren: () => [{ path: '', component: BlankCmp }],
                    canActivate: [guards.canActivate],
                    canActivateChild: [guards.canActivateChild],
                    canLoad: [guards.canLoad],
                    canDeactivate: [guards.canDeactivate],
                    canMatch: [guards.canMatch],
                },
                {
                    path: 'other',
                    component: BlankCmp,
                },
            ]);
            router.navigateByUrl('/');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(guards.canMatch).toHaveBeenCalled();
            (0, matchers_1.expect)(guards.canLoad).toHaveBeenCalled();
            (0, matchers_1.expect)(guards.canActivate).toHaveBeenCalled();
            (0, matchers_1.expect)(guards.canActivateChild).toHaveBeenCalled();
            router.navigateByUrl('/other');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(guards.canDeactivate).toHaveBeenCalled();
        }));
        it('can run functional guards serially', () => __awaiter(this, void 0, void 0, function* () {
            function runSerially(guards) {
                return (route, state) => {
                    const injector = (0, core_1.inject)(core_1.EnvironmentInjector);
                    const observables = guards.map((guard) => {
                        const guardResult = injector.runInContext(() => guard(route, state));
                        return (0, collection_1.wrapIntoObservable)(guardResult).pipe((0, operators_1.first)());
                    });
                    return (0, rxjs_1.concat)(...observables).pipe((0, operators_1.takeWhile)((v) => v === true), (0, operators_1.last)());
                };
            }
            const guardDone = [];
            const guard1 = () => (0, rxjs_1.of)(true).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 4)).then(() => v)), (0, operators_1.tap)(() => guardDone.push('guard1')));
            const guard2 = () => (0, rxjs_1.of)(true).pipe((0, operators_1.tap)(() => guardDone.push('guard2')));
            const guard3 = () => (0, rxjs_1.of)(true).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 2)).then(() => v)), (0, operators_1.tap)(() => guardDone.push('guard3')));
            const guard4 = () => (0, rxjs_1.of)(true).pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 6)).then(() => v)), (0, operators_1.tap)(() => guardDone.push('guard4')));
            const router = testing_1.TestBed.inject(src_1.Router);
            router.resetConfig([
                {
                    path: '**',
                    component: integration_helpers_1.BlankCmp,
                    canActivate: [runSerially([guard1, guard2, guard3, guard4])],
                },
            ]);
            yield router.navigateByUrl('');
            (0, matchers_1.expect)(guardDone).toEqual(['guard1', 'guard2', 'guard3', 'guard4']);
        }));
    });
}
