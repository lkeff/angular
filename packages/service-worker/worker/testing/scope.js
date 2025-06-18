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
exports.ConfigBuilder = exports.AssetGroupBuilder = exports.SwTestHarnessImpl = exports.SwTestHarnessBuilder = void 0;
const adapter_1 = require("../src/adapter");
const sha1_1 = require("../src/sha1");
const cache_1 = require("./cache");
const clients_1 = require("./clients");
const events_1 = require("./events");
const fetch_1 = require("./fetch");
const mock_1 = require("./mock");
const utils_1 = require("./utils");
const EMPTY_SERVER_STATE = new mock_1.MockServerStateBuilder().build();
class SwTestHarnessBuilder {
    constructor(scopeUrl = 'http://localhost/') {
        this.scopeUrl = scopeUrl;
        this.server = EMPTY_SERVER_STATE;
        this.origin = (0, utils_1.parseUrl)(this.scopeUrl).origin;
        this.caches = new cache_1.MockCacheStorage(this.origin);
    }
    withCacheState(cache) {
        this.caches = new cache_1.MockCacheStorage(this.origin, cache);
        return this;
    }
    withServerState(state) {
        this.server = state;
        return this;
    }
    build() {
        return new SwTestHarnessImpl(this.server, this.caches, this.scopeUrl);
    }
}
exports.SwTestHarnessBuilder = SwTestHarnessBuilder;
class SwTestHarnessImpl extends adapter_1.Adapter {
    get time() {
        return this.mockTime;
    }
    constructor(server, caches, scopeUrl) {
        super(scopeUrl, caches);
        this.server = server;
        this.clients = new clients_1.MockClients();
        this.eventHandlers = new Map();
        this.skippedWaiting = false;
        this.selfMessageQueue = [];
        this.autoAdvanceTime = false;
        this.unregistered = false;
        this.notifications = [];
        this.registration = {
            active: {
                postMessage: (msg) => {
                    this.selfMessageQueue.push(msg);
                },
            },
            scope: this.scopeUrl,
            showNotification: (title, options) => {
                this.notifications.push({ title, options });
            },
            unregister: () => {
                this.unregistered = true;
            },
        };
        this.mockTime = Date.now();
        this.timers = [];
        this.parseUrl = utils_1.parseUrl;
    }
    resolveSelfMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.selfMessageQueue.length > 0) {
                const queue = this.selfMessageQueue;
                this.selfMessageQueue = [];
                yield queue.reduce((previous, msg) => __awaiter(this, void 0, void 0, function* () {
                    yield previous;
                    yield this.handleMessage(msg, null);
                }), Promise.resolve());
            }
        });
    }
    startup() {
        return __awaiter(this, arguments, void 0, function* (firstTime = false) {
            if (!firstTime) {
                return null;
            }
            let skippedWaiting = false;
            if (this.eventHandlers.has('install')) {
                const installEvent = new events_1.MockInstallEvent();
                this.eventHandlers.get('install')(installEvent);
                yield installEvent.ready;
                skippedWaiting = this.skippedWaiting;
            }
            if (this.eventHandlers.has('activate')) {
                const activateEvent = new events_1.MockActivateEvent();
                this.eventHandlers.get('activate')(activateEvent);
                yield activateEvent.ready;
            }
            return skippedWaiting;
        });
    }
    updateServerState(server) {
        this.server = server || EMPTY_SERVER_STATE;
    }
    fetch(req) {
        if (typeof req === 'string') {
            return this.server.fetch(new fetch_1.MockRequest((0, utils_1.normalizeUrl)(req, this.scopeUrl)));
        }
        else {
            const mockReq = req.clone();
            mockReq.url = (0, utils_1.normalizeUrl)(mockReq.url, this.scopeUrl);
            return this.server.fetch(mockReq);
        }
    }
    addEventListener(type, listener, options) {
        if (options !== undefined) {
            throw new Error('Mock `addEventListener()` does not support `options`.');
        }
        const handler = typeof listener === 'function' ? listener : (evt) => listener.handleEvent(evt);
        this.eventHandlers.set(type, handler);
    }
    removeEventListener(type, listener, options) {
        if (options !== undefined) {
            throw new Error('Mock `removeEventListener()` does not support `options`.');
        }
        this.eventHandlers.delete(type);
    }
    newRequest(url, init = {}) {
        return new fetch_1.MockRequest((0, utils_1.normalizeUrl)(url, this.scopeUrl), init);
    }
    newResponse(body, init = {}) {
        return new fetch_1.MockResponse(body, init);
    }
    newHeaders(headers) {
        return Object.keys(headers).reduce((mock, name) => {
            mock.set(name, headers[name]);
            return mock;
        }, new fetch_1.MockHeaders());
    }
    skipWaiting() {
        return __awaiter(this, void 0, void 0, function* () {
            this.skippedWaiting = true;
        });
    }
    handleFetch(req, clientId = '', resultingClientId) {
        if (!this.eventHandlers.has('fetch')) {
            throw new Error('No fetch handler registered');
        }
        const isNavigation = req.mode === 'navigate';
        if (clientId && !this.clients.getMock(clientId)) {
            this.clients.add(clientId, isNavigation ? req.url : this.scopeUrl);
        }
        const event = clientId && resultingClientId
            ? new events_1.MockFetchEvent(req, clientId, resultingClientId)
            : isNavigation
                ? new events_1.MockFetchEvent(req, '', clientId)
                : new events_1.MockFetchEvent(req, clientId, '');
        this.eventHandlers.get('fetch').call(this, event);
        return [event.response, event.ready];
    }
    handleMessage(data, clientId) {
        if (!this.eventHandlers.has('message')) {
            throw new Error('No message handler registered');
        }
        if (clientId && !this.clients.getMock(clientId)) {
            this.clients.add(clientId, this.scopeUrl);
        }
        const event = new events_1.MockExtendableMessageEvent(data, (clientId && this.clients.getMock(clientId)) || null);
        this.eventHandlers.get('message').call(this, event);
        return event.ready;
    }
    handlePush(data) {
        if (!this.eventHandlers.has('push')) {
            throw new Error('No push handler registered');
        }
        const event = new events_1.MockPushEvent(data);
        this.eventHandlers.get('push').call(this, event);
        return event.ready;
    }
    handleClick(notification, action) {
        if (!this.eventHandlers.has('notificationclick')) {
            throw new Error('No notificationclick handler registered');
        }
        const event = new events_1.MockNotificationEvent(notification, action);
        this.eventHandlers.get('notificationclick').call(this, event);
        return event.ready;
    }
    timeout(ms) {
        const promise = new Promise((resolve) => {
            this.timers.push({
                at: this.mockTime + ms,
                duration: ms,
                fn: resolve,
                fired: false,
            });
        });
        if (this.autoAdvanceTime) {
            this.advance(ms);
        }
        return promise;
    }
    advance(by) {
        this.mockTime += by;
        this.timers
            .filter((timer) => !timer.fired)
            .filter((timer) => timer.at <= this.mockTime)
            .forEach((timer) => {
            timer.fired = true;
            timer.fn();
        });
    }
    isClient(obj) {
        return obj instanceof clients_1.MockClient;
    }
}
exports.SwTestHarnessImpl = SwTestHarnessImpl;
class AssetGroupBuilder {
    constructor(up, name) {
        this.up = up;
        this.name = name;
        this.files = [];
    }
    addFile(url, contents, hashed = true) {
        const file = { url, contents, hash: undefined };
        if (hashed) {
            file.hash = (0, sha1_1.sha1)(contents);
        }
        this.files.push(file);
        return this;
    }
    finish() {
        return this.up;
    }
    toManifestGroup() {
        return null;
    }
}
exports.AssetGroupBuilder = AssetGroupBuilder;
class ConfigBuilder {
    constructor() {
        this.assetGroups = new Map();
    }
    addAssetGroup(name) {
        const builder = new AssetGroupBuilder(this, name);
        this.assetGroups.set(name, builder);
        return this;
    }
    finish() {
        const assetGroups = Array.from(this.assetGroups.values()).map((group) => group.toManifestGroup());
        const hashTable = {};
        return {
            configVersion: 1,
            timestamp: 1234567890123,
            index: '/index.html',
            assetGroups,
            navigationUrls: [],
            navigationRequestStrategy: 'performance',
            hashTable,
        };
    }
}
exports.ConfigBuilder = ConfigBuilder;
