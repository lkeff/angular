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
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const matchers_1 = require("@angular/platform-browser/testing/src/matchers");
const index_1 = require("../index");
const rxjs_1 = require("rxjs");
const provide_router_1 = require("../src/provide_router");
const url_tree_1 = require("../src/url_tree");
const helpers_1 = require("./helpers");
const navigations_1 = require("../src/utils/navigations");
describe('`restoredState#ɵrouterPageId`', () => {
    let MyCanDeactivateGuard = (() => {
        let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MyCanDeactivateGuard = _classThis = class {
            constructor() {
                this.allow = true;
            }
            canDeactivate() {
                return this.allow;
            }
        };
        __setFunctionName(_classThis, "MyCanDeactivateGuard");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyCanDeactivateGuard = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyCanDeactivateGuard = _classThis;
    })();
    let ThrowingCanActivateGuard = (() => {
        let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var ThrowingCanActivateGuard = _classThis = class {
            constructor(router) {
                this.router = router;
                this.throw = false;
            }
            canActivate() {
                if (this.throw) {
                    throw new Error('error in guard');
                }
                return true;
            }
        };
        __setFunctionName(_classThis, "ThrowingCanActivateGuard");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ThrowingCanActivateGuard = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return ThrowingCanActivateGuard = _classThis;
    })();
    let MyCanActivateGuard = (() => {
        let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MyCanActivateGuard = _classThis = class {
            constructor(router) {
                this.router = router;
                this.allow = true;
                this.redirectTo = null;
            }
            canActivate() {
                if (typeof this.redirectTo === 'string') {
                    this.router.navigateByUrl(this.redirectTo);
                }
                else if ((0, url_tree_1.isUrlTree)(this.redirectTo)) {
                    return this.redirectTo;
                }
                return this.allow;
            }
        };
        __setFunctionName(_classThis, "MyCanActivateGuard");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyCanActivateGuard = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyCanActivateGuard = _classThis;
    })();
    let MyResolve = (() => {
        let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var MyResolve = _classThis = class {
            constructor() {
                this.myresolve = (0, rxjs_1.of)(2);
            }
            resolve() {
                return this.myresolve;
            }
        };
        __setFunctionName(_classThis, "MyResolve");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            MyResolve = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return MyResolve = _classThis;
    })();
    let fixture;
    function createNavigationHistory() {
        return __awaiter(this, arguments, void 0, function* (urlUpdateStrategy = 'deferred') {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, provide_router_1.provideRouter)([
                        {
                            path: 'first',
                            component: SimpleCmp,
                            canDeactivate: [MyCanDeactivateGuard],
                            canActivate: [MyCanActivateGuard, ThrowingCanActivateGuard],
                            resolve: { x: MyResolve },
                        },
                        {
                            path: 'second',
                            component: SimpleCmp,
                            canDeactivate: [MyCanDeactivateGuard],
                            canActivate: [MyCanActivateGuard, ThrowingCanActivateGuard],
                            resolve: { x: MyResolve },
                        },
                        {
                            path: 'third',
                            component: SimpleCmp,
                            canDeactivate: [MyCanDeactivateGuard],
                            canActivate: [MyCanActivateGuard, ThrowingCanActivateGuard],
                            resolve: { x: MyResolve },
                        },
                        {
                            path: 'unguarded',
                            component: SimpleCmp,
                        },
                        {
                            path: 'throwing',
                            component: ThrowingCmp,
                        },
                        {
                            path: 'loaded',
                            loadChildren: () => (0, rxjs_1.of)(ModuleWithSimpleCmpAsRoute),
                            canLoad: [() => false],
                        },
                    ], (0, index_1.withRouterConfig)({
                        urlUpdateStrategy,
                        canceledNavigationResolution: 'computed',
                        resolveNavigationPromiseOnError: true,
                    })),
                ],
            });
            const router = testing_1.TestBed.inject(index_1.Router);
            const location = testing_1.TestBed.inject(common_1.Location);
            fixture = yield createRoot(router, RootCmp);
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 0 }));
            yield router.navigateByUrl('/first');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
            yield router.navigateByUrl('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            yield router.navigateByUrl('/third');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 3 }));
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
        });
    }
    describe('deferred url updates', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createNavigationHistory();
        }));
        it('should work when CanActivate returns false', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            testing_1.TestBed.inject(MyCanActivateGuard).allow = false;
            location.back();
            yield nextNavigation();
            yield (0, helpers_1.timeout)(5);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            testing_1.TestBed.inject(MyCanActivateGuard).allow = true;
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
            testing_1.TestBed.inject(MyCanActivateGuard).allow = false;
            location.forward();
            yield nextNavigation();
            yield (0, helpers_1.timeout)(5);
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
            yield router.navigateByUrl('/second');
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
        }));
        it('should work when CanDeactivate returns false', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            testing_1.TestBed.inject(MyCanDeactivateGuard).allow = false;
            location.back();
            yield nextNavigation();
            yield (0, helpers_1.timeout)(5);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            location.forward();
            yield nextNavigation();
            yield (0, helpers_1.timeout)(5);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            yield router.navigateByUrl('third');
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            testing_1.TestBed.inject(MyCanDeactivateGuard).allow = true;
            location.forward();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/third');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 3 }));
        }));
        it('should work when using `NavigationExtras.skipLocationChange`', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            yield router.navigateByUrl('/first', { skipLocationChange: true });
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            yield router.navigateByUrl('/third');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 3 }));
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
        }));
        it('should work when using `NavigationExtras.replaceUrl`', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            yield router.navigateByUrl('/first', { replaceUrl: true });
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            (0, matchers_1.expect)(location.path()).toEqual('/first');
        }));
        it('should work when CanLoad returns false', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            yield router.navigateByUrl('/loaded');
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
        }));
        it('should work when resolve empty', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            testing_1.TestBed.inject(MyResolve).myresolve = rxjs_1.EMPTY;
            location.back();
            yield nextNavigation();
            yield (0, helpers_1.timeout)(5);
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            testing_1.TestBed.inject(MyResolve).myresolve = (0, rxjs_1.of)(2);
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            testing_1.TestBed.inject(MyResolve).myresolve = rxjs_1.EMPTY;
            // We should cancel the navigation to `/third` when myresolve is empty
            yield router.navigateByUrl('/third');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            location.historyGo(2);
            yield nextNavigation();
            yield (0, helpers_1.timeout)(5);
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            testing_1.TestBed.inject(MyResolve).myresolve = (0, rxjs_1.of)(2);
            location.historyGo(2);
            yield nextNavigation();
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 3 }));
            (0, matchers_1.expect)(location.path()).toEqual('/third');
            testing_1.TestBed.inject(MyResolve).myresolve = rxjs_1.EMPTY;
            location.historyGo(-2);
            yield nextNavigation();
            yield (0, helpers_1.timeout)(5);
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 3 }));
            (0, matchers_1.expect)(location.path()).toEqual('/third');
        }));
        it('should work when an error occurred during navigation', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            yield router.navigateByUrl('/invalid').catch(() => null);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
        }));
        it('should work when CanActivate redirects', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            testing_1.TestBed.inject(MyCanActivateGuard).redirectTo = '/unguarded';
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/unguarded');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            testing_1.TestBed.inject(MyCanActivateGuard).redirectTo = null;
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
        }));
        it('restores history correctly when component throws error in constructor and replaceUrl=true', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            yield router.navigateByUrl('/throwing', { replaceUrl: true }).catch(() => null);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
        }));
        it('restores history correctly when component throws error in constructor and skipLocationChange=true', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            yield router.navigateByUrl('/throwing', { skipLocationChange: true }).catch(() => null);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
        }));
    });
    describe('eager url updates', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createNavigationHistory('eager');
        }));
        it('should work', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            testing_1.TestBed.inject(MyCanActivateGuard).allow = false;
            yield router.navigateByUrl('/first');
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
        }));
        it('should work when CanActivate redirects', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            testing_1.TestBed.inject(MyCanActivateGuard).redirectTo = '/unguarded';
            yield router.navigateByUrl('/third');
            (0, matchers_1.expect)(location.path()).toEqual('/unguarded');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 4 }));
            testing_1.TestBed.inject(MyCanActivateGuard).redirectTo = null;
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/third');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 3 }));
        }));
        it('should work when CanActivate redirects with UrlTree', () => __awaiter(void 0, void 0, void 0, function* () {
            // Note that this test is different from the above case because we are able to specifically
            // handle the `UrlTree` case as a proper redirect and set `replaceUrl: true` on the
            // follow-up navigation.
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            let allowNavigation = true;
            router.resetConfig([
                { path: 'initial', children: [] },
                { path: 'redirectFrom', redirectTo: 'redirectTo' },
                { path: 'redirectTo', children: [], canActivate: [() => allowNavigation] },
            ]);
            // already at '2' from the `beforeEach` navigations
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            yield router.navigateByUrl('/initial');
            (0, matchers_1.expect)(location.path()).toEqual('/initial');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 3 }));
            testing_1.TestBed.inject(MyCanActivateGuard).redirectTo = null;
            yield router.navigateByUrl('redirectTo');
            (0, matchers_1.expect)(location.path()).toEqual('/redirectTo');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 4 }));
            // Navigate to different URL but get redirected to same URL should result in same page id
            yield router.navigateByUrl('redirectFrom');
            (0, matchers_1.expect)(location.path()).toEqual('/redirectTo');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 4 }));
            // Back and forward should have page IDs 1 apart
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/initial');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 3 }));
            location.forward();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/redirectTo');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 4 }));
            // Rejected navigation after redirect to same URL should have the same page ID
            allowNavigation = false;
            yield router.navigateByUrl('redirectFrom');
            (0, matchers_1.expect)(location.path()).toEqual('/redirectTo');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 4 }));
        }));
        it('redirectTo with same url, and guard reject', () => __awaiter(void 0, void 0, void 0, function* () {
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            testing_1.TestBed.inject(MyCanActivateGuard).redirectTo = router.createUrlTree(['unguarded']);
            yield router.navigateByUrl('/third');
            (0, matchers_1.expect)(location.path()).toEqual('/unguarded');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 3 }));
            testing_1.TestBed.inject(MyCanActivateGuard).redirectTo = null;
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
        }));
    });
    for (const urlUpdateStrategy of ['deferred', 'eager']) {
        it(`restores history correctly when an error is thrown in guard with urlUpdateStrategy ${urlUpdateStrategy}`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield createNavigationHistory(urlUpdateStrategy);
            const location = testing_1.TestBed.inject(common_1.Location);
            testing_1.TestBed.inject(ThrowingCanActivateGuard).throw = true;
            location.back();
            yield nextNavigation();
            yield (0, helpers_1.timeout)(5);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            testing_1.TestBed.inject(ThrowingCanActivateGuard).throw = false;
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
        }));
        it(`restores history correctly when component throws error in constructor with urlUpdateStrategy ${urlUpdateStrategy}`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield createNavigationHistory(urlUpdateStrategy);
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            yield router.navigateByUrl('/throwing').catch(() => null);
            yield (0, helpers_1.timeout)(5);
            (0, matchers_1.expect)(location.path()).toEqual('/second');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            location.back();
            yield nextNavigation();
            (0, matchers_1.expect)(location.path()).toEqual('/first');
            (0, matchers_1.expect)(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
        }));
    }
});
function createRoot(router, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const f = testing_1.TestBed.createComponent(type);
        router.initialNavigation();
        yield nextNavigation();
        return f;
    });
}
let SimpleCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'simple-cmp',
            template: `simple`,
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
let ModuleWithSimpleCmpAsRoute = (() => {
    let _classDecorators = [(0, core_1.NgModule)({ imports: [index_1.RouterModule.forChild([{ path: '', component: SimpleCmp }])] })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ModuleWithSimpleCmpAsRoute = _classThis = class {
    };
    __setFunctionName(_classThis, "ModuleWithSimpleCmpAsRoute");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ModuleWithSimpleCmpAsRoute = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ModuleWithSimpleCmpAsRoute = _classThis;
})();
let RootCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'root-cmp',
            template: `<router-outlet></router-outlet>`,
            imports: [index_1.RouterOutlet],
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var RootCmp = _classThis = class {
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
let ThrowingCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'throwing-cmp',
            template: '',
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ThrowingCmp = _classThis = class {
        constructor() {
            throw new Error('Throwing Cmp');
        }
    };
    __setFunctionName(_classThis, "ThrowingCmp");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ThrowingCmp = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ThrowingCmp = _classThis;
})();
function nextNavigation() {
    return new Promise((resolve) => {
        (0, navigations_1.afterNextNavigation)(testing_1.TestBed.inject(index_1.Router), resolve);
    });
}
