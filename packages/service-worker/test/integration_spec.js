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
const low_level_1 = require("../src/low_level");
const push_1 = require("../src/push");
const update_1 = require("../src/update");
const mock_1 = require("../testing/mock");
const db_cache_1 = require("../worker/src/db-cache");
const driver_1 = require("../worker/src/driver");
const fetch_1 = require("../worker/testing/fetch");
const mock_2 = require("../worker/testing/mock");
const scope_1 = require("../worker/testing/scope");
const utils_1 = require("../worker/testing/utils");
const operators_1 = require("rxjs/operators");
(function () {
    // Skip environments that don't support the minimum APIs needed to run the SW tests.
    if (!(0, utils_1.envIsSupported)()) {
        return;
    }
    const dist = new mock_2.MockFileSystemBuilder().addFile('/only.txt', 'this is only').build();
    const distUpdate = new mock_2.MockFileSystemBuilder().addFile('/only.txt', 'this is only v2').build();
    function obsToSinglePromise(obs) {
        return obs.pipe((0, operators_1.take)(1)).toPromise();
    }
    const manifest = {
        configVersion: 1,
        timestamp: 1234567890123,
        appData: { version: '1' },
        index: '/only.txt',
        assetGroups: [
            {
                name: 'assets',
                installMode: 'prefetch',
                updateMode: 'prefetch',
                urls: ['/only.txt'],
                patterns: [],
                cacheQueryOptions: { ignoreVary: true },
            },
        ],
        navigationUrls: [],
        navigationRequestStrategy: 'performance',
        hashTable: (0, mock_2.tmpHashTableForFs)(dist),
    };
    const manifestUpdate = {
        configVersion: 1,
        timestamp: 1234567890123,
        appData: { version: '2' },
        index: '/only.txt',
        assetGroups: [
            {
                name: 'assets',
                installMode: 'prefetch',
                updateMode: 'prefetch',
                urls: ['/only.txt'],
                patterns: [],
                cacheQueryOptions: { ignoreVary: true },
            },
        ],
        navigationUrls: [],
        navigationRequestStrategy: 'performance',
        hashTable: (0, mock_2.tmpHashTableForFs)(distUpdate),
    };
    const server = new mock_2.MockServerStateBuilder().withStaticFiles(dist).withManifest(manifest).build();
    const serverUpdate = new mock_2.MockServerStateBuilder()
        .withStaticFiles(distUpdate)
        .withManifest(manifestUpdate)
        .build();
    describe('ngsw + companion lib', () => {
        let mock;
        let comm;
        let scope;
        let driver;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            // Fire up the client.
            mock = new mock_1.MockServiceWorkerContainer();
            comm = new low_level_1.NgswCommChannel(mock);
            scope = new scope_1.SwTestHarnessBuilder().withServerState(server).build();
            driver = new driver_1.Driver(scope, scope, new db_cache_1.CacheDatabase(scope));
            scope.clients.add('default', scope.registration.scope);
            scope.clients.getMock('default').queue.subscribe((msg) => {
                mock.sendMessage(msg);
            });
            mock.messages.subscribe((msg) => {
                scope.handleMessage(msg, 'default');
            });
            mock.notificationClicks.subscribe((msg) => {
                scope.handleMessage(msg, 'default');
            });
            mock.setupSw();
            yield Promise.all(scope.handleFetch(new fetch_1.MockRequest('/only.txt'), 'default'));
            yield driver.initialized;
        }));
        it('communicates back and forth via update check', () => __awaiter(this, void 0, void 0, function* () {
            const update = new update_1.SwUpdate(comm);
            yield update.checkForUpdate();
        }));
        it('detects an actual update', () => __awaiter(this, void 0, void 0, function* () {
            const update = new update_1.SwUpdate(comm);
            scope.updateServerState(serverUpdate);
            const gotUpdateNotice = (() => __awaiter(this, void 0, void 0, function* () { return yield obsToSinglePromise(update.versionUpdates); }))();
            yield update.checkForUpdate();
            yield gotUpdateNotice;
        }));
        it('receives push message notifications', () => __awaiter(this, void 0, void 0, function* () {
            const push = new push_1.SwPush(comm);
            scope.updateServerState(serverUpdate);
            const gotPushNotice = (() => __awaiter(this, void 0, void 0, function* () {
                const message = yield obsToSinglePromise(push.messages);
                expect(message).toEqual({
                    test: 'success',
                });
            }))();
            yield scope.handlePush({
                test: 'success',
            });
            yield gotPushNotice;
        }));
        it('receives push message click events', () => __awaiter(this, void 0, void 0, function* () {
            const push = new push_1.SwPush(comm);
            scope.updateServerState(serverUpdate);
            const gotNotificationClick = (() => __awaiter(this, void 0, void 0, function* () {
                const event = yield obsToSinglePromise(push.notificationClicks);
                expect(event.action).toEqual('clicked');
                expect(event.notification.title).toEqual('This is a test');
            }))();
            yield scope.handleClick({ title: 'This is a test' }, 'clicked');
            yield gotNotificationClick;
        }));
    });
})();
