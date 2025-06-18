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
const core_1 = require("@angular/core");
const ng_zone_1 = require("@angular/core/src/zone/ng_zone");
const testing_1 = require("@angular/private/testing");
const browser_1 = require("../../src/browser");
describe('bootstrapApplication for standalone components', () => {
    beforeEach(core_1.destroyPlatform);
    afterEach(core_1.destroyPlatform);
    class SilentErrorHandler extends core_1.ErrorHandler {
        handleError() {
            // the error is already re-thrown by the application ref.
            // we don't want to print it, but instead catch it in tests.
        }
    }
    it('should create injector where ambient providers shadow explicit providers', (0, testing_1.withBody)('<test-app></test-app>', () => __awaiter(void 0, void 0, void 0, function* () {
        const testToken = new core_1.InjectionToken('test token');
        let AmbientModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: testToken, useValue: 'Ambient' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AmbientModule = _classThis = class {
            };
            __setFunctionName(_classThis, "AmbientModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AmbientModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AmbientModule = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-app',
                    standalone: true,
                    template: `({{testToken}})`,
                    imports: [AmbientModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
                constructor(testToken) {
                    this.testToken = testToken;
                }
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        const appRef = yield (0, browser_1.bootstrapApplication)(StandaloneCmp, {
            providers: [{ provide: testToken, useValue: 'Bootstrap' }],
        });
        appRef.tick();
        // make sure that ambient providers "shadow" ones explicitly provided during bootstrap
        expect(document.body.textContent).toBe('(Ambient)');
    })));
    it('should be able to provide a custom zone implementation in DI', (0, testing_1.withBody)('<test-app></test-app>', () => __awaiter(void 0, void 0, void 0, function* () {
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-app',
                    standalone: true,
                    template: ``,
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        class CustomZone extends ng_zone_1.NoopNgZone {
        }
        const instance = new CustomZone();
        const appRef = yield (0, browser_1.bootstrapApplication)(StandaloneCmp, {
            providers: [{ provide: core_1.NgZone, useValue: instance }],
        });
        appRef.tick();
        expect(appRef.injector.get(core_1.NgZone)).toEqual(instance);
    })));
    /*
      This test verifies that ambient providers for the standalone component being bootstrapped
      (providers collected from the import graph of a standalone component) are instantiated in a
      dedicated standalone injector. As the result we are ending up with the following injectors
      hierarchy:
      - platform injector (platform specific providers go here);
      - application injector (providers specified in the bootstrap options go here);
      - standalone injector (ambient providers go here);
    */
    it('should create a standalone injector for standalone components with ambient providers', (0, testing_1.withBody)('<test-app></test-app>', () => __awaiter(void 0, void 0, void 0, function* () {
        const ambientToken = new core_1.InjectionToken('ambient token');
        let AmbientModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    providers: [{ provide: ambientToken, useValue: 'Only in AmbientNgModule' }],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var AmbientModule = _classThis = class {
            };
            __setFunctionName(_classThis, "AmbientModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                AmbientModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return AmbientModule = _classThis;
        })();
        let NeedsAmbientProvider = (() => {
            let _classDecorators = [(0, core_1.Injectable)()];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var NeedsAmbientProvider = _classThis = class {
                constructor(ambientToken) {
                    this.ambientToken = ambientToken;
                }
            };
            __setFunctionName(_classThis, "NeedsAmbientProvider");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                NeedsAmbientProvider = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return NeedsAmbientProvider = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-app',
                    template: `({{service.ambientToken}})`,
                    standalone: true,
                    imports: [AmbientModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
                constructor(service) {
                    this.service = service;
                }
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        try {
            yield (0, browser_1.bootstrapApplication)(StandaloneCmp, {
                providers: [{ provide: core_1.ErrorHandler, useClass: SilentErrorHandler }, NeedsAmbientProvider],
            });
            // we expect the bootstrap process to fail since the "NeedsAmbientProvider" service
            // (located in the application injector) can't "see" ambient providers (located in a
            // standalone injector that is a child of the application injector).
            fail('Expected to throw');
        }
        catch (e) {
            expect(e).toBeInstanceOf(Error);
            expect(e.message).toContain('No provider for InjectionToken ambient token!');
        }
    })));
    it('should throw if `BrowserModule` is imported in the standalone bootstrap scenario', (0, testing_1.withBody)('<test-app></test-app>', () => __awaiter(void 0, void 0, void 0, function* () {
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-app',
                    template: '...',
                    standalone: true,
                    imports: [browser_1.BrowserModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        try {
            yield (0, browser_1.bootstrapApplication)(StandaloneCmp, {
                providers: [{ provide: core_1.ErrorHandler, useClass: SilentErrorHandler }],
            });
            // The `bootstrapApplication` already includes the set of providers from the
            // `BrowserModule`, so including the `BrowserModule` again will bring duplicate
            // providers and we want to avoid it.
            fail('Expected to throw');
        }
        catch (e) {
            expect(e).toBeInstanceOf(Error);
            expect(e.message).toContain('NG05100: Providers from the `BrowserModule` have already been loaded.');
        }
    })));
    it('should throw if `BrowserModule` is imported indirectly in the standalone bootstrap scenario', (0, testing_1.withBody)('<test-app></test-app>', () => __awaiter(void 0, void 0, void 0, function* () {
        let SomeDependencyModule = (() => {
            let _classDecorators = [(0, core_1.NgModule)({
                    imports: [browser_1.BrowserModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var SomeDependencyModule = _classThis = class {
            };
            __setFunctionName(_classThis, "SomeDependencyModule");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                SomeDependencyModule = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return SomeDependencyModule = _classThis;
        })();
        let StandaloneCmp = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-app',
                    template: '...',
                    standalone: true,
                    imports: [SomeDependencyModule],
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var StandaloneCmp = _classThis = class {
            };
            __setFunctionName(_classThis, "StandaloneCmp");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                StandaloneCmp = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return StandaloneCmp = _classThis;
        })();
        try {
            yield (0, browser_1.bootstrapApplication)(StandaloneCmp, {
                providers: [{ provide: core_1.ErrorHandler, useClass: SilentErrorHandler }],
            });
            // The `bootstrapApplication` already includes the set of providers from the
            // `BrowserModule`, so including the `BrowserModule` again will bring duplicate
            // providers and we want to avoid it.
            fail('Expected to throw');
        }
        catch (e) {
            expect(e).toBeInstanceOf(Error);
            expect(e.message).toContain('NG05100: Providers from the `BrowserModule` have already been loaded.');
        }
    })));
    it('should trigger an app destroy when a platform is destroyed', (0, testing_1.withBody)('<test-app></test-app>', () => __awaiter(void 0, void 0, void 0, function* () {
        let compOnDestroyCalled = false;
        let serviceOnDestroyCalled = false;
        let injectorOnDestroyCalled = false;
        let ServiceWithOnDestroy = (() => {
            let _classDecorators = [(0, core_1.Injectable)({ providedIn: 'root' })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ServiceWithOnDestroy = _classThis = class {
                ngOnDestroy() {
                    serviceOnDestroyCalled = true;
                }
            };
            __setFunctionName(_classThis, "ServiceWithOnDestroy");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ServiceWithOnDestroy = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ServiceWithOnDestroy = _classThis;
        })();
        let ComponentWithOnDestroy = (() => {
            let _classDecorators = [(0, core_1.Component)({
                    selector: 'test-app',
                    standalone: true,
                    template: 'Hello',
                })];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var ComponentWithOnDestroy = _classThis = class {
                constructor(service) { }
                ngOnDestroy() {
                    compOnDestroyCalled = true;
                }
            };
            __setFunctionName(_classThis, "ComponentWithOnDestroy");
            (() => {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                ComponentWithOnDestroy = _classThis = _classDescriptor.value;
                if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                __runInitializers(_classThis, _classExtraInitializers);
            })();
            return ComponentWithOnDestroy = _classThis;
        })();
        const appRef = yield (0, browser_1.bootstrapApplication)(ComponentWithOnDestroy);
        const injector = appRef.injector;
        injector.onDestroy(() => (injectorOnDestroyCalled = true));
        expect(document.body.textContent).toBe('Hello');
        const platformRef = injector.get(core_1.PlatformRef);
        platformRef.destroy();
        // Verify the callbacks were invoked.
        expect(compOnDestroyCalled).toBe(true);
        expect(serviceOnDestroyCalled).toBe(true);
        expect(injectorOnDestroyCalled).toBe(true);
        // Make sure the DOM has been cleaned up as well.
        expect(document.body.textContent).toBe('');
    })));
});
