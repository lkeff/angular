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
const index_1 = require("../index");
const provide_router_1 = require("../src/provide_router");
describe('`navigationExtras handling with redirects`', () => {
    describe(`eager url updates with navigationExtra.replaceUrl`, () => {
        it('should preserve `NavigationExtras.replaceUrl` when redirecting from guard using urlTree', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, provide_router_1.provideRouter)([
                        {
                            path: 'first',
                            component: SimpleCmp,
                        },
                        {
                            path: 'second',
                            component: SimpleCmp,
                            canActivate: [() => (0, core_1.inject)(index_1.Router).createUrlTree(['unguarded'])],
                        },
                        {
                            path: 'unguarded',
                            component: SimpleCmp,
                        },
                    ], (0, index_1.withRouterConfig)({
                        urlUpdateStrategy: 'eager',
                        canceledNavigationResolution: 'computed',
                    })),
                ],
            });
            const location = testing_1.TestBed.inject(common_1.Location);
            const router = testing_1.TestBed.inject(index_1.Router);
            yield router.navigateByUrl('first');
            expect(location.path()).toEqual('/first');
            expect(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
            const navPromise = router.navigateByUrl('/second', { replaceUrl: true });
            expect((_a = router.getCurrentNavigation()) === null || _a === void 0 ? void 0 : _a.extras.replaceUrl).toEqual(true);
            yield navPromise;
            expect(location.path()).toEqual('/unguarded');
            expect(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
        }));
    });
    describe(`deferred url updates function correctly when navigationExtras.replaceUrl false`, () => {
        it('should work when CanActivate redirects', () => __awaiter(void 0, void 0, void 0, function* () {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    (0, provide_router_1.provideRouter)([
                        {
                            path: 'first',
                            component: SimpleCmp,
                        },
                        {
                            path: 'second',
                            component: SimpleCmp,
                            canActivate: [() => (0, core_1.inject)(index_1.Router).createUrlTree(['unguarded'])],
                        },
                        {
                            path: 'unguarded',
                            component: SimpleCmp,
                        },
                    ], (0, index_1.withRouterConfig)({
                        urlUpdateStrategy: 'deferred',
                        canceledNavigationResolution: 'computed',
                    })),
                ],
            });
            const router = testing_1.TestBed.inject(index_1.Router);
            yield router.navigateByUrl('/first');
            const location = testing_1.TestBed.inject(common_1.Location);
            yield router.navigateByUrl('/second');
            expect(location.path()).toEqual('/unguarded');
            expect(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 2 }));
            location.back();
            yield Promise.resolve();
            expect(location.path()).toEqual('/first');
            expect(location.getState()).toEqual(jasmine.objectContaining({ ɵrouterPageId: 1 }));
        }));
    });
});
let SimpleCmp = (() => {
    let _classDecorators = [(0, core_1.Component)({ selector: 'simple-cmp', template: `simple` })];
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
