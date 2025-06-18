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
exports.MockPushSubscription = exports.MockPushManager = exports.MockServiceWorkerRegistration = exports.MockServiceWorker = exports.MockServiceWorkerContainer = exports.patchDecodeBase64 = void 0;
const rxjs_1 = require("rxjs");
const patchDecodeBase64 = (proto) => {
    let unpatch = () => undefined;
    if (typeof atob === 'undefined' && typeof Buffer === 'function') {
        const oldDecodeBase64 = proto.decodeBase64;
        const newDecodeBase64 = (input) => Buffer.from(input, 'base64').toString('binary');
        proto.decodeBase64 = newDecodeBase64;
        unpatch = () => {
            proto.decodeBase64 = oldDecodeBase64;
        };
    }
    return unpatch;
};
exports.patchDecodeBase64 = patchDecodeBase64;
class MockServiceWorkerContainer {
    constructor() {
        this.onControllerChange = [];
        this.onMessage = [];
        this.mockRegistration = null;
        this.controller = null;
        this.messages = new rxjs_1.Subject();
        this.notificationClicks = new rxjs_1.Subject();
    }
    addEventListener(event, handler) {
        if (event === 'controllerchange') {
            this.onControllerChange.push(handler);
        }
        else if (event === 'message') {
            this.onMessage.push(handler);
        }
    }
    removeEventListener(event, handler) {
        if (event === 'controllerchange') {
            this.onControllerChange = this.onControllerChange.filter((h) => h !== handler);
        }
        else if (event === 'message') {
            this.onMessage = this.onMessage.filter((h) => h !== handler);
        }
    }
    register(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    getRegistration() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mockRegistration;
        });
    }
    setupSw(url = '/ngsw-worker.js') {
        this.mockRegistration = new MockServiceWorkerRegistration();
        this.controller = new MockServiceWorker(this, url);
        this.onControllerChange.forEach((onChange) => onChange(this.controller));
    }
    sendMessage(value) {
        this.onMessage.forEach((onMessage) => onMessage({
            data: value,
        }));
    }
}
exports.MockServiceWorkerContainer = MockServiceWorkerContainer;
class MockServiceWorker {
    constructor(mock, scriptURL) {
        this.mock = mock;
        this.scriptURL = scriptURL;
    }
    postMessage(value) {
        this.mock.messages.next(value);
    }
}
exports.MockServiceWorker = MockServiceWorker;
class MockServiceWorkerRegistration {
    constructor() {
        this.pushManager = new MockPushManager();
    }
}
exports.MockServiceWorkerRegistration = MockServiceWorkerRegistration;
class MockPushManager {
    constructor() {
        this.subscription = null;
    }
    getSubscription() {
        return Promise.resolve(this.subscription);
    }
    subscribe(options) {
        this.subscription = new MockPushSubscription();
        return Promise.resolve(this.subscription);
    }
}
exports.MockPushManager = MockPushManager;
class MockPushSubscription {
    unsubscribe() {
        return Promise.resolve(true);
    }
}
exports.MockPushSubscription = MockPushSubscription;
