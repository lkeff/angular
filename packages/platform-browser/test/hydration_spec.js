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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@angular/common");
const http_1 = require("@angular/common/http");
const testing_1 = require("@angular/common/http/testing");
const core_1 = require("@angular/core");
const testing_2 = require("@angular/core/testing");
const testing_3 = require("@angular/private/testing");
const rxjs_1 = require("rxjs");
const public_api_1 = require("../public_api");
const hydration_1 = require("../src/hydration");
describe('provideClientHydration', () => {
    let SomeComponent = (() => {
        let _classDecorators = [(0, core_1.Component)({
                selector: 'test-hydrate-app',
                template: '',
                standalone: false,
            })];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        var SomeComponent = _classThis = class {
        };
        __setFunctionName(_classThis, "SomeComponent");
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            SomeComponent = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return SomeComponent = _classThis;
    })();
    function makeRequestAndExpectOne(url, body, options = true) {
        testing_2.TestBed.inject(http_1.HttpClient).get(url, { transferCache: options }).subscribe();
        testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne(url).flush(body);
    }
    function makeRequestAndExpectNone(url, options = true) {
        testing_2.TestBed.inject(http_1.HttpClient).get(url, { transferCache: options }).subscribe();
        testing_2.TestBed.inject(testing_1.HttpTestingController).expectNone(url);
    }
    let ApplicationRefPatched = (() => {
        let _classDecorators = [(0, core_1.Injectable)()];
        let _classDescriptor;
        let _classExtraInitializers = [];
        let _classThis;
        let _classSuper = core_1.ApplicationRef;
        var ApplicationRefPatched = _classThis = class extends _classSuper {
            get isStable() {
                return new rxjs_1.BehaviorSubject(false);
            }
        };
        __setFunctionName(_classThis, "ApplicationRefPatched");
        (() => {
            var _a;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            ApplicationRefPatched = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            __runInitializers(_classThis, _classExtraInitializers);
        })();
        return ApplicationRefPatched = _classThis;
    })();
    beforeEach(() => {
        globalThis['ngServerMode'] = true;
    });
    afterEach(() => {
        globalThis['ngServerMode'] = undefined;
    });
    describe('default', () => {
        beforeEach((0, testing_3.withBody)(`<!--${core_1.ɵSSR_CONTENT_INTEGRITY_MARKER}--><test-hydrate-app></test-hydrate-app>`, () => {
            testing_2.TestBed.resetTestingModule();
            testing_2.TestBed.configureTestingModule({
                declarations: [SomeComponent],
                providers: [
                    { provide: core_1.PLATFORM_ID, useValue: 'server' },
                    { provide: common_1.DOCUMENT, useFactory: () => document },
                    { provide: core_1.ApplicationRef, useClass: ApplicationRefPatched },
                    (0, public_api_1.provideClientHydration)(),
                    (0, http_1.provideHttpClient)(),
                    (0, testing_1.provideHttpClientTesting)(),
                ],
            });
            const appRef = testing_2.TestBed.inject(core_1.ApplicationRef);
            appRef.bootstrap(SomeComponent);
        }));
        it(`should use cached HTTP calls`, () => {
            makeRequestAndExpectOne('/test-1', 'foo');
            // Do the same call, this time it should served from cache.
            makeRequestAndExpectNone('/test-1');
        });
    });
    describe('withNoHttpTransferCache', () => {
        beforeEach((0, testing_3.withBody)(`<!--${core_1.ɵSSR_CONTENT_INTEGRITY_MARKER}--><test-hydrate-app></test-hydrate-app>`, () => {
            testing_2.TestBed.resetTestingModule();
            testing_2.TestBed.configureTestingModule({
                declarations: [SomeComponent],
                providers: [
                    { provide: core_1.PLATFORM_ID, useValue: 'server' },
                    { provide: common_1.DOCUMENT, useFactory: () => document },
                    { provide: core_1.ApplicationRef, useClass: ApplicationRefPatched },
                    (0, public_api_1.provideClientHydration)((0, public_api_1.withNoHttpTransferCache)()),
                    (0, http_1.provideHttpClient)(),
                    (0, testing_1.provideHttpClientTesting)(),
                ],
            });
            const appRef = testing_2.TestBed.inject(core_1.ApplicationRef);
            appRef.bootstrap(SomeComponent);
        }));
        it(`should not cache HTTP calls`, () => {
            makeRequestAndExpectOne('/test-1', 'foo', false);
            // Do the same call, this time should pass through as cache is disabled.
            makeRequestAndExpectOne('/test-1', 'foo');
        });
    });
    describe('withHttpTransferCacheOptions', () => {
        beforeEach((0, testing_3.withBody)(`<!--${core_1.ɵSSR_CONTENT_INTEGRITY_MARKER}--><test-hydrate-app></test-hydrate-app>`, () => {
            testing_2.TestBed.resetTestingModule();
            testing_2.TestBed.configureTestingModule({
                declarations: [SomeComponent],
                providers: [
                    { provide: core_1.PLATFORM_ID, useValue: 'server' },
                    { provide: common_1.DOCUMENT, useFactory: () => document },
                    { provide: core_1.ApplicationRef, useClass: ApplicationRefPatched },
                    (0, public_api_1.provideClientHydration)((0, hydration_1.withHttpTransferCacheOptions)({ includePostRequests: true, includeHeaders: ['foo'] })),
                    (0, http_1.provideHttpClient)(),
                    (0, testing_1.provideHttpClientTesting)(),
                ],
            });
            const appRef = testing_2.TestBed.inject(core_1.ApplicationRef);
            appRef.bootstrap(SomeComponent);
        }));
        it(`should cache HTTP POST calls`, () => {
            const url = '/test-1';
            const body = 'foo';
            testing_2.TestBed.inject(http_1.HttpClient).post(url, body).subscribe();
            testing_2.TestBed.inject(testing_1.HttpTestingController).expectOne(url).flush(body);
            testing_2.TestBed.inject(http_1.HttpClient).post(url, body).subscribe();
            testing_2.TestBed.inject(testing_1.HttpTestingController).expectNone(url);
        });
    });
});
