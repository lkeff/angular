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
exports.navigationErrorsIntegrationSuite = navigationErrorsIntegrationSuite;
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const common_1 = require("@angular/common");
const testing_1 = require("@angular/core/testing");
const src_1 = require("../../src");
const testing_2 = require("../../testing");
const integration_helpers_1 = require("./integration_helpers");
const helpers_1 = require("../helpers");
function navigationErrorsIntegrationSuite() {
    it('should handle failed navigations gracefully', () => __awaiter(this, void 0, void 0, function* () {
        const router = testing_1.TestBed.inject(src_1.Router);
        const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
        router.resetConfig([{ path: 'user/:name', component: integration_helpers_1.UserCmp }]);
        const recordedEvents = [];
        router.events.forEach((e) => recordedEvents.push(e));
        let e;
        router.navigateByUrl('/invalid').catch((_) => (e = _));
        yield (0, integration_helpers_1.advance)(fixture);
        (0, matchers_1.expect)(e.message).toContain('Cannot match any routes');
        router.navigateByUrl('/user/fedor');
        yield (0, integration_helpers_1.advance)(fixture);
        (0, matchers_1.expect)(fixture.nativeElement).toHaveText('user fedor');
        (0, integration_helpers_1.expectEvents)(recordedEvents, [
            [src_1.NavigationStart, '/invalid'],
            [src_1.NavigationError, '/invalid'],
            [src_1.NavigationStart, '/user/fedor'],
            [src_1.RoutesRecognized, '/user/fedor'],
            [src_1.GuardsCheckStart, '/user/fedor'],
            [src_1.ChildActivationStart],
            [src_1.ActivationStart],
            [src_1.GuardsCheckEnd, '/user/fedor'],
            [src_1.ResolveStart, '/user/fedor'],
            [src_1.ResolveEnd, '/user/fedor'],
            [src_1.ActivationEnd],
            [src_1.ChildActivationEnd],
            [src_1.NavigationEnd, '/user/fedor'],
        ]);
    }));
    it('should be able to provide an error handler with DI dependencies', () => __awaiter(this, void 0, void 0, function* () {
        let Handler = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var Handler = _classThis = class {
                constructor() {
                    this.handlerCalled = false;
                }
            };
            __setFunctionName(_classThis, "Handler");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                Handler = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return Handler = _classThis;
        })();
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, src_1.provideRouter)([
                    {
                        path: 'throw',
                        canMatch: [
                            () => {
                                throw new Error('');
                            },
                        ],
                        component: integration_helpers_1.BlankCmp,
                    },
                ], (0, src_1.withRouterConfig)({ resolveNavigationPromiseOnError: true }), (0, src_1.withNavigationErrorHandler)(() => ((0, core_1.inject)(Handler).handlerCalled = true))),
            ],
        });
        const router = testing_1.TestBed.inject(src_1.Router);
        yield router.navigateByUrl('/throw');
        (0, matchers_1.expect)(testing_1.TestBed.inject(Handler).handlerCalled).toBeTrue();
    }));
    it('can redirect from error handler with RouterModule.forRoot', () => __awaiter(this, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                src_1.RouterModule.forRoot([
                    {
                        path: 'throw',
                        canMatch: [
                            () => {
                                throw new Error('');
                            },
                        ],
                        component: integration_helpers_1.BlankCmp,
                    },
                    { path: 'error', component: integration_helpers_1.BlankCmp },
                ], {
                    resolveNavigationPromiseOnError: true,
                    errorHandler: () => new src_1.RedirectCommand((0, core_1.inject)(src_1.Router).parseUrl('/error')),
                }),
            ],
        });
        const router = testing_1.TestBed.inject(src_1.Router);
        let emitNavigationError = false;
        let emitNavigationCancelWithRedirect = false;
        router.events.subscribe((e) => {
            if (e instanceof src_1.NavigationError) {
                emitNavigationError = true;
            }
            if (e instanceof src_1.NavigationCancel && e.code === src_1.NavigationCancellationCode.Redirect) {
                emitNavigationCancelWithRedirect = true;
            }
        });
        yield router.navigateByUrl('/throw');
        (0, matchers_1.expect)(router.url).toEqual('/error');
        (0, matchers_1.expect)(emitNavigationError).toBe(false);
        (0, matchers_1.expect)(emitNavigationCancelWithRedirect).toBe(true);
    }));
    it('can redirect from error handler', () => __awaiter(this, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, src_1.provideRouter)([
                    {
                        path: 'throw',
                        canMatch: [
                            () => {
                                throw new Error('');
                            },
                        ],
                        component: integration_helpers_1.BlankCmp,
                    },
                    { path: 'error', component: integration_helpers_1.BlankCmp },
                ], (0, src_1.withRouterConfig)({ resolveNavigationPromiseOnError: true }), (0, src_1.withNavigationErrorHandler)(() => new src_1.RedirectCommand((0, core_1.inject)(src_1.Router).parseUrl('/error')))),
            ],
        });
        const router = testing_1.TestBed.inject(src_1.Router);
        let emitNavigationError = false;
        let emitNavigationCancelWithRedirect = false;
        router.events.subscribe((e) => {
            if (e instanceof src_1.NavigationError) {
                emitNavigationError = true;
            }
            if (e instanceof src_1.NavigationCancel && e.code === src_1.NavigationCancellationCode.Redirect) {
                emitNavigationCancelWithRedirect = true;
            }
        });
        yield router.navigateByUrl('/throw');
        (0, matchers_1.expect)(router.url).toEqual('/error');
        (0, matchers_1.expect)(emitNavigationError).toBe(false);
        (0, matchers_1.expect)(emitNavigationCancelWithRedirect).toBe(true);
    }));
    it('should not break navigation if an error happens in NavigationErrorHandler', () => __awaiter(this, void 0, void 0, function* () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                (0, src_1.provideRouter)([
                    {
                        path: 'throw',
                        canMatch: [
                            () => {
                                throw new Error('');
                            },
                        ],
                        component: integration_helpers_1.BlankCmp,
                    },
                    { path: '**', component: integration_helpers_1.BlankCmp },
                ], (0, src_1.withRouterConfig)({ resolveNavigationPromiseOnError: true }), (0, src_1.withNavigationErrorHandler)(() => {
                    throw new Error('e');
                })),
            ],
        });
        const router = testing_1.TestBed.inject(src_1.Router);
    }));
    // Errors should behave the same for both deferred and eager URL update strategies
    ['deferred', 'eager'].forEach((urlUpdateStrategy) => {
        it('should dispatch NavigationError after the url has been reset back', () => __awaiter(this, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ urlUpdateStrategy }))],
            });
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
                { path: 'throwing', component: integration_helpers_1.ThrowingCmp },
            ]);
            router.navigateByUrl('/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            let routerUrlBeforeEmittingError = '';
            let locationUrlBeforeEmittingError = '';
            router.events.forEach((e) => {
                if (e instanceof src_1.NavigationError) {
                    routerUrlBeforeEmittingError = router.url;
                    locationUrlBeforeEmittingError = location.path();
                }
            });
            router.navigateByUrl('/throwing').catch(() => null);
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(routerUrlBeforeEmittingError).toEqual('/simple');
            (0, matchers_1.expect)(locationUrlBeforeEmittingError).toEqual('/simple');
        }));
        it('can renavigate to throwing component', () => __awaiter(this, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ urlUpdateStrategy: 'eager' }))],
            });
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: '', component: integration_helpers_1.BlankCmp },
                { path: 'throwing', component: integration_helpers_1.ConditionalThrowingCmp },
            ]);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            // Try navigating to a component which throws an error during activation.
            integration_helpers_1.ConditionalThrowingCmp.throwError = true;
            yield expectAsync(router.navigateByUrl('/throwing')).toBeRejected();
            (0, matchers_1.expect)(location.path()).toEqual('');
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).not.toContain('throwing');
            // Ensure we can re-navigate to that same URL and succeed.
            integration_helpers_1.ConditionalThrowingCmp.throwError = false;
            router.navigateByUrl('/throwing');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/throwing');
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('throwing');
        }));
        it('should reset the url with the right state when navigation errors', () => __awaiter(this, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ urlUpdateStrategy }))],
            });
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'simple1', component: integration_helpers_1.SimpleCmp },
                { path: 'simple2', component: integration_helpers_1.SimpleCmp },
                { path: 'throwing', component: integration_helpers_1.ThrowingCmp },
            ]);
            let event;
            router.events.subscribe((e) => {
                if (e instanceof src_1.NavigationStart) {
                    event = e;
                }
            });
            router.navigateByUrl('/simple1');
            yield (0, integration_helpers_1.advance)(fixture);
            const simple1NavStart = event;
            router.navigateByUrl('/throwing').catch(() => null);
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('/simple2');
            yield (0, integration_helpers_1.advance)(fixture);
            location.back();
            yield (0, helpers_1.timeout)();
            (0, matchers_1.expect)(event.restoredState.navigationId).toEqual(simple1NavStart.id);
        }));
        it('should not trigger another navigation when resetting the url back due to a NavigationError', () => __awaiter(this, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [(0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ urlUpdateStrategy }))],
            });
            const router = testing_1.TestBed.inject(src_1.Router);
            router.onSameUrlNavigation = 'reload';
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            router.resetConfig([
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
                { path: 'throwing', component: integration_helpers_1.ThrowingCmp },
            ]);
            const events = [];
            router.events.forEach((e) => {
                if (e instanceof src_1.NavigationStart) {
                    events.push(e.url);
                }
            });
            router.navigateByUrl('/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            router.navigateByUrl('/throwing').catch(() => null);
            yield (0, integration_helpers_1.advance)(fixture);
            // we do not trigger another navigation to /simple
            (0, matchers_1.expect)(events).toEqual(['/simple', '/throwing']);
        }));
    });
    it('should dispatch NavigationCancel after the url has been reset back', () => __awaiter(this, void 0, void 0, function* () {
        const router = testing_1.TestBed.inject(src_1.Router);
        const location = testing_1.TestBed.inject(common_1.Location);
        const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
        router.resetConfig([
            { path: 'simple', component: integration_helpers_1.SimpleCmp },
            {
                path: 'throwing',
                loadChildren: jasmine.createSpy('doesnotmatter'),
                canLoad: [() => false],
            },
        ]);
        router.navigateByUrl('/simple');
        yield (0, integration_helpers_1.advance)(fixture);
        let routerUrlBeforeEmittingError = '';
        let locationUrlBeforeEmittingError = '';
        router.events.forEach((e) => {
            if (e instanceof src_1.NavigationCancel) {
                (0, matchers_1.expect)(e.code).toBe(src_1.NavigationCancellationCode.GuardRejected);
                routerUrlBeforeEmittingError = router.url;
                locationUrlBeforeEmittingError = location.path();
            }
        });
        location.go('/throwing');
        location.historyGo(0);
        yield (0, integration_helpers_1.advance)(fixture);
        (0, matchers_1.expect)(routerUrlBeforeEmittingError).toEqual('/simple');
        (0, matchers_1.expect)(locationUrlBeforeEmittingError).toEqual('/simple');
    }));
    it('should recover from malformed uri errors', () => __awaiter(this, void 0, void 0, function* () {
        const router = testing_1.TestBed.inject(src_1.Router);
        const location = testing_1.TestBed.inject(common_1.Location);
        router.resetConfig([{ path: 'simple', component: integration_helpers_1.SimpleCmp }]);
        const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
        router.navigateByUrl('/invalid/url%with%percent');
        yield (0, integration_helpers_1.advance)(fixture);
        (0, matchers_1.expect)(location.path()).toEqual('');
    }));
    it('should not swallow errors', () => __awaiter(this, void 0, void 0, function* () {
        const router = testing_1.TestBed.inject(src_1.Router);
        const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
        router.resetConfig([{ path: 'simple', component: integration_helpers_1.SimpleCmp }]);
        yield expectAsync(router.navigateByUrl('/invalid')).toBeRejected();
        yield expectAsync(router.navigateByUrl('/invalid2')).toBeRejected();
    }));
    it('should not swallow errors from browser state update', () => __awaiter(this, void 0, void 0, function* () {
        const routerEvents = [];
        testing_1.TestBed.inject(src_1.Router).resetConfig([{ path: '**', component: integration_helpers_1.BlankCmp }]);
        testing_1.TestBed.inject(src_1.Router).events.subscribe((e) => {
            routerEvents.push(e);
        });
        spyOn(testing_1.TestBed.inject(common_1.Location), 'go').and.callFake(() => {
            throw new Error();
        });
        try {
            yield testing_2.RouterTestingHarness.create('/abc123');
        }
        catch (_a) { }
        // Ensure the first event is the start and that we get to the ResolveEnd event. If this is not
        // true, then NavigationError may have been triggered at a time we don't expect here.
        (0, matchers_1.expect)(routerEvents[0]).toBeInstanceOf(src_1.NavigationStart);
        (0, matchers_1.expect)(routerEvents[routerEvents.length - 2]).toBeInstanceOf(src_1.ResolveEnd);
        (0, matchers_1.expect)(routerEvents[routerEvents.length - 1]).toBeInstanceOf(src_1.NavigationError);
    }));
    it('should throw an error when one of the commands is null/undefined', () => __awaiter(this, void 0, void 0, function* () {
        const router = testing_1.TestBed.inject(src_1.Router);
        yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
        router.resetConfig([{ path: 'query', component: integration_helpers_1.EmptyQueryParamsCmp }]);
        (0, matchers_1.expect)(() => router.navigate([undefined, 'query'])).toThrowError(/The requested path contains undefined segment at index 0/);
    }));
}
