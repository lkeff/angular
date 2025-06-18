"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const module_1 = require("../src/module");
const provider_1 = require("../src/provider");
const update_1 = require("../src/update");
const provideServiceWorkerApi = 'provideServiceWorker';
const serviceWorkerModuleApi = 'ServiceWorkerModule';
function waitForReadyToRegister() {
    return __awaiter(this, void 0, void 0, function* () {
        // `readyToRegister` is a microtask, so we wait for it to execute by
        // scheduling another microtask before running expectations.
        yield Promise.resolve();
    });
}
[provideServiceWorkerApi, serviceWorkerModuleApi].forEach((apiFnName) => {
    describe(apiFnName, () => {
        // Skip environments that don't support the minimum APIs needed to run these SW tests.
        if (typeof navigator === 'undefined' || typeof navigator.serviceWorker === 'undefined') {
            // Jasmine will throw if there are no tests.
            it('should pass', () => { });
            return;
        }
        let swRegisterSpy;
        const untilStable = () => {
            return testing_1.TestBed.inject(core_1.ApplicationRef).whenStable();
        };
        beforeEach(() => (swRegisterSpy = spyOn(navigator.serviceWorker, 'register').and.returnValue(Promise.resolve(null))));
        describe('register', () => {
            const configTestBed = (options) => __awaiter(void 0, void 0, void 0, function* () {
                if (apiFnName === provideServiceWorkerApi) {
                    testing_1.TestBed.configureTestingModule({
                        providers: [
                            (0, provider_1.provideServiceWorker)('sw.js', options),
                            { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                        ],
                    });
                }
                else {
                    testing_1.TestBed.configureTestingModule({
                        imports: [module_1.ServiceWorkerModule.register('sw.js', options)],
                        providers: [{ provide: core_1.PLATFORM_ID, useValue: 'browser' }],
                    });
                }
                yield untilStable();
                yield waitForReadyToRegister();
            });
            it('sets the registration options', () => __awaiter(void 0, void 0, void 0, function* () {
                yield configTestBed({ enabled: true, scope: 'foo' });
                expect(testing_1.TestBed.inject(provider_1.SwRegistrationOptions)).toEqual({ enabled: true, scope: 'foo' });
                expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: 'foo' });
            }));
            it('can disable the SW', () => __awaiter(void 0, void 0, void 0, function* () {
                yield configTestBed({ enabled: false });
                expect(testing_1.TestBed.inject(update_1.SwUpdate).isEnabled).toBe(false);
                expect(swRegisterSpy).not.toHaveBeenCalled();
            }));
            it('can enable the SW', () => __awaiter(void 0, void 0, void 0, function* () {
                yield configTestBed({ enabled: true });
                expect(testing_1.TestBed.inject(update_1.SwUpdate).isEnabled).toBe(true);
                expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
            }));
            it('defaults to enabling the SW', () => __awaiter(void 0, void 0, void 0, function* () {
                yield configTestBed({});
                expect(testing_1.TestBed.inject(update_1.SwUpdate).isEnabled).toBe(true);
                expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
            }));
            it('catches and logs registration errors', () => __awaiter(void 0, void 0, void 0, function* () {
                const consoleErrorSpy = spyOn(console, 'error');
                swRegisterSpy.and.returnValue(Promise.reject('no reason'));
                yield configTestBed({ enabled: true, scope: 'foo' });
                expect(consoleErrorSpy).toHaveBeenCalledWith('NG05604: Service worker registration failed with: no reason');
            }));
        });
        describe('SwRegistrationOptions', () => {
            const configTestBed = (providerOpts, staticOpts) => {
                if (apiFnName === provideServiceWorkerApi) {
                    testing_1.TestBed.configureTestingModule({
                        providers: [
                            (0, provider_1.provideServiceWorker)('sw.js', staticOpts || { scope: 'static' }),
                            { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                            { provide: provider_1.SwRegistrationOptions, useFactory: () => providerOpts },
                        ],
                    });
                }
                else {
                    testing_1.TestBed.configureTestingModule({
                        imports: [module_1.ServiceWorkerModule.register('sw.js', staticOpts || { scope: 'static' })],
                        providers: [
                            { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                            { provide: provider_1.SwRegistrationOptions, useFactory: () => providerOpts },
                        ],
                    });
                }
            };
            it('sets the registration options (and overwrites those set via `provideServiceWorker()`', () => __awaiter(void 0, void 0, void 0, function* () {
                configTestBed({ enabled: true, scope: 'provider' });
                yield untilStable();
                expect(testing_1.TestBed.inject(provider_1.SwRegistrationOptions)).toEqual({ enabled: true, scope: 'provider' });
                yield waitForReadyToRegister();
                expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: 'provider' });
            }));
            it('can disable the SW', () => __awaiter(void 0, void 0, void 0, function* () {
                configTestBed({ enabled: false }, { enabled: true });
                yield untilStable();
                expect(testing_1.TestBed.inject(update_1.SwUpdate).isEnabled).toBe(false);
                expect(swRegisterSpy).not.toHaveBeenCalled();
            }));
            it('can enable the SW', () => __awaiter(void 0, void 0, void 0, function* () {
                configTestBed({ enabled: true }, { enabled: false });
                yield untilStable();
                expect(testing_1.TestBed.inject(update_1.SwUpdate).isEnabled).toBe(true);
                yield waitForReadyToRegister();
                expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
            }));
            it('defaults to enabling the SW', () => __awaiter(void 0, void 0, void 0, function* () {
                configTestBed({}, { enabled: false });
                yield untilStable();
                expect(testing_1.TestBed.inject(update_1.SwUpdate).isEnabled).toBe(true);
                yield waitForReadyToRegister();
                expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
            }));
            describe('registrationStrategy', () => {
                const configTestBedWithMockedStability = (strategy) => {
                    const isStableSub = new rxjs_1.Subject();
                    if (apiFnName === provideServiceWorkerApi) {
                        testing_1.TestBed.configureTestingModule({
                            providers: [
                                (0, provider_1.provideServiceWorker)('sw.js'),
                                {
                                    provide: core_1.ApplicationRef,
                                    useValue: {
                                        isStable: isStableSub.asObservable(),
                                        whenStable: () => isStableSub.pipe((0, operators_1.filter)(Boolean), (0, operators_1.take)(1)),
                                        afterTick: new rxjs_1.Subject(),
                                        onDestroy: () => { },
                                    },
                                },
                                { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                                {
                                    provide: provider_1.SwRegistrationOptions,
                                    useFactory: () => ({ registrationStrategy: strategy }),
                                },
                            ],
                        });
                    }
                    else {
                        testing_1.TestBed.configureTestingModule({
                            imports: [module_1.ServiceWorkerModule.register('sw.js')],
                            providers: [
                                {
                                    provide: core_1.ApplicationRef,
                                    useValue: {
                                        isStable: isStableSub.asObservable(),
                                        whenStable: () => isStableSub.pipe((0, operators_1.filter)(Boolean), (0, operators_1.take)(1)),
                                        afterTick: new rxjs_1.Subject(),
                                        onDestroy: () => { },
                                    },
                                },
                                { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                                {
                                    provide: provider_1.SwRegistrationOptions,
                                    useFactory: () => ({ registrationStrategy: strategy }),
                                },
                            ],
                        });
                    }
                    // Dummy `inject()` call to initialize the test "app".
                    testing_1.TestBed.inject(core_1.ApplicationRef);
                    return isStableSub;
                };
                it('defaults to registering the SW when the app stabilizes (under 30s)', (0, testing_1.fakeAsync)(() => {
                    const isStableSub = configTestBedWithMockedStability();
                    isStableSub.next(false);
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    // tick(20000);
                    // Calling `tick(20000)` drains the microtask queue,
                    // which leads to `register` being called.
                    isStableSub.next(true);
                    (0, testing_1.tick)();
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('defaults to registering the SW after 30s if the app does not stabilize sooner', (0, testing_1.fakeAsync)(() => {
                    configTestBedWithMockedStability();
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    (0, testing_1.tick)(30000);
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('registers the SW when the app stabilizes with `registerWhenStable:<timeout>`', (0, testing_1.fakeAsync)(() => {
                    const isStableSub = configTestBedWithMockedStability('registerWhenStable:1000');
                    isStableSub.next(false);
                    isStableSub.next(false);
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    isStableSub.next(true);
                    (0, testing_1.tick)();
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('registers the SW after `timeout` if the app does not stabilize with `registerWhenStable:<timeout>`', (0, testing_1.fakeAsync)(() => {
                    configTestBedWithMockedStability('registerWhenStable:1000');
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    (0, testing_1.tick)(1000);
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('registers the SW asap (asynchronously) before the app stabilizes with `registerWhenStable:0`', (0, testing_1.fakeAsync)(() => {
                    configTestBedWithMockedStability('registerWhenStable:0');
                    // Create a microtask.
                    Promise.resolve();
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    (0, testing_1.tick)(0);
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('registers the SW only when the app stabilizes with `registerWhenStable:`', (0, testing_1.fakeAsync)(() => {
                    const isStableSub = configTestBedWithMockedStability('registerWhenStable:');
                    isStableSub.next(false);
                    isStableSub.next(false);
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    isStableSub.next(true);
                    (0, testing_1.tick)();
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('registers the SW only when the app stabilizes with `registerWhenStable`', (0, testing_1.fakeAsync)(() => {
                    const isStableSub = configTestBedWithMockedStability('registerWhenStable');
                    isStableSub.next(false);
                    isStableSub.next(false);
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    isStableSub.next(true);
                    (0, testing_1.tick)();
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('registers the SW immediatelly (synchronously) with `registerImmediately`', () => __awaiter(void 0, void 0, void 0, function* () {
                    configTestBedWithMockedStability('registerImmediately');
                    yield waitForReadyToRegister();
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('registers the SW after the specified delay with `registerWithDelay:<delay>`', (0, testing_1.fakeAsync)(() => {
                    configTestBedWithMockedStability('registerWithDelay:100000');
                    // tick(99999);
                    // Calling `tick(99999)` drains the microtask queue,
                    // which leads to `register` being called.
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    (0, testing_1.tick)(100000);
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('registers the SW asap (asynchronously) with `registerWithDelay:`', (0, testing_1.fakeAsync)(() => {
                    configTestBedWithMockedStability('registerWithDelay:');
                    // Create a microtask.
                    Promise.resolve();
                    (0, testing_1.flushMicrotasks)();
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    (0, testing_1.tick)(0);
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('registers the SW asap (asynchronously) with `registerWithDelay`', (0, testing_1.fakeAsync)(() => {
                    configTestBedWithMockedStability('registerWithDelay');
                    // Create a microtask.
                    Promise.resolve();
                    (0, testing_1.flushMicrotasks)();
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    (0, testing_1.tick)(0);
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('registers the SW on first emitted value with observable factory function', (0, testing_1.fakeAsync)(() => {
                    const registerSub = new rxjs_1.Subject();
                    const isStableSub = configTestBedWithMockedStability(() => registerSub.asObservable());
                    isStableSub.next(true);
                    (0, testing_1.tick)();
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                    registerSub.next();
                    (0, testing_1.tick)();
                    expect(swRegisterSpy).toHaveBeenCalledWith('sw.js', { scope: undefined });
                }));
                it('throws an error with unknown strategy', () => {
                    expect(() => configTestBedWithMockedStability('registerYesterday')).toThrowError('NG05600: Unknown ServiceWorker registration strategy: registerYesterday');
                    expect(swRegisterSpy).not.toHaveBeenCalled();
                });
            });
        });
    });
});
