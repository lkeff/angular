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
exports.eagerUrlUpdateStrategyIntegrationSuite = eagerUrlUpdateStrategyIntegrationSuite;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const testing_1 = require("@angular/core/testing");
const src_1 = require("../../src");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const integration_helpers_1 = require("./integration_helpers");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const helpers_1 = require("../helpers");
function eagerUrlUpdateStrategyIntegrationSuite() {
    describe('"eager" urlUpdateStrategy', () => {
        let AuthGuard = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AuthGuard = _classThis = class {
                constructor() {
                    this.canActivateResult = true;
                }
                canActivate() {
                    return this.canActivateResult;
                }
            };
            __setFunctionName(_classThis, "AuthGuard");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AuthGuard = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AuthGuard = _classThis;
        })();
        let DelayedGuard = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var DelayedGuard = _classThis = class {
                canActivate() {
                    return (0, rxjs_1.of)('').pipe((0, operators_1.switchMap)((v) => new Promise((r) => setTimeout(r, 10)).then(() => v)), (0, operators_1.mapTo)(true));
                }
            };
            __setFunctionName(_classThis, "DelayedGuard");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                DelayedGuard = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return DelayedGuard = _classThis;
        })();
        beforeEach(() => {
            const serializer = new src_1.DefaultUrlSerializer();
            testing_1.TestBed.configureTestingModule({
                providers: [
                    AuthGuard,
                    DelayedGuard,
                    (0, src_1.provideRouter)([], (0, src_1.withRouterConfig)({ urlUpdateStrategy: 'eager' })),
                ],
            });
        });
        it('should eagerly update the URL', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            yield (0, integration_helpers_1.advance)(fixture);
            router.resetConfig([{ path: 'team/:id', component: integration_helpers_1.TeamCmp }]);
            router.navigateByUrl('/team/22');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ , right:  ]');
            router.events.subscribe((e) => {
                if (!(e instanceof src_1.GuardsCheckStart)) {
                    return;
                }
                (0, matchers_1.expect)(location.path()).toEqual('/team/33');
                (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ , right:  ]');
                return (0, rxjs_1.of)(null);
            });
            router.navigateByUrl('/team/33');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 33 [ , right:  ]');
        }));
        it('should eagerly update the URL', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            yield (0, integration_helpers_1.advance)(fixture);
            router.resetConfig([
                {
                    path: 'team/:id',
                    component: integration_helpers_1.SimpleCmp,
                    canActivate: [
                        () => new Promise((res) => {
                            setTimeout(() => res(new src_1.DefaultUrlSerializer().parse('/login')), 1);
                        }),
                    ],
                },
                { path: 'login', component: integration_helpers_1.AbsoluteSimpleLinkCmp },
            ]);
            router.navigateByUrl('/team/22');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
            // Redirects to /login
            yield (0, integration_helpers_1.advance)(fixture, 1);
            (0, matchers_1.expect)(location.path()).toEqual('/login');
            // Perform the same logic again, and it should produce the same result
            router.navigateByUrl('/team/22');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
            // Redirects to /login
            yield (0, integration_helpers_1.advance)(fixture, 1);
            (0, matchers_1.expect)(location.path()).toEqual('/login');
        }));
        it('should eagerly update URL after redirects are applied', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            yield (0, integration_helpers_1.advance)(fixture);
            router.resetConfig([{ path: 'team/:id', component: integration_helpers_1.TeamCmp }]);
            router.navigateByUrl('/team/22');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/team/22');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 22 [ , right:  ]');
            let urlAtNavStart = '';
            let urlAtRoutesRecognized = '';
            router.events.subscribe((e) => {
                if (e instanceof src_1.NavigationStart) {
                    urlAtNavStart = location.path();
                }
                if (e instanceof src_1.RoutesRecognized) {
                    urlAtRoutesRecognized = location.path();
                }
            });
            router.navigateByUrl('/team/33');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(urlAtNavStart).toBe('/team/22');
            (0, matchers_1.expect)(urlAtRoutesRecognized).toBe('/team/33');
            (0, matchers_1.expect)(fixture.nativeElement).toHaveText('team 33 [ , right:  ]');
        }));
        it('should set `state`', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: '', component: integration_helpers_1.SimpleCmp },
                { path: 'simple', component: integration_helpers_1.SimpleCmp },
            ]);
            yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            let navigation = null;
            router.events.subscribe((e) => {
                if (e instanceof src_1.NavigationStart) {
                    navigation = router.getCurrentNavigation();
                }
            });
            router.navigateByUrl('/simple', { state: { foo: 'bar' } });
            yield (0, helpers_1.timeout)();
            const state = location.getState();
            (0, matchers_1.expect)(state).toEqual({ foo: 'bar', navigationId: 2 });
            (0, matchers_1.expect)(navigation.extras.state).toBeDefined();
            (0, matchers_1.expect)(navigation.extras.state).toEqual({ foo: 'bar' });
        }));
        it('can renavigate to rejected URL', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const canActivate = testing_1.TestBed.inject(AuthGuard);
            const location = testing_1.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: '', component: integration_helpers_1.BlankCmp },
                {
                    path: 'simple',
                    component: integration_helpers_1.SimpleCmp,
                    canActivate: [() => (0, core_1.inject)(AuthGuard).canActivate()],
                },
            ]);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            // Try to navigate to /simple but guard rejects
            canActivate.canActivateResult = false;
            router.navigateByUrl('/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('');
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).not.toContain('simple');
            // Renavigate to /simple without guard rejection, should succeed.
            canActivate.canActivateResult = true;
            router.navigateByUrl('/simple');
            yield (0, integration_helpers_1.advance)(fixture);
            (0, matchers_1.expect)(location.path()).toEqual('/simple');
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('simple');
        }));
        it('can renavigate to same URL during in-flight navigation', () => __awaiter(this, void 0, void 0, function* () {
            const router = testing_1.TestBed.inject(src_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            router.resetConfig([
                { path: '', component: integration_helpers_1.BlankCmp },
                {
                    path: 'simple',
                    component: integration_helpers_1.SimpleCmp,
                    canActivate: [() => (0, core_1.inject)(DelayedGuard).canActivate()],
                },
            ]);
            const fixture = yield (0, integration_helpers_1.createRoot)(router, integration_helpers_1.RootCmp);
            // Start navigating to /simple, but do not flush the guard delay
            router.navigateByUrl('/simple');
            yield (0, helpers_1.timeout)();
            // eager update strategy so URL is already updated.
            (0, matchers_1.expect)(location.path()).toEqual('/simple');
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).not.toContain('simple');
            // Start an additional navigation to /simple and ensure at least one of those succeeds.
            // It's not super important which one gets processed, but in the past, the router would
            // cancel the in-flight one and not process the new one.
            yield router.navigateByUrl('/simple');
            (0, matchers_1.expect)(location.path()).toEqual('/simple');
            (0, matchers_1.expect)(fixture.nativeElement.innerHTML).toContain('simple');
        }));
    });
}
