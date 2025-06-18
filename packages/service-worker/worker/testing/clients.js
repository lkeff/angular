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
exports.MockClients = exports.MockWindowClient = exports.MockClient = void 0;
const rxjs_1 = require("rxjs");
class MockClient {
    constructor(id, url, type = 'all', frameType = 'top-level') {
        this.id = id;
        this.url = url;
        this.type = type;
        this.frameType = frameType;
        this.messages = [];
        this.queue = new rxjs_1.Subject();
        this.lastFocusedAt = 0;
    }
    postMessage(message) {
        this.messages.push(message);
        this.queue.next(message);
    }
}
exports.MockClient = MockClient;
class MockWindowClient extends MockClient {
    constructor(id, url, frameType = 'top-level') {
        super(id, url, 'window', frameType);
        this.focused = false;
        this.visibilityState = 'visible';
    }
    focus() {
        return __awaiter(this, void 0, void 0, function* () {
            // This is only used for relatively ordering clients based on focus order, so we don't need to
            // use `Adapter#time`.
            this.lastFocusedAt = Date.now();
            this.focused = true;
            return this;
        });
    }
    navigate(url) {
        return __awaiter(this, void 0, void 0, function* () {
            this.url = url;
            return this;
        });
    }
}
exports.MockWindowClient = MockWindowClient;
class MockClients {
    constructor() {
        this.clients = new Map();
    }
    add(clientId, url, type = 'window') {
        if (this.clients.has(clientId)) {
            const existingClient = this.clients.get(clientId);
            if (existingClient.url === url) {
                return;
            }
            throw new Error(`Trying to add mock client with same ID (${existingClient.id}) and different URL ` +
                `(${existingClient.url} --> ${url})`);
        }
        const client = type === 'window' ? new MockWindowClient(clientId, url) : new MockClient(clientId, url, type);
        this.clients.set(clientId, client);
    }
    remove(clientId) {
        this.clients.delete(clientId);
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.clients.get(id);
        });
    }
    getMock(id) {
        return this.clients.get(id);
    }
    matchAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const type = (_a = options === null || options === void 0 ? void 0 : options.type) !== null && _a !== void 0 ? _a : 'window';
            const allClients = Array.from(this.clients.values());
            const matchedClients = type === 'all' ? allClients : allClients.filter((client) => client.type === type);
            // Order clients according to the [spec](https://w3c.github.io/ServiceWorker/#clients-matchall):
            // In most recently focused then most recently created order, with windows clients before other
            // clients.
            return matchedClients
                // Sort in most recently created order.
                .reverse()
                // Sort in most recently focused order.
                .sort((a, b) => b.lastFocusedAt - a.lastFocusedAt)
                // Sort windows clients before other clients (otherwise leave existing order).
                .sort((a, b) => {
                const aScore = a.type === 'window' ? 1 : 0;
                const bScore = b.type === 'window' ? 1 : 0;
                return bScore - aScore;
            });
        });
    }
    openWindow(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    claim() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.MockClients = MockClients;
