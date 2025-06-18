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
const low_level_1 = require("../src/low_level");
const provider_1 = require("../src/provider");
const push_1 = require("../src/push");
const update_1 = require("../src/update");
const mock_1 = require("../testing/mock");
const operators_1 = require("rxjs/operators");
describe('ServiceWorker library', () => {
    let mock;
    let comm;
    beforeEach(() => {
        mock = new mock_1.MockServiceWorkerContainer();
        comm = new low_level_1.NgswCommChannel(mock);
    });
    describe('NgswCommsChannel', () => {
        it('can access the registration when it comes before subscription', (done) => {
            const mock = new mock_1.MockServiceWorkerContainer();
            const comm = new low_level_1.NgswCommChannel(mock);
            const regPromise = mock.getRegistration();
            mock.setupSw();
            comm.registration.subscribe((reg) => {
                done();
            });
        });
        it('can access the registration when it comes after subscription', (done) => {
            const mock = new mock_1.MockServiceWorkerContainer();
            const comm = new low_level_1.NgswCommChannel(mock);
            const regPromise = mock.getRegistration();
            comm.registration.subscribe((reg) => {
                done();
            });
            mock.setupSw();
        });
    });
    describe('ngswCommChannelFactory', () => {
        describe('server', () => {
            beforeEach(() => {
                globalThis['ngServerMode'] = true;
            });
            afterEach(() => {
                globalThis['ngServerMode'] = undefined;
            });
            it('gives disabled NgswCommChannel for platform-server', () => {
                testing_1.TestBed.configureTestingModule({
                    providers: [
                        { provide: core_1.PLATFORM_ID, useValue: 'server' },
                        { provide: provider_1.SwRegistrationOptions, useValue: { enabled: true } },
                        {
                            provide: low_level_1.NgswCommChannel,
                            useFactory: provider_1.ngswCommChannelFactory,
                            deps: [provider_1.SwRegistrationOptions, core_1.Injector],
                        },
                    ],
                });
                expect(testing_1.TestBed.inject(low_level_1.NgswCommChannel).isEnabled).toEqual(false);
            });
        });
        it("gives disabled NgswCommChannel when 'enabled' option is false", () => {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                    { provide: provider_1.SwRegistrationOptions, useValue: { enabled: false } },
                    {
                        provide: low_level_1.NgswCommChannel,
                        useFactory: provider_1.ngswCommChannelFactory,
                        deps: [provider_1.SwRegistrationOptions, core_1.Injector],
                    },
                ],
            });
            expect(testing_1.TestBed.inject(low_level_1.NgswCommChannel).isEnabled).toEqual(false);
        });
        it('gives disabled NgswCommChannel when navigator.serviceWorker is undefined', () => {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                    { provide: provider_1.SwRegistrationOptions, useValue: { enabled: true } },
                    {
                        provide: low_level_1.NgswCommChannel,
                        useFactory: provider_1.ngswCommChannelFactory,
                        deps: [provider_1.SwRegistrationOptions, core_1.Injector],
                    },
                ],
            });
            const context = globalThis;
            const originalDescriptor = Object.getOwnPropertyDescriptor(context, 'navigator');
            const patchedDescriptor = { value: { serviceWorker: undefined }, configurable: true };
            try {
                // Set `navigator` to `{serviceWorker: undefined}`.
                Object.defineProperty(context, 'navigator', patchedDescriptor);
                expect(testing_1.TestBed.inject(low_level_1.NgswCommChannel).isEnabled).toBe(false);
            }
            finally {
                if (originalDescriptor) {
                    Object.defineProperty(context, 'navigator', originalDescriptor);
                }
                else {
                    delete context.navigator;
                }
            }
        });
        it('gives enabled NgswCommChannel when browser supports SW and enabled option is true', () => {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    { provide: core_1.PLATFORM_ID, useValue: 'browser' },
                    { provide: provider_1.SwRegistrationOptions, useValue: { enabled: true } },
                    {
                        provide: low_level_1.NgswCommChannel,
                        useFactory: provider_1.ngswCommChannelFactory,
                        deps: [provider_1.SwRegistrationOptions, core_1.Injector],
                    },
                ],
            });
            const context = globalThis;
            const originalDescriptor = Object.getOwnPropertyDescriptor(context, 'navigator');
            const patchedDescriptor = { value: { serviceWorker: mock }, configurable: true };
            try {
                // Set `navigator` to `{serviceWorker: mock}`.
                Object.defineProperty(context, 'navigator', patchedDescriptor);
                expect(testing_1.TestBed.inject(low_level_1.NgswCommChannel).isEnabled).toBe(true);
            }
            finally {
                if (originalDescriptor) {
                    Object.defineProperty(context, 'navigator', originalDescriptor);
                }
                else {
                    delete context.navigator;
                }
            }
        });
    });
    describe('SwPush', () => {
        let unpatchDecodeBase64;
        let push;
        // Patch `SwPush.decodeBase64()` in Node.js (where `atob` is not available).
        beforeAll(() => (unpatchDecodeBase64 = (0, mock_1.patchDecodeBase64)(push_1.SwPush.prototype)));
        afterAll(() => unpatchDecodeBase64());
        beforeEach(() => {
            push = new push_1.SwPush(comm);
            mock.setupSw();
        });
        it('is injectable', () => {
            testing_1.TestBed.configureTestingModule({
                providers: [push_1.SwPush, { provide: low_level_1.NgswCommChannel, useValue: comm }],
            });
            expect(() => testing_1.TestBed.inject(push_1.SwPush)).not.toThrow();
        });
        describe('requestSubscription()', () => {
            it('returns a promise that resolves to the subscription', () => __awaiter(void 0, void 0, void 0, function* () {
                const promise = push.requestSubscription({ serverPublicKey: 'test' });
                expect(promise).toEqual(jasmine.any(Promise));
                const sub = yield promise;
                expect(sub).toEqual(jasmine.any(mock_1.MockPushSubscription));
            }));
            it('calls `PushManager.subscribe()` (with appropriate options)', () => __awaiter(void 0, void 0, void 0, function* () {
                const decode = (charCodeArr) => Array.from(charCodeArr)
                    .map((c) => String.fromCharCode(c))
                    .join('');
                // atob('c3ViamVjdHM/') === 'subjects?'
                const serverPublicKey = 'c3ViamVjdHM_';
                const appServerKeyStr = 'subjects?';
                const pmSubscribeSpy = spyOn(mock_1.MockPushManager.prototype, 'subscribe').and.callThrough();
                yield push.requestSubscription({ serverPublicKey });
                expect(pmSubscribeSpy).toHaveBeenCalledTimes(1);
                expect(pmSubscribeSpy).toHaveBeenCalledWith({
                    applicationServerKey: jasmine.any(Uint8Array),
                    userVisibleOnly: true,
                });
                const actualAppServerKey = pmSubscribeSpy.calls.first().args[0].applicationServerKey;
                const actualAppServerKeyStr = decode(actualAppServerKey);
                expect(actualAppServerKeyStr).toBe(appServerKeyStr);
            }));
            it('emits the new `PushSubscription` on `SwPush.subscription`', () => __awaiter(void 0, void 0, void 0, function* () {
                const subscriptionSpy = jasmine.createSpy('subscriptionSpy');
                push.subscription.subscribe(subscriptionSpy);
                const sub = yield push.requestSubscription({ serverPublicKey: 'test' });
                expect(subscriptionSpy).toHaveBeenCalledWith(sub);
            }));
        });
        describe('unsubscribe()', () => {
            let psUnsubscribeSpy;
            beforeEach(() => {
                psUnsubscribeSpy = spyOn(mock_1.MockPushSubscription.prototype, 'unsubscribe').and.callThrough();
            });
            it('rejects if currently not subscribed to push notifications', () => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield push.unsubscribe();
                    throw new Error('`unsubscribe()` should fail');
                }
                catch (err) {
                    expect(err.message).toContain('Not subscribed to push notifications.');
                }
            }));
            it('calls `PushSubscription.unsubscribe()`', () => __awaiter(void 0, void 0, void 0, function* () {
                yield push.requestSubscription({ serverPublicKey: 'test' });
                yield push.unsubscribe();
                expect(psUnsubscribeSpy).toHaveBeenCalledTimes(1);
            }));
            it('rejects if `PushSubscription.unsubscribe()` fails', () => __awaiter(void 0, void 0, void 0, function* () {
                psUnsubscribeSpy.and.callFake(() => {
                    throw new Error('foo');
                });
                try {
                    yield push.requestSubscription({ serverPublicKey: 'test' });
                    yield push.unsubscribe();
                    throw new Error('`unsubscribe()` should fail');
                }
                catch (err) {
                    expect(err.message).toBe('foo');
                }
            }));
            it('rejects if `PushSubscription.unsubscribe()` returns false', () => __awaiter(void 0, void 0, void 0, function* () {
                psUnsubscribeSpy.and.returnValue(Promise.resolve(false));
                try {
                    yield push.requestSubscription({ serverPublicKey: 'test' });
                    yield push.unsubscribe();
                    throw new Error('`unsubscribe()` should fail');
                }
                catch (err) {
                    expect(err.message).toContain('Unsubscribe failed!');
                }
            }));
            it('emits `null` on `SwPush.subscription`', () => __awaiter(void 0, void 0, void 0, function* () {
                const subscriptionSpy = jasmine.createSpy('subscriptionSpy');
                push.subscription.subscribe(subscriptionSpy);
                yield push.requestSubscription({ serverPublicKey: 'test' });
                yield push.unsubscribe();
                expect(subscriptionSpy).toHaveBeenCalledWith(null);
            }));
            it('does not emit on `SwPush.subscription` on failure', () => __awaiter(void 0, void 0, void 0, function* () {
                const subscriptionSpy = jasmine.createSpy('subscriptionSpy');
                const initialSubEmit = new Promise((resolve) => subscriptionSpy.and.callFake(resolve));
                push.subscription.subscribe(subscriptionSpy);
                yield initialSubEmit;
                subscriptionSpy.calls.reset();
                // Error due to no subscription.
                yield push.unsubscribe().catch(() => undefined);
                expect(subscriptionSpy).not.toHaveBeenCalled();
                // Subscribe.
                yield push.requestSubscription({ serverPublicKey: 'test' });
                subscriptionSpy.calls.reset();
                // Error due to `PushSubscription.unsubscribe()` error.
                psUnsubscribeSpy.and.callFake(() => {
                    throw new Error('foo');
                });
                yield push.unsubscribe().catch(() => undefined);
                expect(subscriptionSpy).not.toHaveBeenCalled();
                // Error due to `PushSubscription.unsubscribe()` failure.
                psUnsubscribeSpy.and.returnValue(Promise.resolve(false));
                yield push.unsubscribe().catch(() => undefined);
                expect(subscriptionSpy).not.toHaveBeenCalled();
            }));
        });
        describe('messages', () => {
            it('receives push messages', () => {
                const sendMessage = (type, message) => mock.sendMessage({ type, data: { message } });
                const receivedMessages = [];
                push.messages.subscribe((msg) => receivedMessages.push(msg.message));
                sendMessage('PUSH', 'this was a push message');
                sendMessage('NOTPUSH', 'this was not a push message');
                sendMessage('PUSH', 'this was a push message too');
                sendMessage('HSUP', 'this was a HSUP message');
                expect(receivedMessages).toEqual([
                    'this was a push message',
                    'this was a push message too',
                ]);
            });
        });
        describe('notificationClicks', () => {
            it('receives notification clicked messages', () => {
                const sendMessage = (type, action) => mock.sendMessage({ type, data: { action } });
                const receivedMessages = [];
                push.notificationClicks.subscribe((msg) => receivedMessages.push(msg.action));
                sendMessage('NOTIFICATION_CLICK', 'this was a click');
                sendMessage('NOT_IFICATION_CLICK', 'this was not a click');
                sendMessage('NOTIFICATION_CLICK', 'this was a click too');
                sendMessage('KCILC_NOITACIFITON', 'this was a KCILC_NOITACIFITON message');
                expect(receivedMessages).toEqual(['this was a click', 'this was a click too']);
            });
        });
        describe('subscription', () => {
            let nextSubEmitResolve;
            let nextSubEmitPromise;
            let subscriptionSpy;
            beforeEach(() => {
                nextSubEmitPromise = new Promise((resolve) => (nextSubEmitResolve = resolve));
                subscriptionSpy = jasmine.createSpy('subscriptionSpy').and.callFake(() => {
                    nextSubEmitResolve();
                    nextSubEmitPromise = new Promise((resolve) => (nextSubEmitResolve = resolve));
                });
                push.subscription.subscribe(subscriptionSpy);
            });
            it('emits on worker-driven changes (i.e. when the controller changes)', () => __awaiter(void 0, void 0, void 0, function* () {
                // Initial emit for the current `ServiceWorkerController`.
                yield nextSubEmitPromise;
                expect(subscriptionSpy).toHaveBeenCalledTimes(1);
                expect(subscriptionSpy).toHaveBeenCalledWith(null);
                subscriptionSpy.calls.reset();
                // Simulate a `ServiceWorkerController` change.
                mock.setupSw();
                yield nextSubEmitPromise;
                expect(subscriptionSpy).toHaveBeenCalledTimes(1);
                expect(subscriptionSpy).toHaveBeenCalledWith(null);
            }));
            it('emits on subscription changes (i.e. when subscribing/unsubscribing)', () => __awaiter(void 0, void 0, void 0, function* () {
                yield nextSubEmitPromise;
                subscriptionSpy.calls.reset();
                // Subscribe.
                yield push.requestSubscription({ serverPublicKey: 'test' });
                expect(subscriptionSpy).toHaveBeenCalledTimes(1);
                expect(subscriptionSpy).toHaveBeenCalledWith(jasmine.any(mock_1.MockPushSubscription));
                subscriptionSpy.calls.reset();
                // Subscribe again.
                yield push.requestSubscription({ serverPublicKey: 'test' });
                expect(subscriptionSpy).toHaveBeenCalledTimes(1);
                expect(subscriptionSpy).toHaveBeenCalledWith(jasmine.any(mock_1.MockPushSubscription));
                subscriptionSpy.calls.reset();
                // Unsubscribe.
                yield push.unsubscribe();
                expect(subscriptionSpy).toHaveBeenCalledTimes(1);
                expect(subscriptionSpy).toHaveBeenCalledWith(null);
            }));
        });
        describe('with no SW', () => {
            beforeEach(() => {
                comm = new low_level_1.NgswCommChannel(undefined);
                push = new push_1.SwPush(comm);
            });
            it('does not crash on subscription to observables', () => {
                push.messages.toPromise().catch((err) => fail(err));
                push.notificationClicks.toPromise().catch((err) => fail(err));
                push.subscription.toPromise().catch((err) => fail(err));
            });
            it('gives an error when registering', (done) => {
                push.requestSubscription({ serverPublicKey: 'test' }).catch((err) => {
                    done();
                });
            });
            it('gives an error when unsubscribing', (done) => {
                push.unsubscribe().catch((err) => {
                    done();
                });
            });
        });
    });
    describe('SwUpdate', () => {
        let update;
        beforeEach(() => {
            update = new update_1.SwUpdate(comm);
            mock.setupSw();
        });
        it('processes update availability notifications when sent', (done) => {
            update.versionUpdates
                .pipe((0, operators_1.filter)((evt) => evt.type === 'VERSION_READY'))
                .subscribe((event) => {
                expect(event.currentVersion).toEqual({ hash: 'A' });
                expect(event.latestVersion).toEqual({ hash: 'B' });
                done();
            });
            mock.sendMessage({
                type: 'VERSION_READY',
                currentVersion: {
                    hash: 'A',
                },
                latestVersion: {
                    hash: 'B',
                },
            });
        });
        it('processes unrecoverable notifications when sent', (done) => {
            update.unrecoverable.subscribe((event) => {
                expect(event.reason).toEqual('Invalid Resource');
                expect(event.type).toEqual('UNRECOVERABLE_STATE');
                done();
            });
            mock.sendMessage({ type: 'UNRECOVERABLE_STATE', reason: 'Invalid Resource' });
        });
        it('processes a no new version event when sent', (done) => {
            update.versionUpdates.subscribe((event) => {
                expect(event.type).toEqual('NO_NEW_VERSION_DETECTED');
                expect(event.version).toEqual({ hash: 'A' });
                done();
            });
            mock.sendMessage({
                type: 'NO_NEW_VERSION_DETECTED',
                version: {
                    hash: 'A',
                },
            });
        });
        it('process any version update event when sent', (done) => {
            update.versionUpdates.subscribe((event) => {
                expect(event.type).toEqual('VERSION_DETECTED');
                expect(event.version).toEqual({ hash: 'A' });
                done();
            });
            mock.sendMessage({
                type: 'VERSION_DETECTED',
                version: {
                    hash: 'A',
                },
            });
        });
        it('activates updates when requested', () => __awaiter(void 0, void 0, void 0, function* () {
            mock.messages.subscribe((msg) => {
                expect(msg.action).toEqual('ACTIVATE_UPDATE');
                mock.sendMessage({
                    type: 'OPERATION_COMPLETED',
                    nonce: msg.nonce,
                    result: true,
                });
            });
            expect(yield update.activateUpdate()).toBeTruthy();
        }));
        it('reports activation failure when requested', () => __awaiter(void 0, void 0, void 0, function* () {
            mock.messages.subscribe((msg) => {
                expect(msg.action).toEqual('ACTIVATE_UPDATE');
                mock.sendMessage({
                    type: 'OPERATION_COMPLETED',
                    nonce: msg.nonce,
                    error: 'Failed to activate',
                });
            });
            yield expectAsync(update.activateUpdate()).toBeRejectedWithError('Failed to activate');
        }));
        it('is injectable', () => {
            testing_1.TestBed.configureTestingModule({
                providers: [update_1.SwUpdate, { provide: low_level_1.NgswCommChannel, useValue: comm }],
            });
            expect(() => testing_1.TestBed.inject(update_1.SwUpdate)).not.toThrow();
        });
        describe('with no SW', () => {
            beforeEach(() => {
                comm = new low_level_1.NgswCommChannel(undefined);
            });
            it('can be instantiated', () => {
                update = new update_1.SwUpdate(comm);
            });
            it('does not crash on subscription to observables', () => {
                update = new update_1.SwUpdate(comm);
                update.unrecoverable.toPromise().catch((err) => fail(err));
                update.versionUpdates.toPromise().catch((err) => fail(err));
            });
            it('gives an error when checking for updates', (done) => {
                update = new update_1.SwUpdate(comm);
                update.checkForUpdate().catch((err) => {
                    done();
                });
            });
            it('gives an error when activating updates', (done) => {
                update = new update_1.SwUpdate(comm);
                update.activateUpdate().catch((err) => {
                    done();
                });
            });
        });
    });
});
