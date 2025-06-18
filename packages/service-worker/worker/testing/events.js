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
exports.MockPushEvent = exports.MockNotificationEvent = exports.MockExtendableMessageEvent = exports.MockInstallEvent = exports.MockFetchEvent = exports.MockActivateEvent = exports.MockExtendableEvent = exports.MockEvent = void 0;
class MockEvent {
    constructor(type) {
        this.type = type;
        this.AT_TARGET = 2;
        this.BUBBLING_PHASE = 3;
        this.CAPTURING_PHASE = 1;
        this.NONE = 0;
        this.bubbles = false;
        this.cancelBubble = false;
        this.cancelable = false;
        this.composed = false;
        this.currentTarget = null;
        this.defaultPrevented = false;
        this.eventPhase = -1;
        this.isTrusted = false;
        this.returnValue = false;
        this.srcElement = null;
        this.target = null;
        this.timeStamp = Date.now();
    }
    composedPath() {
        this.notImplemented();
    }
    initEvent(type, bubbles, cancelable) {
        this.notImplemented();
    }
    preventDefault() {
        this.notImplemented();
    }
    stopImmediatePropagation() {
        this.notImplemented();
    }
    stopPropagation() {
        this.notImplemented();
    }
    notImplemented() {
        throw new Error('Method not implemented in `MockEvent`.');
    }
}
exports.MockEvent = MockEvent;
class MockExtendableEvent extends MockEvent {
    constructor() {
        super(...arguments);
        this.queue = [];
    }
    get ready() {
        return (() => __awaiter(this, void 0, void 0, function* () {
            while (this.queue.length > 0) {
                yield this.queue.shift();
            }
        }))();
    }
    waitUntil(promise) {
        this.queue.push(promise);
    }
}
exports.MockExtendableEvent = MockExtendableEvent;
class MockActivateEvent extends MockExtendableEvent {
    constructor() {
        super('activate');
    }
}
exports.MockActivateEvent = MockActivateEvent;
class MockFetchEvent extends MockExtendableEvent {
    constructor(request, clientId, resultingClientId) {
        super('fetch');
        this.request = request;
        this.clientId = clientId;
        this.resultingClientId = resultingClientId;
        this.preloadResponse = Promise.resolve();
        this.handled = Promise.resolve(undefined);
        this.response = Promise.resolve(undefined);
    }
    respondWith(r) {
        this.response = Promise.resolve(r);
    }
}
exports.MockFetchEvent = MockFetchEvent;
class MockInstallEvent extends MockExtendableEvent {
    constructor() {
        super('install');
    }
}
exports.MockInstallEvent = MockInstallEvent;
class MockExtendableMessageEvent extends MockExtendableEvent {
    constructor(data, source) {
        super('message');
        this.data = data;
        this.source = source;
        this.lastEventId = '';
        this.origin = '';
        this.ports = [];
    }
}
exports.MockExtendableMessageEvent = MockExtendableMessageEvent;
class MockNotificationEvent extends MockExtendableEvent {
    constructor(_notification, action = '') {
        super('notification');
        this._notification = _notification;
        this.action = action;
        this.notification = Object.assign(Object.assign({}, this._notification), { close: () => undefined });
    }
}
exports.MockNotificationEvent = MockNotificationEvent;
class MockPushEvent extends MockExtendableEvent {
    constructor(_data) {
        super('push');
        this._data = _data;
        this.data = {
            json: () => this._data,
            text: () => JSON.stringify(this._data),
        };
    }
}
exports.MockPushEvent = MockPushEvent;
