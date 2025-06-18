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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const tab_manager_1 = require("./tab_manager");
const TEST_MESSAGE_ONE = { topic: 'test', args: ['test1'] };
const TEST_MESSAGE_TWO = { topic: 'test', args: ['test2'] };
class MockPort {
    constructor(properties) {
        this.properties = properties;
        this.onMessageListeners = [];
        this.onDisconnectListeners = [];
        this.messagesPosted = [];
        this.onMessage = {
            addListener: (listener) => {
                this.onMessageListeners.push(listener);
            },
            removeListener: (listener) => {
                this.onMessageListeners = this.onMessageListeners.filter((l) => l !== listener);
            },
        };
        this.onDisconnect = {
            addListener: (listener) => {
                this.onDisconnectListeners.push(listener);
            },
        };
        this.name = properties.name;
        this.sender = properties.sender;
    }
    postMessage(message) {
        this.messagesPosted.push(message);
    }
}
function assertArrayHasObj(array, obj) {
    expect(array).toContain(jasmine.objectContaining(obj));
}
function assertArrayDoesNotHaveObj(array, obj) {
    expect(array).not.toContain(jasmine.objectContaining(obj));
}
function mockSpyFunction(obj, property, returnValue) {
    obj[property].and.returnValue(() => returnValue);
}
function mockSpyProperty(obj, property, value) {
    Object.getOwnPropertyDescriptor(obj, property).get.and.returnValue(value);
}
describe('Tab Manager - ', () => {
    let tabs;
    const tabId = 12345;
    let chromeRuntime;
    let tabManager;
    let tab;
    let chromeRuntimeOnConnectListeners = [];
    function connectToChromeRuntime(port) {
        for (const listener of chromeRuntimeOnConnectListeners) {
            listener(port);
        }
    }
    function emitMessageToPort(port, message) {
        for (const listener of port.onMessageListeners) {
            listener(message);
        }
    }
    function emitBackendReadyToPort(contentScriptPort) {
        emitMessageToPort(contentScriptPort, { topic: 'backendReady' });
    }
    function emitDisconnectToPort(port) {
        for (const listener of port.onDisconnectListeners) {
            listener();
        }
    }
    function createDevToolsPort() {
        const port = new MockPort({
            name: tabId.toString(),
        });
        connectToChromeRuntime(port);
        return port;
    }
    beforeEach(() => {
        chromeRuntimeOnConnectListeners = [];
        chromeRuntime = jasmine.createSpyObj('chrome.runtime', ['getManifest', 'getURL'], ['onConnect', 'onDisconnect']);
        mockSpyFunction(chromeRuntime, 'getManifest', { manifest_version: 3 });
        mockSpyFunction(chromeRuntime, 'getURL', (path) => path);
        mockSpyProperty(chromeRuntime, 'onConnect', {
            addListener: (listener) => {
                chromeRuntimeOnConnectListeners.push(listener);
            },
        });
    });
    describe('Single Frame', () => {
        const testURL = 'http://example.com';
        const contentScriptFrameId = 0;
        function createContentScriptPort() {
            const port = new MockPort({
                name: 'Content Script',
                sender: {
                    url: testURL,
                    tab: {
                        id: tabId,
                    },
                    frameId: contentScriptFrameId,
                },
            });
            connectToChromeRuntime(port);
            return port;
        }
        beforeEach(() => {
            tabs = {};
            tabManager = tab_manager_1.TabManager.initialize(tabs, chromeRuntime);
        });
        function eachOrderingOfDevToolsInitialization() {
            return __asyncGenerator(this, arguments, function* eachOrderingOfDevToolsInitialization_1() {
                {
                    // Content Script -> Backend Ready -> Devtools
                    const contentScriptPort = createContentScriptPort();
                    emitBackendReadyToPort(contentScriptPort);
                    const devtoolsPort = createDevToolsPort();
                    const tab = tabs[tabId];
                    yield __await(tab.contentScripts[contentScriptFrameId].backendReady);
                    yield yield __await({ tab, contentScriptPort, devtoolsPort });
                    delete tabs[tabId];
                }
                {
                    // Content Script -> Devtools -> Backend Ready
                    const contentScriptPort = createContentScriptPort();
                    const devtoolsPort = createDevToolsPort();
                    emitBackendReadyToPort(contentScriptPort);
                    const tab = tabs[tabId];
                    yield __await(tab.contentScripts[contentScriptFrameId].backendReady);
                    yield yield __await({ tab, contentScriptPort, devtoolsPort });
                    delete tabs[tabId];
                }
                {
                    // Devtools -> Content Script -> Backend Ready
                    const devtoolsPort = createDevToolsPort();
                    const contentScriptPort = createContentScriptPort();
                    emitBackendReadyToPort(contentScriptPort);
                    const tab = tabs[tabId];
                    yield __await(tab.contentScripts[contentScriptFrameId].backendReady);
                    yield yield __await({ tab, contentScriptPort, devtoolsPort });
                }
            });
        }
        it('should setup tab object in the tab manager', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, e_1, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(eachOrderingOfDevToolsInitialization()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const { tab, contentScriptPort, devtoolsPort, } = _c;
                    expect(tab).toBeDefined();
                    expect(tab.devtools).toBe(devtoolsPort);
                    expect(tab.contentScripts[contentScriptFrameId].port).toBe(contentScriptPort);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }));
        it('should set frame connection as enabled when an enableFrameConnection message is recieved', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, e_2, _b, _c;
            var _d, _e;
            try {
                for (var _f = true, _g = __asyncValues(eachOrderingOfDevToolsInitialization()), _h; _h = yield _g.next(), _a = _h.done, !_a; _f = true) {
                    _c = _h.value;
                    _f = false;
                    const { tab, devtoolsPort } = _c;
                    expect((_d = tab === null || tab === void 0 ? void 0 : tab.contentScripts[contentScriptFrameId]) === null || _d === void 0 ? void 0 : _d.enabled).toBe(false);
                    emitMessageToPort(devtoolsPort, {
                        topic: 'enableFrameConnection',
                        args: [contentScriptFrameId, tabId],
                    });
                    expect((_e = tab === null || tab === void 0 ? void 0 : tab.contentScripts[contentScriptFrameId]) === null || _e === void 0 ? void 0 : _e.enabled).toBe(true);
                    assertArrayHasObj(devtoolsPort.messagesPosted, {
                        topic: 'frameConnected',
                        args: [contentScriptFrameId],
                    });
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_f && !_a && (_b = _g.return)) yield _b.call(_g);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }));
        it('should pipe messages from the content script and devtools script to each other when the content script frame is enabled', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, e_3, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(eachOrderingOfDevToolsInitialization()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const { contentScriptPort, devtoolsPort, } = _c;
                    emitMessageToPort(devtoolsPort, {
                        topic: 'enableFrameConnection',
                        args: [contentScriptFrameId, tabId],
                    });
                    // Verify that the double pipe is set up between the content script and the devtools page.
                    emitMessageToPort(contentScriptPort, TEST_MESSAGE_ONE);
                    assertArrayHasObj(devtoolsPort.messagesPosted, TEST_MESSAGE_ONE);
                    assertArrayDoesNotHaveObj(contentScriptPort.messagesPosted, TEST_MESSAGE_ONE);
                    emitMessageToPort(devtoolsPort, TEST_MESSAGE_TWO);
                    assertArrayHasObj(contentScriptPort.messagesPosted, TEST_MESSAGE_TWO);
                    assertArrayDoesNotHaveObj(devtoolsPort.messagesPosted, TEST_MESSAGE_TWO);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }));
        it('should not pipe messages from the content script and devtools script to each other when the content script frame is disabled', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, e_4, _b, _c;
            var _d;
            try {
                for (var _e = true, _f = __asyncValues(eachOrderingOfDevToolsInitialization()), _g; _g = yield _f.next(), _a = _g.done, !_a; _e = true) {
                    _c = _g.value;
                    _e = false;
                    const { tab, contentScriptPort, devtoolsPort, } = _c;
                    expect((_d = tab === null || tab === void 0 ? void 0 : tab.contentScripts[contentScriptFrameId]) === null || _d === void 0 ? void 0 : _d.enabled).toBe(false);
                    emitMessageToPort(contentScriptPort, TEST_MESSAGE_ONE);
                    assertArrayDoesNotHaveObj(contentScriptPort.messagesPosted, TEST_MESSAGE_ONE);
                    emitMessageToPort(devtoolsPort, TEST_MESSAGE_TWO);
                    assertArrayDoesNotHaveObj(devtoolsPort.messagesPosted, TEST_MESSAGE_TWO);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (!_e && !_a && (_b = _f.return)) yield _b.call(_f);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }));
        it('should set backendReady when the contentPort recieves the backendReady message', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, e_5, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(eachOrderingOfDevToolsInitialization()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const { contentScriptPort, devtoolsPort, } = _c;
                    emitMessageToPort(devtoolsPort, {
                        topic: 'enableFrameConnection',
                        args: [contentScriptFrameId, tabId],
                    });
                    assertArrayHasObj(devtoolsPort.messagesPosted, {
                        topic: 'contentScriptConnected',
                        args: [contentScriptFrameId, contentScriptPort.name, contentScriptPort.sender.url],
                    });
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }));
        it('should set tab.devtools to null when the devtoolsPort disconnects', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, e_6, _b, _c;
            var _d, _e;
            try {
                for (var _f = true, _g = __asyncValues(eachOrderingOfDevToolsInitialization()), _h; _h = yield _g.next(), _a = _h.done, !_a; _f = true) {
                    _c = _h.value;
                    _f = false;
                    const { tab, devtoolsPort } = _c;
                    emitMessageToPort(devtoolsPort, {
                        topic: 'enableFrameConnection',
                        args: [contentScriptFrameId, tabId],
                    });
                    expect((_d = tab === null || tab === void 0 ? void 0 : tab.contentScripts[contentScriptFrameId]) === null || _d === void 0 ? void 0 : _d.enabled).toBe(true);
                    emitDisconnectToPort(devtoolsPort);
                    expect(tab.devtools).toBeNull();
                    expect((_e = tab === null || tab === void 0 ? void 0 : tab.contentScripts[contentScriptFrameId]) === null || _e === void 0 ? void 0 : _e.enabled).toBe(false);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (!_f && !_a && (_b = _g.return)) yield _b.call(_g);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }));
    });
    describe('Multiple Frames', () => {
        const topLevelFrameId = 0;
        const childFrameId = 1;
        function createTopLevelContentScriptPort() {
            const port = new MockPort({
                name: 'Top level content script',
                sender: {
                    url: 'TEST_URL',
                    tab: {
                        id: tabId,
                    },
                    frameId: topLevelFrameId,
                },
            });
            connectToChromeRuntime(port);
            return port;
        }
        function createChildContentScriptPort() {
            const port = new MockPort({
                name: 'Child content script',
                sender: {
                    url: 'TEST_URL_2',
                    tab: {
                        id: tabId,
                    },
                    frameId: childFrameId,
                },
            });
            connectToChromeRuntime(port);
            return port;
        }
        function eachOrderingOfDevToolsInitialization() {
            return __asyncGenerator(this, arguments, function* eachOrderingOfDevToolsInitialization_2() {
                {
                    // Devtools Connected -> Top Level Content Script Connected -> Top Level Content Script Backend Ready
                    // -> Child Content Script Connected -> Child Content Script Backend Ready
                    const devtoolsPort = createDevToolsPort();
                    const topLevelContentScriptPort = createTopLevelContentScriptPort();
                    emitBackendReadyToPort(topLevelContentScriptPort);
                    const childContentScriptPort = createChildContentScriptPort();
                    emitBackendReadyToPort(childContentScriptPort);
                    const tab = tabs[tabId];
                    yield __await(tab.contentScripts[topLevelFrameId].backendReady);
                    yield __await(tab.contentScripts[childFrameId].backendReady);
                    yield yield __await({ tab, topLevelContentScriptPort, childContentScriptPort, devtoolsPort });
                    delete tabs[tabId];
                }
                {
                    // Top Level Content Script Connected -> Top Level Content Script Backend Ready -> Devtools Connected
                    // -> Child Content Script Connected -> Child Content Script Backend Ready
                    const topLevelContentScriptPort = createTopLevelContentScriptPort();
                    emitBackendReadyToPort(topLevelContentScriptPort);
                    const devtoolsPort = createDevToolsPort();
                    const childContentScriptPort = createChildContentScriptPort();
                    emitBackendReadyToPort(childContentScriptPort);
                    const tab = tabs[tabId];
                    yield __await(tab.contentScripts[topLevelFrameId].backendReady);
                    yield __await(tab.contentScripts[childFrameId].backendReady);
                    yield yield __await({ tab, topLevelContentScriptPort, childContentScriptPort, devtoolsPort });
                    delete tabs[tabId];
                }
                {
                    // Top Level Content Script Connected -> Top Level Content Script Backend Ready -> Child Content Script Connected
                    // -> Child Content Script Backend Ready -> Devtools Connected
                    const topLevelContentScriptPort = createTopLevelContentScriptPort();
                    emitBackendReadyToPort(topLevelContentScriptPort);
                    const childContentScriptPort = createChildContentScriptPort();
                    emitBackendReadyToPort(childContentScriptPort);
                    const devtoolsPort = createDevToolsPort();
                    tab = tabs[tabId];
                    yield __await(tab.contentScripts[topLevelFrameId].backendReady);
                    yield __await(tab.contentScripts[childFrameId].backendReady);
                    yield yield __await({ tab, topLevelContentScriptPort, childContentScriptPort, devtoolsPort });
                    delete tabs[tabId];
                }
                {
                    // Top Level Content Script Connected -> Devtools Connected -> Child Content Script Connected
                    // -> Top Level Content Script Backend Ready -> Child Content Script Backend Ready
                    const topLevelContentScriptPort = createTopLevelContentScriptPort();
                    const devtoolsPort = createDevToolsPort();
                    const childContentScriptPort = createChildContentScriptPort();
                    emitBackendReadyToPort(topLevelContentScriptPort);
                    emitBackendReadyToPort(childContentScriptPort);
                    const tab = tabs[tabId];
                    yield __await(tab.contentScripts[topLevelFrameId].backendReady);
                    yield __await(tab.contentScripts[childFrameId].backendReady);
                    yield yield __await({ tab, topLevelContentScriptPort, childContentScriptPort, devtoolsPort });
                }
            });
        }
        beforeEach(() => {
            tabs = {};
            tabManager = tab_manager_1.TabManager.initialize(tabs, chromeRuntime);
        });
        it('should setup tab object in the tab manager', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, e_7, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(eachOrderingOfDevToolsInitialization()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const { tab, topLevelContentScriptPort, childContentScriptPort, devtoolsPort, } = _c;
                    expect(tab).toBeDefined();
                    expect(tab.devtools).toBe(devtoolsPort);
                    expect(tab.contentScripts[topLevelFrameId].port).toBe(topLevelContentScriptPort);
                    expect(tab.contentScripts[childFrameId].port).toBe(childContentScriptPort);
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_7) throw e_7.error; }
            }
        }));
        it('should setup message and disconnect listeners on devtools and content script ports', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, e_8, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(eachOrderingOfDevToolsInitialization()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const { topLevelContentScriptPort, childContentScriptPort, devtoolsPort, } = _c;
                    expect(topLevelContentScriptPort.onDisconnectListeners.length).toBeGreaterThan(0);
                    expect(childContentScriptPort.onDisconnectListeners.length).toBeGreaterThan(0);
                    expect(devtoolsPort.onDisconnectListeners.length).toBeGreaterThan(0);
                    expect(topLevelContentScriptPort.onMessageListeners.length).toBeGreaterThan(0);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_8) throw e_8.error; }
            }
        }));
        it('should set the correct frame connection as enabled when an enableFrameConnection message is recieved', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, e_9, _b, _c;
            var _d, _e, _f, _g;
            try {
                for (var _h = true, _j = __asyncValues(eachOrderingOfDevToolsInitialization()), _k; _k = yield _j.next(), _a = _k.done, !_a; _h = true) {
                    _c = _k.value;
                    _h = false;
                    const { tab, devtoolsPort } = _c;
                    expect((_d = tab === null || tab === void 0 ? void 0 : tab.contentScripts[topLevelFrameId]) === null || _d === void 0 ? void 0 : _d.enabled).toBe(false);
                    expect((_e = tab === null || tab === void 0 ? void 0 : tab.contentScripts[childFrameId]) === null || _e === void 0 ? void 0 : _e.enabled).toBe(false);
                    emitMessageToPort(devtoolsPort, {
                        topic: 'enableFrameConnection',
                        args: [topLevelFrameId, tabId],
                    });
                    expect((_f = tab === null || tab === void 0 ? void 0 : tab.contentScripts[topLevelFrameId]) === null || _f === void 0 ? void 0 : _f.enabled).toBe(true);
                    expect((_g = tab === null || tab === void 0 ? void 0 : tab.contentScripts[childFrameId]) === null || _g === void 0 ? void 0 : _g.enabled).toBe(false);
                    assertArrayHasObj(devtoolsPort.messagesPosted, {
                        topic: 'frameConnected',
                        args: [topLevelFrameId],
                    });
                    assertArrayDoesNotHaveObj(devtoolsPort.messagesPosted, {
                        topic: 'frameConnected',
                        args: [childFrameId],
                    });
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (!_h && !_a && (_b = _j.return)) yield _b.call(_j);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }));
        it('should pipe messages from the correct content script and devtools script when that content script frame is enabled', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a, e_10, _b, _c;
            try {
                for (var _d = true, _e = __asyncValues(eachOrderingOfDevToolsInitialization()), _f; _f = yield _e.next(), _a = _f.done, !_a; _d = true) {
                    _c = _f.value;
                    _d = false;
                    const { topLevelContentScriptPort, childContentScriptPort, devtoolsPort, } = _c;
                    emitMessageToPort(devtoolsPort, {
                        topic: 'enableFrameConnection',
                        args: [topLevelFrameId, tabId],
                    });
                    emitMessageToPort(devtoolsPort, TEST_MESSAGE_ONE);
                    assertArrayHasObj(topLevelContentScriptPort.messagesPosted, TEST_MESSAGE_ONE);
                    assertArrayDoesNotHaveObj(childContentScriptPort.messagesPosted, TEST_MESSAGE_ONE);
                    emitMessageToPort(devtoolsPort, {
                        topic: 'enableFrameConnection',
                        args: [childFrameId, tabId],
                    });
                    emitMessageToPort(devtoolsPort, TEST_MESSAGE_TWO);
                    assertArrayHasObj(childContentScriptPort.messagesPosted, TEST_MESSAGE_TWO);
                    assertArrayDoesNotHaveObj(topLevelContentScriptPort.messagesPosted, TEST_MESSAGE_TWO);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }));
    });
});
