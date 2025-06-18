"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
const core_1 = require("@angular/core");
const testing_1 = require("@angular/core/testing");
const hammer_gestures_1 = require("../../../src/dom/events/hammer_gestures");
describe('HammerGesturesPlugin', () => {
    let plugin;
    if (isNode) {
        // Jasmine will throw if there are no tests.
        it('should pass', () => { });
        return;
    }
    describe('with no custom loader', () => {
        beforeEach(() => {
            plugin = new hammer_gestures_1.HammerGesturesPlugin(document, new hammer_gestures_1.HammerGestureConfig(), testing_1.TestBed.inject(core_1.Injector));
        });
        it('should warn user and do nothing when Hammer.js not loaded', () => {
            const warnSpy = spyOn(console, 'warn');
            expect(plugin.supports('swipe')).toBe(false);
            expect(warnSpy).toHaveBeenCalledWith(`The "swipe" event cannot be bound because Hammer.JS is not ` +
                `loaded and no custom loader has been specified.`);
        });
    });
    describe('with a custom loader', () => {
        // Use a fake custom loader for tests, with helper functions to resolve or reject.
        let loader;
        let resolveLoader;
        let failLoader;
        // Arbitrary element and listener for testing.
        let someElement;
        let someListener;
        // Keep track of whatever value is in `window.Hammer` before the test so it can be
        // restored afterwards so that this test doesn't care whether Hammer is actually loaded.
        let originalHammerGlobal;
        // Fake Hammer instance ("mc") used to test the underlying event registration.
        let fakeHammerInstance;
        // Inject the NgZone so that we can make it available to the plugin through a fake
        // EventManager.
        let ngZone;
        beforeEach((0, testing_1.inject)([core_1.NgZone], (z) => {
            ngZone = z;
        }));
        let loaderCalled = 0;
        let loaderIsCalledInAngularZone = null;
        beforeEach(() => {
            originalHammerGlobal = window.Hammer;
            window.Hammer = undefined;
            fakeHammerInstance = {
                on: jasmine.createSpy('mc.on'),
                off: jasmine.createSpy('mc.off'),
            };
            loader = () => {
                loaderCalled++;
                loaderIsCalledInAngularZone = core_1.NgZone.isInAngularZone();
                return new Promise((resolve, reject) => {
                    resolveLoader = resolve;
                    failLoader = reject;
                });
            };
            // Make the hammer config return a fake hammer instance
            const hammerConfig = new hammer_gestures_1.HammerGestureConfig();
            spyOn(hammerConfig, 'buildHammer').and.returnValue(fakeHammerInstance);
            plugin = new hammer_gestures_1.HammerGesturesPlugin(document, hammerConfig, testing_1.TestBed.inject(core_1.Injector), loader);
            // Use a fake EventManager that has access to the NgZone.
            plugin.manager = { getZone: () => ngZone };
            someElement = document.createElement('div');
            someListener = () => { };
        });
        afterEach(() => {
            loaderCalled = 0;
            window.Hammer = originalHammerGlobal;
        });
        it('should call the loader provider only once', () => {
            plugin.addEventListener(someElement, 'swipe', () => { });
            plugin.addEventListener(someElement, 'panleft', () => { });
            plugin.addEventListener(someElement, 'panright', () => { });
            // Ensure that the loader is called only once, because previouly
            // it was called the same number of times as `addEventListener` was called.
            expect(loaderCalled).toEqual(1);
        });
        it('should not log a warning when HammerJS is not loaded', () => {
            const warnSpy = spyOn(console, 'warn');
            plugin.addEventListener(someElement, 'swipe', () => { });
            expect(warnSpy).not.toHaveBeenCalled();
        });
        it('should defer registering an event until Hammer is loaded', (0, testing_1.fakeAsync)(() => {
            plugin.addEventListener(someElement, 'swipe', someListener);
            expect(fakeHammerInstance.on).not.toHaveBeenCalled();
            window.Hammer = {};
            resolveLoader();
            (0, testing_1.tick)();
            expect(fakeHammerInstance.on).toHaveBeenCalledWith('swipe', jasmine.any(Function));
        }));
        it('should cancel registration if an event is removed before being added', (0, testing_1.fakeAsync)(() => {
            const deregister = plugin.addEventListener(someElement, 'swipe', someListener);
            deregister();
            window.Hammer = {};
            resolveLoader();
            (0, testing_1.tick)();
            expect(fakeHammerInstance.on).not.toHaveBeenCalled();
        }));
        it('should remove a listener after Hammer is loaded', (0, testing_1.fakeAsync)(() => {
            const removeListener = plugin.addEventListener(someElement, 'swipe', someListener);
            window.Hammer = {};
            resolveLoader();
            (0, testing_1.tick)();
            removeListener();
            expect(fakeHammerInstance.off).toHaveBeenCalledWith('swipe', jasmine.any(Function));
        }));
        it('should log a warning when the loader fails', (0, testing_1.fakeAsync)(() => {
            const warnSpy = spyOn(console, 'warn');
            plugin.addEventListener(someElement, 'swipe', () => { });
            failLoader();
            (0, testing_1.tick)();
            expect(warnSpy).toHaveBeenCalledWith(`The "swipe" event cannot be bound because the custom Hammer.JS loader failed.`);
        }));
        it('should load a warning if the loader resolves and Hammer is not present', (0, testing_1.fakeAsync)(() => {
            const warnSpy = spyOn(console, 'warn');
            plugin.addEventListener(someElement, 'swipe', () => { });
            resolveLoader();
            (0, testing_1.tick)();
            expect(warnSpy).toHaveBeenCalledWith(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
        }));
        it('should call the loader outside of the Angular zone', (0, testing_1.fakeAsync)(() => {
            const ngZone = testing_1.TestBed.inject(core_1.NgZone);
            // Unit tests are being run in a ProxyZone, thus `addEventListener` is called within the
            // ProxyZone. In real apps, `addEventListener` is called within the Angular zone; we
            // mimic that behaviour by entering the Angular zone.
            ngZone.run(() => plugin.addEventListener(someElement, 'swipe', () => { }));
            const appRef = testing_1.TestBed.inject(core_1.ApplicationRef);
            spyOn(appRef, 'tick');
            resolveLoader();
            (0, testing_1.tick)();
            expect(appRef.tick).not.toHaveBeenCalled();
            expect(loaderIsCalledInAngularZone).toEqual(false);
        }));
    });
});
